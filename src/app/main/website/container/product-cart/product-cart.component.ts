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
  allChecked = false;
  itemChecked = false;
  constructor(private cartService: CartService, private router: Router) { }
  ngOnInit(): void {
    this.getAllCart()
  }

  checkAll(event: any) {
    if (event == true) {
      this.itemChecked = true
    } else {
      this.itemChecked = false
    }
  }

  getAllCart() {
    this.cartService.getAllByUserName().subscribe(res => {
      if (res == 'Http failure response for http://localhost:8080/rest/cart: 401 OK') {
        localStorage.removeItem("tooken");
        this.router.navigateByUrl('passport/login')
      }
      this.listCart = res;
      this.length = res.length;
      this.total = 0;
      res.map((p: any) => {
        this.total += p.product.price * p.quantity
      })
    });
  }

  onChangeInputM(value: any, id: number) {
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
}
