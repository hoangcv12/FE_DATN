import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-base',
  templateUrl: './product-base.component.html',
  styles: [
  ]
})
export class ProductBaseComponent implements OnInit {
  textSearchProduct: any;
  constructor() { }

  ngOnInit(): void {
  }

}
