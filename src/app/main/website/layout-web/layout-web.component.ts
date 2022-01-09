import { Component, OnInit, OnChanges, DoCheck } from '@angular/core';
import { Event, NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { CartService } from '../service/cart.service';
import { filter, pairwise } from 'rxjs/operators';
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

  private previousUrl: string;
  constructor(private router: Router, private cartService: CartService) {
    this.router.events
      .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
      .subscribe((events: RoutesRecognized[]) => {
        this.previousUrl = events[0].urlAfterRedirects;
        this.ngOnInit()
      });

  }

  ngOnInit(): void {
    if (this.previousUrl == '/passport/login') {
      location.reload();
    }
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
    localStorage.removeItem("role");
    console.log("rest");

    this.router.navigateByUrl('polygift/home')
    this.ngOnInit()

  }


}
