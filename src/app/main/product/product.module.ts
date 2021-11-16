import { CommonModule } from '@angular/common';
import { NgModule, Type, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from '@shared';

import { ProducHeaderBaseComponent } from './components/produc-header-base/produc-header-base.component';
import { ProductTableComponent } from './components/product-table/product-table.component';
import { ProductBaseComponent } from './containers/product-base/product-base.component';
import { ProductRoutingModule } from './product-routing.module';
const COMPONENTS: Array<Type<void>> = [ProductTableComponent, ProducHeaderBaseComponent, ProductBaseComponent];

@NgModule({
  imports: [SharedModule, ProductRoutingModule],
  declarations: COMPONENTS,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductModule { }
