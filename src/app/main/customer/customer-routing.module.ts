import { CustomerUpdateComponent } from './container/customer-update/customer-update.component';
import { CustomerBaseComponent } from './container/customer-base/customer-base.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: CustomerBaseComponent },
  // { path: 'add', component: OrderAddComponent },
  { path: 'update/:id', component: CustomerUpdateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
