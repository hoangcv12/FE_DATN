import { ProductPayComponent } from './container/product-pay/product-pay.component';
import { ProductCartComponent } from './container/product-cart/product-cart.component';
import { ProductDetailComponent } from './container/product-detail/product-detail.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './container/home/home.component';
import { ProductComponent } from './container/product/product.component';
import { IntroduceComponent } from './container/introduce/introduce.component';
import { ContactsComponent } from './container/contacts/contacts.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductComponent },
  { path: 'product/detail/:id', component: ProductDetailComponent },
  { path: 'products/cart', component: ProductCartComponent },
  { path: 'products/payment', component: ProductPayComponent },
  { path: 'introduce', component: IntroduceComponent },
  { path: 'contacts', component: ContactsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
