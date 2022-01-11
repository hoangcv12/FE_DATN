import { CustomerService } from './../../service/customer.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styles: [
  ]
})
export class CustomerTableComponent implements OnInit {
  customer: any = [];
  @Input() textSearch: any;
  constructor(private customerSevice: CustomerService) { }

  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
    this.customerSevice.getAll().subscribe((res: any) => {
      console.log('customer', res);
      this.customer = res
    })
  }

  deleteProduct(id: any) {
    this.customerSevice.delete(id).subscribe(() => {
      this.getAll()
    })
  }
}
