import { OrderManagerModule } from './order-manager/order-manager.module';
/* eslint-disable prettier/prettier */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimpleGuard } from '@delon/auth';
import { environment } from '@env/environment';
import { Auth } from './auth';
// layout
import { LayoutBasicComponent } from '../layout/basic/basic.component';

import { LayoutPassportComponent } from '../layout/passport/passport.component';
// dashboard pages
import { DashboardComponent } from './dashboard/dashboard.component';
// single pages
import { CallbackComponent } from './passport/callback.component';
import { UserLockComponent } from './passport/lock/lock.component';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterResultComponent } from './passport/register-result/register-result.component';
import { UserRegisterComponent } from './passport/register/register.component';
import { LayoutWebComponent } from './website/layout-web/layout-web.component';

const routes: Routes = [
  {
    path: 'admin',
    component: LayoutBasicComponent,
    canActivate: [Auth],
    children: [

      { path: 'dashboard', component: DashboardComponent },
      { path: 'exception', loadChildren: () => import('./exception/exception.module').then(m => m.ExceptionModule) },
      // { path: 'widgets', loadChildren: () => import('./widgets/widgets.module').then(m => m.WidgetsModule) },
      { path: 'products', loadChildren: () => import('./product/product.module').then((m) => m.ProductModule) },
      { path: 'order-manager', loadChildren: () => import('./order-manager/order-manager.module').then((m) => m.OrderManagerModule) },
      { path: 'customer', loadChildren: () => import('./customer/customer.module').then((m) => m.CustomerModule) }
    ]
  },
  {
    path: 'polygift',
    component: LayoutWebComponent,
    // canActivate: [SimpleGuard],
    children: [
      { path: '', loadChildren: () => import('./website/website.module').then((m) => m.WebsiteModule) }
    ]
  },
  {
    path: 'passport',
    component: LayoutPassportComponent,
    children: [
      { path: 'login', component: UserLoginComponent, data: { title: '登录', titleI18n: 'pro-login' } },
      { path: 'register', component: UserRegisterComponent, data: { title: '注册', titleI18n: 'pro-register' } },
      { path: 'register-result', component: UserRegisterResultComponent, data: { title: '注册结果', titleI18n: 'pro-register-result' } },
      { path: 'lock', component: UserLockComponent, data: { title: '锁屏', titleI18n: 'lock' } }
    ]
  },
  {
    path: 'exception',
    component: LayoutPassportComponent,
    children: [
      { path: '', loadChildren: () => import('./exception/exception.module').then((m) => m.ExceptionModule) }
    ]
  },
  //Layout
  { path: '**', redirectTo: 'exception/404' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: environment.useHash,
      // NOTICE: If you use `reuse-tab` component and turn on keepingScroll you can set to `disabled`
      // Pls refer to https://ng-alain.com/components/reuse-tab
      scrollPositionRestoration: 'top'
    })
  ],
  exports: [RouterModule]
})
export class MainRoutingModule { }
