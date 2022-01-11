import { NzMessageService } from 'ng-zorro-antd/message';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/main/product/service/product-service.service';
import { PaymentService } from 'src/app/main/website/service/payment.service';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styles: [
  ]
})
export class OrderTableComponent implements OnInit {
  order: any = [];
  @Input() textSearch: any;
  constructor(private orderService: PaymentService, private router: Router,
    private paymentService: PaymentService, private message: NzMessageService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.orderService.getAll().subscribe((res: any) => {
      this.order = res;
    })

  }
  update(id: number) {
    this.paymentService.getOrderById(id).subscribe((res: any) => {
      if (res.orderStatus == 2 || res.orderStatus == 3)
        this.message.create('warning', 'Không được phép chỉnh sửa')
      else
        this.router.navigateByUrl(`/admin/order-manager/update/${id}`);
    })

  }
}
