import { NgModule, Type, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from '@shared';
import { WebsiteRoutingModule } from './website-routing.module';
import { HomeComponent } from './container/home/home.component';
import { HeaderComponent } from './components/header/header.component';
const COMPONENTS: Array<Type<void>> = [
  HomeComponent,
  HeaderComponent
];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    SharedModule,
    WebsiteRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WebsiteModule { }
