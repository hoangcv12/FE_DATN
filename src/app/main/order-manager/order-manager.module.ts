import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared';
import { OrderManagerRoutingModule } from './order-manager-routing.module';
import { OrderTableComponent } from './components/order-table/order-table.component';
import { OrderBaseComponent } from './container/order-base/order-base.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { OrderAddComponent } from './container/order-add/order-add.component';
import { OrderUpdateComponent } from './container/order-update/order-update.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    OrderTableComponent,
    OrderBaseComponent,
    OrderFormComponent,
    OrderAddComponent,
    OrderUpdateComponent
  ],
  imports: [
    Ng2SearchPipeModule,
    SharedModule,
    CommonModule,
    OrderManagerRoutingModule
  ]
})
export class OrderManagerModule { }
