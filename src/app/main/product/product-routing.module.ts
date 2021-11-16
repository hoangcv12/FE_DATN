import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductBaseComponent } from './containers/product-base/product-base.component';

const routes: Routes = [{ path: '', component: ProductBaseComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
