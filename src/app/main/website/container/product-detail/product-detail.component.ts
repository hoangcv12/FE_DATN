import { NzMessageService } from 'ng-zorro-antd/message';
import { filter, map } from 'rxjs/operators';
import { ProductService } from 'src/app/main/product/service/product-service.service';
import { Component, OnInit, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.less']
})
export class ProductDetailComponent implements OnInit {
  product: any = [];
  quantity: number = 1;
  productList: any = [];
  productCart: any;
  constructor(private ProductService: ProductService,
    public activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private message: NzMessageService,
    private router: Router) { }

  ngOnInit(): void {
    this.paramsId();
  }


  paramsId() {
    this.activatedRoute.params.subscribe(params => {
      this.getProductById(params.id)
    })
  }

  getAllProductByCate(id: number, idpro: number) {

    this.ProductService.getAllProduct().subscribe(res => {
      this.productList = res.filter((p: any) => p.category.id == id && p.id != idpro);
      this.productList.splice(6, this.productList.length)
    })
  }

  getProductById(id: number) {
    this.ProductService.getProductById(id).subscribe(res => {
      console.log("mẹ", res);

      this.productCart = res;
      this.product = [];
      this.product.push(res);
      this.product.map((p: any) => {
        this.getAllProductByCate(p.category.id, p.id)
      })
    })
  }

  changeProduct(id: number) {
    this.getProductById(id)
  }

  addCart() {
    this.cartService.findByProductId(this.productCart.id).subscribe((res: any) => {
      if (res.errorCode == 400 && res.message == 'source cannot be null') {
        const dataAdd = { id: '', product: this.productCart, quantity: this.quantity }
        this.cartService.addCart(dataAdd).subscribe(() => {
          this.paramsId();
          this.message.create('success', 'Sản phẩm đã được thêm vào giỏ hàng');
        });
      }
      else {
        const dataUpdate = { id: res.id, product: this.productCart, quantity: (res.quantity + this.quantity) }
        this.cartService.updateCart(dataUpdate).subscribe(() => {
          this.paramsId();
          this.message.create('success', 'Sản phẩm đã được thêm vào giỏ hàng');
        })
      }
    })
  }


  addCartRouter() {
    this.cartService.findByProductId(this.productCart.id).subscribe((res: any) => {
      if (res.errorCode == 400 && res.message == 'source cannot be null') {
        const dataAdd = { id: '', product: this.productCart, quantity: this.quantity }
        this.cartService.addCart(dataAdd).subscribe(() => {
          this.message.create('success', 'Sản phẩm đã được thêm vào giỏ hàng');
          this.router.navigateByUrl('polygift/products/cart');
        });
      }
      else {
        const dataUpdate = { id: res.id, product: this.productCart, quantity: (res.quantity + this.quantity) }
        this.cartService.updateCart(dataUpdate).subscribe(() => {
          this.message.create('success', 'Sản phẩm đã được thêm vào giỏ hàng');
          this.router.navigateByUrl('polygift/products/cart');
        })
      }
    })

  }

  value = '';
  title = 'Input a number';

  @ViewChild('inputElement', { static: false }) inputElement?: ElementRef;

  onChange(value: string): void {
    this.updateValue(value);
  }

  // '.' at the end or only '-' in the input box.
  onBlur(): void {
    if (this.value.charAt(this.value.length - 1) === '.' || this.value === '-') {
      this.updateValue(this.value.slice(0, -1));
    }
  }

  updateValue(value: string): void {
    const reg = /^(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(+value) && reg.test(value)) || value === '' || value === '-') {
      this.value = value;
    }
    this.inputElement!.nativeElement.value = this.value;
    this.updateTitle();
  }

  updateTitle(): void {
    this.title = (this.value !== '-' ? this.formatNumber(this.value) : '-') || 'Input a number';
  }

  formatNumber(value: string): string {
    const stringValue = `${value}`;
    const list = stringValue.split('.');
    const prefix = list[0].charAt(0) === '-' ? '-' : '';
    let num = prefix ? list[0].slice(1) : list[0];
    let result = '';
    while (num.length > 3) {
      result = `,${num.slice(-3)}${result}`;
      num = num.slice(0, num.length - 3);
    }
    if (num) {
      result = num + result;
    }
    return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
  }
}
