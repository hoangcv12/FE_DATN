import { NgModule, Type, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from '@shared';

import { ContractCardInfoComponent } from './components/contract-card-info/contract-card-info.component';
import { ContractCardUserComponent } from './components/contract-card-user/contract-card-user.component';
import { ContractFilterComponent } from './components/contract-filter/contract-filter.component';
import { ContractFormComponent } from './components/contract-form/contract-form.component';
import { ContractHeaderBaseComponent } from './components/contract-header-base/contract-header-base.component';
import { ContractHeaderDetailComponent } from './components/contract-header-detail/contract-header-detail.component';
import { ContractNearestComponent } from './components/contract-nearest/contract-nearest.component';
import { ContractTableComponent } from './components/contract-table/contract-table.component';
import { ContractAddComponent } from './containers/contract-add/contract-add.component';
import { ContractBaseComponent } from './containers/contract-base/contract-base.component';
import { ContractChangeComponent } from './containers/contract-change/contract-change.component';
import { ContractDetailComponent } from './containers/contract-detail/contract-detail.component';
import { ContractEditComponent } from './containers/contract-edit/contract-edit.component';
import { ContractManagementRoutingModule } from './contract-management-routing.module';
const COMPONENTS: Array<Type<void>> = [
  ContractTableComponent,
  ContractHeaderBaseComponent,
  ContractFilterComponent,
  ContractBaseComponent,
  ContractDetailComponent,
  ContractAddComponent,
  ContractEditComponent,
  ContractCardUserComponent,
  ContractFormComponent,
  ContractHeaderDetailComponent,
  ContractCardInfoComponent,
  ContractChangeComponent,
  ContractNearestComponent
];

@NgModule({
  imports: [SharedModule, ContractManagementRoutingModule],
  declarations: COMPONENTS,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ContractManagementModule { }
