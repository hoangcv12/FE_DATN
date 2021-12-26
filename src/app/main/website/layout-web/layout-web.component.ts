import { Component, OnInit, OnChanges, DoCheck } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { CartService } from '../service/cart.service';
@Component({
  selector: 'app-layout-web',
  templateUrl: './layout-web.component.html',
  styleUrls: ['./layout-web.component.less'
  ]
})
export class LayoutWebComponent implements OnInit, DoCheck {
  log: boolean;
  username: any;
  count: any;
  constructor(private router: Router, private cartService: CartService) {

  }

  ngOnInit(): void {
    console.log("layout");

    if (localStorage.getItem('tooken') === null) {
      this.log = false;
    }
    else {
      this.getAllCart();
      this.username = localStorage.getItem('username');
      this.log = true;
    }
  }

  ngDoCheck(): void {
    //this.getAllCart();
  }

  getAllCart() {
    this.cartService.getAllByUserName().subscribe(res => {
      if (res.errorCode == 500 && res.message == null) {
        this.router.navigateByUrl('passport/login')
      }
      this.count = res.length;
    });
  }

  clickCart() {
    if (localStorage.getItem('tooken') === null) {
      this.router.navigateByUrl('passport/login')
    }
    else {
      this.router.navigateByUrl('/polygift/products/cart')
    }
  }

  logout() {
    this.count = 0;
    localStorage.removeItem("tooken");
    console.log("rest");

    this.router.navigateByUrl('polygift/home')
    this.ngOnInit()

  }


}
