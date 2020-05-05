import { TestBed, async } from '@angular/core/testing';

import { PaymentService } from './payment.service';
import { Environment } from 'src/environments/environment';

describe('PaymentService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        { provide: Environment, useValue: new Environment() },
        PaymentService
      ]
    });
  }));

  it('should be created', () => {
    const service: PaymentService = TestBed.get(PaymentService);
    expect(service).toBeTruthy();
  });
});
