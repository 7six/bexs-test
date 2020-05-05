import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Environment } from 'src/environments/environment';

import { IPayment } from '../shared/interfaces/IPayments';

@Injectable()
export class PaymentService {

  constructor(
    // private env: Environment,
    // private http: HttpClient,
  ) { }

  pay(data: IPayment): Observable<any> {

    // MOCK
    if (data.cardNumber !== '4111111111111111') {
      return of({ message: 'Pagamento efetuado com sucesso!' });
    } else {
      return throwError({ message: 'Pagamento não aprovado' });
    }

    // REAL REQUEST BODY TO API
    // return this.http.post(`${this.env.apiUrl}/payments`, data, {
    //   observe: 'response'

    // }).pipe(map((res) => {
    //   return res.body;

    // }), catchError((err) => {
    //   throw err;

    // }));
  }
}
