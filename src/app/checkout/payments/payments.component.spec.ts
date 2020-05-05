import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder } from '@angular/forms';

import { PaymentsComponent } from './payments.component';
import { PaymentService } from '../services/payment.service';
import { Router } from '@angular/router';

describe('PaymentsComponent', () => {
  let component: PaymentsComponent;
  let fixture: ComponentFixture<PaymentsComponent>;

  beforeEach(async(() => {

    const routerStub = { navigate: () => ({}) };
    const PaymentServiceStub = {};

    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule],
      declarations: [PaymentsComponent],
      providers: [
        FormBuilder,
        // { provide: Router, useValue: routerStub },
        { provide: PaymentService, useValue: PaymentServiceStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
