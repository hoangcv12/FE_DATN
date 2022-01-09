import { map, filter } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/main/product/service/product-service.service';
import { PaymentService } from 'src/app/main/website/service/payment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderServiceService } from '../../service/order-service.service';

@Component({
  selector: 'app-order-update',
  templateUrl: './order-update.component.html',
  styles: [
  ]
})
export class OrderUpdateComponent implements OnInit {

  payForm: FormGroup;
  disabledDistricts = true;
  disabledWards = true;
  disableAddress = true;
  apiVN: any = [];
  apiDistricts: any = [];
  apiWards: any = [];
  textValue: string | null = null;
  productList: any = [];
  productCart: any = [];
  product: any;
  productSelect: any;
  total = 0;
  inputPhi = 0;
  order: any;
  orderArray: any = []
  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private proHttp: ProductService,
    private message: NzMessageService,
    private paymentService: PaymentService,
    public activatedRoute: ActivatedRoute,
    public orderService: OrderServiceService,
    private router: Router) { }

  ngOnInit(): void {
    this.getApiVN();
    this.createForm();
    this.getAllProduct();
    this.getOrder();
    this.getOrderDetail('start');
  }

  getOrderDetail(status: any) {
    this.total = 0;

    this.activatedRoute.params.subscribe(params => {
      this.paymentService.getByOrderId(params.id).subscribe((res: any) => {
        if (status == 'start') {
          this.productCart = res
          res.map((element: any) => {
            this.orderService.addToCart(element)
            this.order = element.order;
          })
        }
        else if (status == 'nostart') {
          this.orderService.cartItems$.subscribe((element: any) => {
            this.productCart = element;
            console.log('mới', this.productCart);
          });
        }
        else {
          this.orderService.cartItems$.subscribe((element: any) => {

            this.productCart = element.filter((e: any) => e.product.id != status);
            console.log('mới', this.productCart);
          });
        }
        this.getTotal();
      })
    })
  }

  getOrder() {
    this.activatedRoute.params.subscribe(params => {
      this.paymentService.getOrderById(params.id).subscribe((res: any) => {
        console.log(res);

        this.orderArray = res;
        this.inputPhi = res.fee
        this.payForm.patchValue({
          name: res.fullname,
          sdt: res.sdt,
          city: res.city,
          districts: res.districts,
          wards: res.wards,
          address: res.address,
          noteCustomer: res.noteCustomer,
          noteStaff: res.noteStaff,
          orderStatus: String(res.orderStatus)
        })
      })
    });
  }
  //đơn hàng
  getAllProduct() {
    this.proHttp.getAllProduct1().subscribe(res => {
      this.productList = res;
      console.log(res);
    });
  }

  transportFeeChange() {
    this.total = 0;
    this.total += this.inputPhi;
    this.getTotal();
  }

  getTotal() {
    this.productCart.map((p: any) => {
      this.total += p.quantity * p.product.price;
    })
  }

  changeSelect(event: any) {
    if (event != null) {
      let temp = false;
      this.productCart.forEach((element: any, index: any) => {
        if (element.product.id == event) {
          temp = true;
        }
      });
      if (temp == false) {
        this.proHttp.getProductById(event).subscribe((res: any) => {
          let data = { id: '', product: res, quantity: 1, order: this.order }
          this.orderService.addToCart(data)
          this.getOrderDetail('nostart');
        });
      }
    }
  }

  onChangeInputM(value: any, id: number) {
    // thực hiện thay đổi khi bỏ chuột
    if (event?.cancelable != false) {
      let data: any = {};
      this.productCart.map((c: any, index: any) => {
        if (id == c.product.id) {
          c.quantity = value;
        }
      });
      this.getOrderDetail('nostart');
    }
  }

  onChangeInput(event: any, id: number) {

    if (Number(event.target.value) == NaN || Number(event.target.value) < 1) {
      event.target.value = 1;
    }
    console.log(Number(event.target.value));

    let data: any = {};

    if (Number(event.target.value) > data.quantity) {
      event.target.value = data.quantity;
    }
    this.productCart.map((c: any, index: any) => {
      if (id == c.product.id) {
        c.quantity = event.target.value;
      }
    });
    this.getOrderDetail('nostart');
  }

  deleteItem(idpro: any) {
    // this.productCart.map((c: any, index: any) => {
    //   if (idpro == c.product.id) {
    //     c.splice(index, 1)
    //   }
    // });
    this.orderService.delete(idpro)
    this.getOrderDetail(idpro);
  }
  deleteAll() {
    this.orderService.deleteAll([])
    this.getOrderDetail('nostart');
  }
  //khách hàng
  createForm() {
    this.payForm = this.fb.group({
      name: ['', [Validators.required]],
      sdt: ['', [Validators.required, Validators.pattern('0[0-9\s.-]{9,13}')]],
      city: ['', [Validators.required]],
      districts: ['', [Validators.required]],
      wards: ['', [Validators.required]],
      address: ['', [Validators.required]],
      noteCustomer: [''],
      noteStaff: [''],
      orderStatus: ['']
    });
  }

  validForm = {
    sdt: [
      {
        type: 'pattern',
        message: 'Nhập sai định dạng'
      },
      {
        type: 'required',
        message: 'Vui lòng không để trống'
      }
    ],
    name: [
      {
        type: 'required',
        message: 'Vui lòng không để trống'
      }
    ],

  };

  changeDistricts() {
    if (this.payForm.value.districts !== null) {
      this.apiDistricts.filter((res: any) => res.name == this.payForm.value.districts).forEach((res: any) => {
        this.apiWards = res.wards
      })
      this.disabledWards = false;
    }
  }
  changeCity() {
    if (this.payForm.value.city !== null) {
      this.http.get('assets/data.json').subscribe((res: any) => {
        res.filter((c: any) => c.name == this.payForm.value.city).forEach((res: any) => {
          this.apiDistricts = res.districts
        });
      })
      this.disabledDistricts = false;
    }
  }

  changeWards() {
    if (this.payForm.value.wards !== null) {
      this.disabledWards = false;
    }
  }

  getApiVN() {
    this.http.get('assets/data.json').subscribe(res => {
      console.log(res);
      this.apiVN = res
    })
  }

  paySubmit() {
    // const address = this.payForm.value.name + ' (' + this.payForm.value.sdt + ') ' + this.payForm.value.address + ', ' + this.payForm.value.wards + ', ' + this.payForm.value.districts + ', ' + this.payForm.value.city
    // const code = (Math.floor(Math.random() * 9000000) + 1000000);
    const data = {
      ...this.orderArray, fee: this.inputPhi, address: this.payForm.value.address, sdt: this.payForm.value.sdt, fullname: this.payForm.value.name
      , total: this.total, orderStatus: Number(this.payForm.value.orderStatus), note: '',
      city: this.payForm.value.city
      , districts: this.payForm.value.districts, wards: this.payForm.value.wards,
      noteStaff: this.payForm.value.noteStaff, noteCustomer: this.payForm.value.noteCustomer
    }
    console.log('order', data);
    this.paymentService.update(data).subscribe(res => {
      this.createOrderDetail()
      this.message.create('success', 'Cập nhật thành công')
      this.productCart.splice(0, this.productCart.length)
      this.ngOnInit();
    })
  }


  createOrderDetail() {
    this.productCart.forEach((e: any) => {
      const data = { id: e.id, quantity: e.quantity, product: e.product, order: e.order }
      console.log(data);
      this.paymentService.createOrderDetail(data).subscribe(() => {
      })
    });
  }
}
