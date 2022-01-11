import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-base',
  templateUrl: './order-base.component.html',
  styles: [
  ]
})
export class OrderBaseComponent implements OnInit {
  textSearchProduct: any;
  constructor() { }

  ngOnInit(): void {
    localStorage.removeItem('cart')
  }

}
