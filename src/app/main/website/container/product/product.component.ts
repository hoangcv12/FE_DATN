import { filter, map } from 'rxjs/operators';
import { CategoryService } from './../../../product/service/category.service';
import { ProductService } from './../../../product/service/product-service.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.less'
  ]
})
export class ProductComponent implements OnInit {
  productList: any = [];
  productListByCategory: any = [];
  cateList: any = [];
  banChay: any = [];
  title = 'Sản phẩm'
  totalLength: number;
  page: number = 1;
  constructor(private ProductService: ProductService,
    private CategoryService: CategoryService,
    private cartService: CartService,
    private message: NzMessageService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllCategory();
    this.getAllProduct();
  }

  getAllProduct() {
    this.ProductService.getAllProduct().subscribe(res => {
      this.totalLength = res.length
      this.banChay = [];
      for (let i = 1; i < 6; i++) {
        this.banChay.push(res[i]);
      }
      this.productList = res;
      this.productListByCategory = res;
      console.log(res);

    })
  }

  getAllCategory() {
    this.CategoryService.getAllCategory().subscribe(res => {
      this.cateList = res;
    });
  }

  changeCategory(id: number) {
    this.productListByCategory = this.productList.filter((p: any) => p.category.id === id);
    this.title = this.productListByCategory[0].category.name;
  }

  addCart(id: number) {
    if (localStorage.getItem('tooken') === null) {
      this.router.navigateByUrl('passport/login')
    }
    else {
      let product: any;
      this.productList.map((p: any) => {
        if (p.id = id) {
          product = p;
        }
      })

      this.cartService.findByProductId(product.id).subscribe((res: any) => {
        if (res.errorCode == 400 && res.message == 'source cannot be null') {
          const dataAdd = { id: '', product: product, quantity: 1 }
          this.cartService.addCart(dataAdd).subscribe(() => {
            this.getAllProduct()
            this.message.create('success', 'Sản phẩm đã được thêm vào giỏ hàng');
          });
        }
        else {
          const dataUpdate = { id: res.id, product: product, quantity: (res.quantity + 1) }
          this.cartService.updateCart(dataUpdate).subscribe(() => {
            this.getAllProduct()
            this.message.create('success', 'Sản phẩm đã được thêm vào giỏ hàng');
          })
        }
      })
    }
  }

  addCartRouter(id: number) {
    if (localStorage.getItem('tooken') === null) {
      this.router.navigateByUrl('passport/login')
    }
    else {
      let product: any;
      this.productList.map((p: any) => {
        if (p.id = id) {
          product = p;
        }
      })
      this.cartService.findByProductId(product.id).subscribe((res: any) => {
        if (res.errorCode == 400 && res.message == 'source cannot be null') {
          const dataAdd = { id: '', product: product, quantity: 1 }
          this.cartService.addCart(dataAdd).subscribe(() => {
            this.message.create('success', 'Sản phẩm đã được thêm vào giỏ hàng');
            this.router.navigateByUrl('polygift/products/cart')
          });
        }
        else {
          const dataUpdate = { id: res.id, product: product, quantity: (res.quantity + 1) }
          this.cartService.updateCart(dataUpdate).subscribe(() => {
            this.message.create('success', 'Sản phẩm đã được thêm vào giỏ hàng');
            this.router.navigateByUrl('polygift/products/cart')
          })
        }
      })
    }


  }
}
