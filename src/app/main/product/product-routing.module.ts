import { ProductUpdateComponent } from './containers/product-update/product-update.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductAddComponent } from './containers/product-add/product-add.component';

import { ProductBaseComponent } from './containers/product-base/product-base.component';
import { CategoryComponent } from './containers/category/category.component';

const routes: Routes = [
  { path: '', component: ProductBaseComponent },
  { path: 'add', component: ProductAddComponent },
  { path: 'update/:id', component: ProductUpdateComponent },
  { path: 'category', component: CategoryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
