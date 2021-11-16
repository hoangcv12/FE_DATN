import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContractAddComponent } from './containers/contract-add/contract-add.component';
import { ContractBaseComponent } from './containers/contract-base/contract-base.component';
import { ContractChangeComponent } from './containers/contract-change/contract-change.component';
import { ContractDetailComponent } from './containers/contract-detail/contract-detail.component';
import { ContractEditComponent } from './containers/contract-edit/contract-edit.component';

const routes: Routes = [
  { path: '', component: ContractBaseComponent },
  { path: 'detail/:code', component: ContractDetailComponent },
  { path: 'add', component: ContractAddComponent },
  { path: 'edit/:code', component: ContractEditComponent },
  { path: 'change', component: ContractChangeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractManagementRoutingModule { }
