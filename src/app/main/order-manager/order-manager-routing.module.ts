import { OrderUpdateComponent } from './container/order-update/order-update.component';
import { OrderAddComponent } from './container/order-add/order-add.component';
import { OrderBaseComponent } from './container/order-base/order-base.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: OrderBaseComponent },
  { path: 'add', component: OrderAddComponent },
  { path: 'update/:id', component: OrderUpdateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderManagerRoutingModule { }
