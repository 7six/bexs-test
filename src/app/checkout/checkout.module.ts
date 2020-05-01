import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from '@checkout/checkout-routing.module';
import { PaymentsComponent } from '@checkout/payments/payments.component';
import { SummaryComponent } from './shared/summary/summary.component';


@NgModule({
  declarations: [
    PaymentsComponent,
    SummaryComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule
  ]
})
export class CheckoutModule { }
