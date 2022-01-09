import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  constructor(private http: HttpClient) { }

  cartItems: any = new BehaviorSubject([]);
  cartItems$ = this.cartItems.asObservable();

  addToCart(product: any) {
    const currentValue = this.cartItems.value; // get current items in cart
    const updatedValue = [...currentValue, product]; // push new item in cart
    if (updatedValue.length) {
      this.cartItems.next(updatedValue); // notify to all subscribers
    }
  }

  delete(data: any) {
    const roomArr: any = this.cartItems.getValue();
    roomArr.forEach((c: any, index: any) => {
      if (data === c.product.id) {
        console.log("cào ");
        roomArr.splice(index, 1)
      }
    });
    console.log('service', this.cartItems.getValue());
  }

  deleteAll(data: any) {
    const roomArr: any = this.cartItems.getValue();
    this.cartItems.next(data);
  }
  // getAll(): Observable<any> {
  //   return this.items;
  // }
}
