import { CategoryFormComponent } from './components/category-form/category-form.component';
import { CategoryTableComponent } from './components/category-table/category-table.component';
import { CategoryComponent } from './containers/category/category.component';
import { ProductUpdateComponent } from './containers/product-update/product-update.component';
import { CommonModule } from '@angular/common';
import { NgModule, Type, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from '@shared';
import { ProductFormComponent } from './components/product-form/product-form.component';


import { ProductTableComponent } from './components/product-table/product-table.component';
import { ProductAddComponent } from './containers/product-add/product-add.component';
import { ProductBaseComponent } from './containers/product-base/product-base.component';
import { ProductRoutingModule } from './product-routing.module';
import { GoogleChartsModule } from 'angular-google-charts';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
const COMPONENTS: Array<Type<void>> = [ProductTableComponent,
  ProductBaseComponent,
  ProductFormComponent,
  ProductAddComponent,
  ProductUpdateComponent,
  CategoryComponent,
  CategoryTableComponent,
  CategoryFormComponent
];

@NgModule({
  imports: [SharedModule, ProductRoutingModule, Ng2SearchPipeModule, GoogleChartsModule],
  declarations: COMPONENTS,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductModule { }
