import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../service/product-service.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styles: [
  ]
})
export class ProductUpdateComponent implements OnInit {
  constructor(public activatedRoute: ActivatedRoute,
    private proHttp: ProductService) { }

  ngOnInit(): void {
  }


}
