import { OrderDashbordComponent } from './dashboard/order-dashbord/order-dashbord.component';
import { NgModule, Type, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from '@shared';

// dashboard pages
import { DashboardComponent } from './dashboard/dashboard.component';
// single pages
import { MainRoutingModule } from './main-routing.module';
import { CallbackComponent } from './passport/callback.component';
import { UserLockComponent } from './passport/lock/lock.component';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterResultComponent } from './passport/register-result/register-result.component';
import { UserRegisterComponent } from './passport/register/register.component';
import { LayoutWebComponent } from './website/layout-web/layout-web.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ProductDashbordComponent } from './dashboard/product-dashbord/product-dashbord.component';
import { FeeDashbordComponent } from './dashboard/fee-dashbord/fee-dashbord.component';
const COMPONENTS: Array<Type<void>> = [
  LayoutWebComponent,
  DashboardComponent,
  OrderDashbordComponent,
  ProductDashbordComponent,
  FeeDashbordComponent,
  // passport pages
  UserLoginComponent,
  UserRegisterComponent,
  UserRegisterResultComponent,
  // single pages
  CallbackComponent,
  UserLockComponent
];

@NgModule({
  imports: [SharedModule, MainRoutingModule, Ng2SearchPipeModule, GoogleChartsModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: COMPONENTS
})
export class MainModule { }
