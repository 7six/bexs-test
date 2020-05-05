import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder } from '@angular/forms';

import { PaymentsComponent } from './payments.component';
import { PaymentService } from '../services/payment.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('PaymentsComponent', () => {
  let component: PaymentsComponent;
  let fixture: ComponentFixture<PaymentsComponent>;

  let injector: TestBed;
  let service: PaymentService;

  const paymentServiceStub: Partial<PaymentService> = {
    pay: (data) => of({ message: 'Pagamento efetuado com sucesso!' })
  };

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule],
      declarations: [PaymentsComponent],
      providers: [
        FormBuilder,
        { provide: PaymentService, useValue: paymentServiceStub }
      ]
    }).compileComponents();

    injector = getTestBed();
    service = injector.get(PaymentService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set current field', () => {

    const fieldName = 'cardNumber';
    component.setCurrentField(fieldName);
    expect(component.currentField).toBe(fieldName);
  });

  it('should toogleLabel() be true when field has data', () => {
    const fieldName = 'cardNumber';
    expect(component.toggleLabel(fieldName)).toBe(false);
  });

  it('should toogleLabel() be false when field has no data', () => {
    const fieldName = 'cardNumber';
    component.setCurrentField(fieldName);
    expect(component.currentField).toBe(fieldName);
  });

  it('should form be valid when filled', () => {
    component.form.reset();
    component.form.get('cardNumber').setValue('5555666677778884');
    component.mask('cardNumber');
    component.form.get('brand').setValue('master');
    component.form.get('holderName').setValue('Ivo S B Junior');
    component.form.get('expireDate').setValue('12/22');
    component.form.get('cvv').setValue(123);
    component.form.get('installment').setValue(1);

    expect(component.form.valid).toBe(true);
  });

  it('should form be invalid when no filled', () => {
    component.form.reset();
    expect(component.form.valid).toBe(false);
  });

  it('should submit call pay service when form valid', () => {

    spyOn(service, 'pay').and.callThrough();

    component.form.reset();
    component.form.get('cardNumber').setValue('5555666677778884');
    component.mask('cardNumber');
    component.form.get('brand').setValue('master');
    component.form.get('holderName').setValue('Ivo S B Junior');
    component.form.get('expireDate').setValue('12/22');
    component.form.get('cvv').setValue(123);
    component.form.get('installment').setValue(1);
    component.submit()

    expect(service.pay).toHaveBeenCalled();
  });
});
