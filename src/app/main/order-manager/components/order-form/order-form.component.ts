import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/main/product/service/product-service.service';
import { PaymentService } from 'src/app/main/website/service/payment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styles: [
  ]
})
export class OrderFormComponent implements OnInit {
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
  productCart1: any = [];
  product: any;
  productSelect: any;
  total = 0;
  inputPhi = 0;
  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private proHttp: ProductService,
    private message: NzMessageService,
    private paymentService: PaymentService,
    private router: Router) { }

  ngOnInit(): void {
    this.getApiVN();
    this.createForm();
    this.getAllProduct();
    this.cart()
  }
  cart() {
    this.total = 0;
    if (localStorage.getItem('cart')) {
      this.productCart = JSON.parse(localStorage.cart);
      this.getTotal();
    } else {
      this.productCart = []
    }

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
      this.total += (p.quantityCart * p.price);
    })

  }

  changeSelect(event: any) {
    if (event != null) {


      this.proHttp.getProductById(event).subscribe((res: any) => {
        // localStorage.removeItem('test')
        let data = { ...res, quantityCart: 1 }
        this.productCart1.forEach((element: any, index: any) => {
          if (element.id == res.id) {
            element.quantityCart += 1;
            data = element;
            this.productCart1.splice(index, 1)
          }
        });
        this.productCart1.push(data);
        console.log('cart1', this.productCart1);
        localStorage.setItem('cart', JSON.stringify(this.productCart1))
        this.cart();
      });

    }
    console.log("hh", this.productCart);
  }

  onChangeInputM(value: any, id: number) {
    // thực hiện thay đổi khi bỏ chuột
    if (event?.cancelable != false) {
      let data: any = {};
      this.productCart1.map((c: any, index: any) => {
        if (id == c.id) {
          c.quantityCart = value;
          data = c;
          this.productCart1.splice(index, 1)
        }
      });
      this.productCart1.push(data);
      localStorage.setItem('cart', JSON.stringify(this.productCart1))
      this.ngOnInit();
    }
  }

  onChangeInput(event: any, id: number) {

    if (Number(event.target.value) == NaN || Number(event.target.value) < 1) {
      event.target.value = 1;
    }
    console.log(Number(event.target.value));

    let data: any = {};
    this.productCart1.map((c: any, index: any) => {
      if (id == c.id) {
        data = c;
        this.productCart1.splice(index, 1)
      }
    });
    if (Number(event.target.value) > data.quantity) {
      event.target.value = data.quantity;
    }
    const data1 = { ...data, quantityCart: event.target.value }
    this.productCart1.push(data1);
    localStorage.setItem('cart', JSON.stringify(this.productCart1))
    this.ngOnInit();
  }

  deleteItem(id: number) {
    this.productCart1.map((c: any, index: any) => {
      if (id == c.id) {
        this.productCart1.splice(index, 1)
      }
    });
    console.log(this.productCart1);

    localStorage.setItem('cart', JSON.stringify(this.productCart1))
    this.ngOnInit();
  }
  deleteAll() {
    localStorage.removeItem('cart');
    this.ngOnInit();
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
      type: ['A']
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
    const address = this.payForm.value.name + ' (' + this.payForm.value.sdt + ') ' + this.payForm.value.address + ', ' + this.payForm.value.wards + ', ' + this.payForm.value.districts + ', ' + this.payForm.value.city
    const code = (Math.floor(Math.random() * 9000000) + 1000000);
    const data = {
      id: '', address: address, sdt: this.payForm.value.sdt, fullname: this.payForm.value.name
      , total: this.total, createdDate: '', orderStatus: 0, orderCode: code, updatedDate: '', note: ''
    }
    console.log('order', data);
    this.paymentService.creatOrder(data).subscribe(res => {
      this.createOrderDetail(res)
      this.message.create('success', 'Đặt hàng thành công')
      localStorage.removeItem('cart')
      this.ngOnInit();
    })
  }


  createOrderDetail(order: any) {
    this.productCart.forEach((e: any) => {
      const data = { id: '', price: e.price * e.quantityCart, quantity: e.quantityCart, productDto: e, orderDto: order }
      this.paymentService.createOrderDetail(data).subscribe(() => {
      })
    });
  }
}
