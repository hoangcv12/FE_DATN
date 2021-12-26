import { ProductPayComponent } from './container/product-pay/product-pay.component';
import { ProductCartComponent } from './container/product-cart/product-cart.component';
import { ProductDetailComponent } from './container/product-detail/product-detail.component';
import { NgModule, Type, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from '@shared';
import { WebsiteRoutingModule } from './website-routing.module';
import { HomeComponent } from './container/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { ProductComponent } from './container/product/product.component';
import { NgxPaginationModule } from 'ngx-pagination';
const COMPONENTS: Array<Type<void>> = [
  HomeComponent,
  HeaderComponent,
  ProductComponent,
  ProductDetailComponent,
  ProductCartComponent,
  ProductPayComponent
];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    SharedModule,
    WebsiteRoutingModule,
    NgxPaginationModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WebsiteModule { }
