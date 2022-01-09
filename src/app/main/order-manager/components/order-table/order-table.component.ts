import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/main/website/service/payment.service';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styles: [
  ]
})
export class OrderTableComponent implements OnInit {
  order: any = [];
  constructor(private orderService: PaymentService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.orderService.getAll().subscribe((res: any) => {
      this.order = res;
    })

  }
}
