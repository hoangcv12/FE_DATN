import { NzMessageService } from 'ng-zorro-antd/message';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.less'
  ]
})
export class ProductComponent implements OnInit {

  data = [
    'Đồng hồ',
    'Gấu bông',
    'Quả cầu tuyết',
    'Hoa',
    'Socola'
  ];

  constructor(public msg: NzMessageService) { }

  ngOnInit(): void {
  }

}
