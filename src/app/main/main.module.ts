import { NgModule, Type } from '@angular/core';
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

import { Ng2SearchPipeModule } from 'ng2-search-filter';
const COMPONENTS: Array<Type<void>> = [
  LayoutWebComponent,
  DashboardComponent,
  // passport pages
  UserLoginComponent,
  UserRegisterComponent,
  UserRegisterResultComponent,
  // single pages
  CallbackComponent,
  UserLockComponent
];

@NgModule({
  imports: [SharedModule, MainRoutingModule, Ng2SearchPipeModule],
  declarations: COMPONENTS
})
export class MainModule { }
