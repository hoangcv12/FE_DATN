import { NzMessageService } from 'ng-zorro-antd/message';
import { Component, DoCheck, OnInit, OnChanges } from '@angular/core';
import { ProductService } from 'src/app/main/product/service/product-service.service';
import { CartService } from '../../service/cart.service';
import { NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'
  ]
})
export class HomeComponent implements OnInit, OnChanges {
  array = ["anh1.png", "anh2.jpg", "anh3.jpg"];
  listHome: any = [];
  sellingList: any = [];
  newList: any = [];

  constructor(private ProductService: ProductService,
    private cartService: CartService,
    private message: NzMessageService,
    private router: Router
  ) {

  }

  ngOnInit(): void {

    console.log("home");

    this.getAllProduct();
  }

  ngOnChanges() {
    console.log('change');
    this.getAllProduct()
  }

  getAllProduct() {
    this.ProductService.getAllProduct().subscribe(res => {
      this.filterProduct(res)
    })
  }

  filterProduct(data: any) {
    for (let i = 0; i < 12; i++) {
      this.sellingList.push(data[i]);
    }
    for (let i = 12; i < 24; i++) {
      this.newList.push(data[i]);
    }
    this.listHome = this.sellingList;
  }

  banChay() {
    this.listHome = this.sellingList;
  }

  moiNhat() {
    this.listHome = this.newList
  }

  addCartRouter(id: number) {
    let product: any;
    this.listHome.map((p: any) => {
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
