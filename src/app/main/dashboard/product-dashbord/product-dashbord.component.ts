import { map } from 'rxjs/operators';
import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { PaymentService } from '../../website/service/payment.service';

@Component({
  selector: 'app-product-dashbord',
  templateUrl: './product-dashbord.component.html',
  styles: [
  ]
})
export class ProductDashbordComponent implements OnInit, AfterViewInit {
  quantity: any = []
  constructor(private paymentService: PaymentService) { }

  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
    this.paymentService.getAllDetail().subscribe((res: any) => {
      console.log(res);
      res.map((c: any) => {
        this.quantity.push({ id: c.product.id, quantity: c.quantity })
      })
      this.quantity.forEach((c: any, index: any, array: any) => {
        console.log("nè", c, index, array);

      });
      console.log("không", this.quantity);
    })
  }


  @ViewChild('Chart') Chart: ElementRef

  drawChart = () => {

    const data = google.visualization.arrayToDataTable([
      ['Task', 'Số lượng'],
      ['Quả cầu tuyết thank you', 10],
      ['Đồng hồ cát', 22],
      ['Gấu bông xanh', 31],
      ['Gấu con bò', 21],
      ['Cốc sứ hình thỏ', 24]
    ]);

    const options = {
      title: 'Sản phẩm bán chạy'
    };

    const chart = new google.visualization.ColumnChart(this.Chart.nativeElement);

    chart.draw(data, options);
  }

  ngAfterViewInit() {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart);
  }

}
