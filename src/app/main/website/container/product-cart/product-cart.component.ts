import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../service/cart.service';


@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.less'
  ]
})
export class ProductCartComponent implements OnInit {
  listCart: any = [];
  quantity: number = 1;
  total: number = 0;
  length: number = 0;
  constructor(private cartService: CartService, private router: Router) { }
  ngOnInit(): void {
    this.getAllCart()
  }


  getAllCart() {
    this.cartService.getAllByUserName().subscribe(res => {
      // if (res == 'Http failure response for http://localhost:8080/rest/cart: 401 OK') {
      //   localStorage.removeItem("tooken");
      //   this.router.navigateByUrl('passport/login')
      // }
      this.total = 0;
      res.forEach((r: any) => {
        this.total += r.product.price * r.quantity
      });
      this.listCart = res;
      this.length = res.length;
    });
  }

  onChangeInputM(value: any, id: number) {
    //thực hiện thay đổi khi bỏ chuột
    if (event?.cancelable != false) {
      let data: any = {};
      this.listCart.map((c: any) => {
        if (id == c.id) {
          data = c;
        }
      });
      const newData = { ...data, quantity: value }
      console.log(newData);
      this.cartService.updateCart(newData).subscribe(() => {
        this.getAllCart();
      });
    }
  }

  onChangeInput(event: any, id: number) {

    if (Number(event.target.value) == NaN || Number(event.target.value) < 1) {
      event.target.value = 1;
    }
    console.log(Number(event.target.value));

    let data: any = {};
    this.listCart.map((c: any) => {
      if (id == c.id) {
        data = c;
      }
    });
    if (Number(event.target.value) > data.product.quantity) {
      event.target.value = data.product.quantity;
    }
    const newData = { ...data, quantity: event.target.value }
    console.log(newData);
    this.cartService.updateCart(newData).subscribe(() => {
      this.getAllCart();
    });
  }


  deleteById(id: number) {
    this.cartService.deleteCart(id).subscribe(() => {
      this.getAllCart();
    })
  }

  deleteCartAll() {
    this.cartService.deleteCartByUser().subscribe(() => {
      this.getAllCart();
    })
  }
}
