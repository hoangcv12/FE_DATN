import { CartService } from './../../service/cart.service';
import { PaymentService } from './../../service/payment.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-pay',
  templateUrl: './product-pay.component.html',
  styles: [
    `
    .ant-modal-content {
      width: 800px;
    }
    `
  ]
})
export class ProductPayComponent implements OnInit {
  listCart: any = [];
  isVisible = false;
  inputValue: string | null = null;
  textValue: string | null = null;
  radioValue = 'A';
  apiVN: any = [];
  apiDistricts: any = [];
  apiWards: any = [];
  payForm: FormGroup;
  disabledDistricts = true;
  disabledWards = true;
  disableAddress = true;
  address = '';
  order: any;
  total: number;
  transportFee = 30000;
  constructor(private cartService: CartService,
    private http: HttpClient,
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router,
    private paymentService: PaymentService,
    private CartService: CartService
  ) { }

  ngOnInit(): void {
    this.getAllCart()
    this.getApiVN();
    this.createForm()
  }

  createForm() {
    this.payForm = this.fb.group({
      name: ['', [Validators.required]],
      sdt: ['', [Validators.required, Validators.pattern('0[0-9\s.-]{9,13}')]],
      city: ['', [Validators.required]],
      districts: ['', [Validators.required]],
      wards: ['', [Validators.required]],
      address: ['', [Validators.required]],
      noteCustomer: [''],
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

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.address = this.payForm.value.name + ' (' + this.payForm.value.sdt + ') ' + this.payForm.value.address + ', ' + this.payForm.value.wards + ', ' + this.payForm.value.districts + ', ' + this.payForm.value.city
    this.isVisible = false;
  }

  paySubmit() {
    if (this.address == '') {
      this.message.create('error', 'Chưa có thông tin địa chỉ giao hàng');
    } else {
      const code = (Math.floor(Math.random() * 9000000) + 1000000);
      const data = {
        id: '', fee: '', address: this.payForm.value.address, sdt: this.payForm.value.sdt, fullname: this.payForm.value.name
        , total: this.total, createdDate: '', orderStatus: 0, orderCode: code, updatedDate: '', note: '', city: this.payForm.value.city
        , districts: this.payForm.value.districts, wards: this.payForm.value.wards
      }
      this.paymentService.creatOrder(data).subscribe(res => {
        this.createOrderDetail(res)
        this.deleteCart();
        this.message.create('success', 'Đặt hàng thành công')
      })
      this.router.navigateByUrl('polygift/home')
    }
  }

  createOrderDetail(order: any) {
    this.listCart.forEach((e: any) => {
      const data = { id: '', price: e.price * e.quantity, quantity: e.quantity, product: e.product, order: order }
      this.paymentService.createOrderDetail(data).subscribe(() => {
      })
    });
  }

  deleteCart() {
    this.cartService.deleteCartByUser().subscribe()
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }


  getAllCart() {
    this.cartService.getAllByUserName().subscribe(res => {
      this.total = 0;
      res.forEach((r: any) => {
        this.total += r.product.price * r.quantity
      });
      this.listCart = res;
    });
  }


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
}
