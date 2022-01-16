import { filter } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentService } from '../../website/service/payment.service';
declare var google: any;
@Component({
  selector: 'app-order-dashbord',
  templateUrl: './order-dashbord.component.html',
  styles: [
  ]
})
export class OrderDashbordComponent implements OnInit, AfterViewInit {
  moi: any;
  danggiao: any;
  thatbai: any;
  hoanthanh: any;
  tuchoi: any;

  constructor(private orderService: PaymentService, private router: Router,
    private message: NzMessageService) { }

  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
    this.orderService.getAll().subscribe((res: any) => {
      this.moi = res.filter((res: any) => res.orderStatus == 0).length;
      this.danggiao = res.filter((res: any) => res.orderStatus == 1).length;
      this.hoanthanh = res.filter((res: any) => res.orderStatus == 2).length;
      this.thatbai = res.filter((res: any) => res.orderStatus == 3).length;
      this.tuchoi = res.filter((res: any) => res.orderStatus == 4).length;
    })
  }

  @ViewChild('Chart') Chart: ElementRef

  drawChart = () => {

    const data = google.visualization.arrayToDataTable([
      ['Task', 'Số lượng'],
      ['Chờ xác nhận', this.moi],
      ['Đang giao', this.danggiao],
      ['Hoàn thành', this.hoanthanh],
      ['Thất bại', this.thatbai],
      ['Từ chối', this.tuchoi]
    ]);

    const options = {
      title: 'Đơn hàng',
      legend: { position: 'none' }
    };

    const chart = new google.visualization.ColumnChart(this.Chart.nativeElement);

    chart.draw(data, options);
  }

  ngAfterViewInit() {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart);
  }
}
