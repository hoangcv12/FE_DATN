import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerTableComponent } from './components/customer-table/customer-table.component';
import { CustomerBaseComponent } from './container/customer-base/customer-base.component';
import { CustomerAddComponent } from './container/customer-add/customer-add.component';
import { CustomerUpdateComponent } from './container/customer-update/customer-update.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    CustomerTableComponent,
    CustomerBaseComponent,
    CustomerAddComponent,
    CustomerUpdateComponent
  ],
  imports: [
    Ng2SearchPipeModule,
    SharedModule,
    CommonModule,
    CustomerRoutingModule
  ]
})
export class CustomerModule { }
