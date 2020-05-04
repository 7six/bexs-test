import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { CheckoutRoutingModule } from '@checkout/checkout-routing.module';

import { PaymentsComponent } from '@checkout/payments/payments.component';
import { SummaryComponent } from './shared/summary/summary.component';
import { StepBoxComponent } from './shared/step-box/step-box.component';
import { PaymentService } from './services/payment.service';


@NgModule({
  declarations: [
    PaymentsComponent,
    SummaryComponent,
    StepBoxComponent
  ],
  imports: [
    SharedModule,
    CheckoutRoutingModule
  ],
  providers: [
    PaymentService
  ]
})
export class CheckoutModule { }
