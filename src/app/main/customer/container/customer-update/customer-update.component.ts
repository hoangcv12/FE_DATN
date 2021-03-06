import { NzMessageService } from 'ng-zorro-antd/message';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../service/customer.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styles: [
  ]
})
export class CustomerUpdateComponent implements OnInit {
  order: any = [];
  customerForm: FormGroup;
  id: any;
  createdDate: any;
  constructor(private fb: FormBuilder,
    private customerService: CustomerService,
    private message: NzMessageService,
    public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.createForm();
    this.getCustomer();
  }

  getCustomerOrder(sdt: any) {
    this.customerService.getBySdt(sdt).subscribe((res: any) => {
      this.order = res
    })
  }

  getCustomer() {
    this.activatedRoute.params.subscribe(params => {
      this.customerService.getById(params.id).subscribe((res: any) => {
        this.id = res.id;
        this.createdDate = res.createdDate
        this.getCustomerOrder(res.sdt)
        this.customerForm.patchValue({
          fullname: res.fullname,
          sdt: res.sdt,
          group: res.group
        })
      })
    });
  }
  createForm() {
    this.customerForm = this.fb.group({
      fullname: ['', [Validators.required]],
      sdt: ['', [Validators.required, Validators.pattern('0[0-9\s.-]{9,13}')]],
      group: ['', [Validators.required]],
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

  };

  update() {
    const data = { ...this.customerForm.value, id: this.id, createdDate: this.createdDate }
    console.log(data);

    this.customerService.update(data).subscribe(() => { this.message.create('success', 'Cập nhật thành công thành công') })
  }
}
