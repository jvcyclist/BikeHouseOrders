import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { BikehouseordersSharedModule } from 'app/shared/shared.module';
import { BikehouseordersCoreModule } from 'app/core/core.module';
import { BikehouseordersAppRoutingModule } from './app-routing.module';
import { BikehouseordersHomeModule } from './home/home.module';
import { BikehouseordersEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { BikehouseordersOrderModule } from 'app/entities/order/order.module';
import { FormsModule } from '@angular/forms';
import { BikehouseordersNeededPartModule } from 'app/entities/needed-part/needed-part.module';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarContainerComponent } from './layouts/calendar-container/calendar-container.component';
import { FlatpickrModule } from 'angularx-flatpickr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserModule,
    BikehouseordersSharedModule,
    BikehouseordersCoreModule,
    BikehouseordersHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    BikehouseordersEntityModule,
    BikehouseordersAppRoutingModule,
    BikehouseordersOrderModule,
    FormsModule,
    BikehouseordersNeededPartModule,
    BrowserAnimationsModule,
    FlatpickrModule.forRoot(),

    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  declarations: [
    MainComponent,
    NavbarComponent,
    ErrorComponent,
    PageRibbonComponent,
    ActiveMenuDirective,
    FooterComponent,
    DashboardComponent,
    CalendarContainerComponent
  ],
  bootstrap: [MainComponent]
})
export class BikehouseordersAppModule {}
