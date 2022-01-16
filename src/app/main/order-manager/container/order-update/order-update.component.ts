import { map, filter } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/main/product/service/product-service.service';
import { PaymentService } from 'src/app/main/website/service/payment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderServiceService } from '../../service/order-service.service';
import { SCHEMA_THIRDS_COMPONENTS } from '@shared';

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
  orderArray: any = [];
  productCart1: any = [];
  delete: any = [];
  status: any;
  readonly: boolean = false;
  disableCity: boolean = false;
  noteStaffNew: any;
  orderChangeList: any = [];
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
    this.getOrderDetail();
    this.getOrderChange();
  }
  cart() {
    this.total = 0;
    if (localStorage.getItem('cartu')) {
      this.productCart = JSON.parse(localStorage.cartu);

      this.getTotal();
    } else {
      this.productCart = []
    }

  }

  getOrderChange() {
    this.activatedRoute.params.subscribe(params => {
      this.orderService.getByOrderId(params.id).subscribe((res: any) => {
        this.orderChangeList = res;
      })
    })
  }

  getOrderDetail() {
    this.total = 0;
    this.productCart = [];
    localStorage.removeItem('cartu')
    this.activatedRoute.params.subscribe(params => {
      this.paymentService.getByOrderId(params.id).subscribe((res: any) => {

        console.log('start', res);
        localStorage.setItem('cartu', JSON.stringify(res))
        this.productCart1 = res;
        this.cart();
        // this.productCart = res
        res.map((element: any) => {
          //this.orderService.addToCart(element)
          this.order = element.order;
        })

      })
    })
  }

  getOrder() {
    this.activatedRoute.params.subscribe(params => {
      this.paymentService.getOrderById(params.id).subscribe((res: any) => {
        this.status = res.orderStatus
        if (res.orderStatus == 1) {
          this.readonly = true;
          this.disableCity = true;
        }
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
          orderStatus: String(res.orderStatus)
        })
      })
    });
  }
  //đơn hàng
  getAllProduct() {
    this.proHttp.getAllProduct1().subscribe(res => {
      this.productList = res;
    });
  }

  transportFeeChange() {
    if (String(this.inputPhi) != '') {
      this.total = 0;
      this.total += this.inputPhi;
      this.getTotal();
    }

  }

  getTotal() {
    this.productCart.map((p: any) => {
      this.total += (p.quantity * p.product.price) + p.order.fee;

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
        if (this.delete.length > 0) {
          this.delete.forEach((d: any, index: any) => {
            if (event == d.idpro) {
              this.delete.splice(index, 1)
              console.log('thêm ', this.delete);
            }
          });
        }
        this.proHttp.getProductById(event).subscribe((res: any) => {
          let data = { id: '', product: res, quantity: 1, order: this.order }
          // this.orderService.addToCart(data)
          // this.getOrderDetail('nostart');
          this.productCart1.push(data);
          console.log('cart1', this.productCart1);
          localStorage.setItem('cartu', JSON.stringify(this.productCart1))
          this.cart();
        });
      }
    }
    // this.productCart1.forEach((element: any, index: any) => {
    //   if (element.id == res.id) {
    //     element.quantityCart += 1;
    //     data = element;
    //     this.productCart1.splice(index, 1)
    //   }
    // });
    // this.productCart1.push(data);
    // console.log('cart1', this.productCart1);
    // localStorage.setItem('cart', JSON.stringify(this.productCart1))
    // this.cart();
  }

  onChangeInputM(value: any, id: number) {
    // thực hiện thay đổi khi bỏ chuột
    if (event?.cancelable != false && value != null) {
      let data: any = {};
      this.productCart1.map((c: any, index: any) => {
        if (id == c.product.id) {
          c.quantity = value;
          data = c;
        }
      });

      localStorage.setItem('cartu', JSON.stringify(this.productCart1))
      this.cart();
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
    //this.getOrderDetail('nostart');
    localStorage.setItem('cartu', JSON.stringify(this.productCart1))
    this.cart();
  }

  deleteItem(id: any) {
    if (this.productCart1.length > 1) {
      this.productCart1.map((c: any, index: any) => {
        if (id == c.product.id) {
          this.productCart1.splice(index, 1)
          if (c.id != '') {
            this.delete.push({ id: c.id, idpro: c.product.id })
          }
        }
      });
    }
    console.log(this.delete);

    localStorage.setItem('cartu', JSON.stringify(this.productCart1))
    this.cart();
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
    if (this.disableCity == true) {
      this.disabledWards = true;
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
    if (this.disableCity == true) {
      this.disabledDistricts = true;
    }
  }

  changeWards() {
    if (this.payForm.value.wards !== null) {
      this.disabledWards = false;
    }
  }

  getApiVN() {
    this.http.get('assets/data.json').subscribe(res => {
      this.apiVN = res
    })
  }

  paySubmit() {
    // const address = this.payForm.value.name + ' (' + this.payForm.value.sdt + ') ' + this.payForm.value.address + ', ' + this.payForm.value.wards + ', ' + this.payForm.value.districts + ', ' + this.payForm.value.city
    // const code = (Math.floor(Math.random() * 9000000) + 1000000);
    const data = {
      ...this.orderArray, fee: this.inputPhi, address: this.payForm.value.address, sdt: this.payForm.value.sdt, fullname: this.payForm.value.name
      , total: this.total - this.inputPhi, orderStatus: Number(this.payForm.value.orderStatus), note: '',
      city: this.payForm.value.city
      , districts: this.payForm.value.districts, wards: this.payForm.value.wards, noteCustomer: this.payForm.value.noteCustomer
    }
    if (this.payForm.value.orderStatus != this.status) {
      const data = { status: this.payForm.value.orderStatus, note: this.payForm.value.noteStaff, order: this.orderArray }
      this.orderService.create(data).subscribe()
    }
    this.paymentService.update(data).subscribe(() => {
      this.createOrderDetail()
      if (this.delete.length > 0) {
        this.delete.forEach((c: any) => {
          this.deleteOderDetail(c.id);
        });
        this.delete = [];
      }
      this.message.create('success', 'Cập nhật thành công')
      localStorage.removeItem('cart')
      this.router.navigateByUrl('/admin/order-manager')
    })

  }

  deleteOderDetail(id: any) {
    this.paymentService.delete(id).subscribe()
  }

  createOrderDetail() {
    console.log("detail", this.productCart);
    this.productCart.forEach((e: any) => {
      const data = { id: e.id, quantity: e.quantity, product: e.product, order: e.order }
      console.log(data);
      this.paymentService.createOrderDetail(data).subscribe(() => {
        this.getOrderDetail()
      })
    });
  }


}
