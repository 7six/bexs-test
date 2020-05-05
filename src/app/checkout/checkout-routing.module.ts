import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentsComponent } from '@checkout/payments/payments.component';
import { ConfirmationComponent } from '@checkout/confirmation/confirmation.component';

const routes: Routes = [
  { path: '', component: PaymentsComponent },
  { path: 'confirmacao', component: ConfirmationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule { }