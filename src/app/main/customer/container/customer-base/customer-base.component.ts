import { NzMessageService } from 'ng-zorro-antd/message';
import { CustomerService } from './../../service/customer.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-base',
  templateUrl: './customer-base.component.html',
  styles: [
  ]
})
export class CustomerBaseComponent implements OnInit {
  customerForm: FormGroup;
  isVisible = false;
  textSearchProduct: any;
  constructor(private fb: FormBuilder,
    private customerService: CustomerService,
    private message: NzMessageService) { }

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
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    const data = { ...this.customerForm.value, id: '', createdDate: '' }
    console.log(data);

    this.customerService.create(data).subscribe(() => { this.message.create('success', 'Thêm mới thành công') })
    this.ngOnInit()
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  ngOnInit(): void {
    this.createForm();
  }

}
