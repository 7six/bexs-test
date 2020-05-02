import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validateCard, validateFullname, validateExpireDate } from '@app/shared/validators/custom-validators';


@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  public show = false;
  public form: FormGroup;
  public currentField = null;

  private showInvalidFields = false;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {

    this.createForm();
    this.show = true;
  }

  pay() {

  }

  setCurrentField(field: string) {
    this.currentField = field;
  }

  toggleLabel(id) {
    const element = <any>document.getElementById(id);
    const elementLength = element.value.length;
    if (elementLength >= 1) {
      return true;
    } else {
      return false;
    }
  }

  error(fieldName) {
    const field = this.form.get(fieldName).errors;
    let message;

    if (fieldName === 'cardNumber') {
      if (field.invalidCard) {
        message = 'Por favor, verifique os números do seu cartão';
      } else if (field.noAcceptCard) {
        message = `Verifique os números do seu cartão`;
      } else if (field.sameCard) {
        message = `Esse cartão já está sendo utilizado`;
      } else if (field.minlength) {
        message = `Preencha número do cartão completo`;
      } else if (field.maxlength) {
        message = `Por favor, verifique os números do seu cartão`;
      } else if (field.required) {
        message = `Número do cartão é obrigatório`;
      }
    }

    if (fieldName === 'holderName') {
      if (field.required) {
        message = `Nome do titular do cartão é obrigatório`;
      } else if (field.invalidFullname) {
        message = `Nome do titular é obrigatório`;
      }
    }

    if (fieldName === 'expireDate') {
      if (field.required) {
        message = `Validade é obrigatória`;
      } else if (field.minlength) {
        message = `Preencha a validade completa`;
      } else if (field.invalidDate) {
        message = `Validade do cartão está incorreta`;
      }
    }

    if (message) {
      return message;
    }
  }

  isFieldInvalid(fieldName) {
    const field = this.form.get(fieldName);

    if (field.invalid && field.touched) {
      return true;

    } else if (this.showInvalidFields && field.invalid && field.untouched) {
      return true;

    }

    return false;
  }

  private createForm() {

    this.form = this.formBuilder.group({
      cardNumber: [
        '5555 6666 7777 8884', Validators.compose([
          Validators.required,
          Validators.minLength(13),
          Validators.maxLength(25),
          validateCard
        ])
      ],
      holderName: [
        'FELIPE B A PIO NT', Validators.compose([
          Validators.required,
          validateFullname
        ])
      ],
      expireDate: [
        '06/26', Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(5),
          validateExpireDate
        ])
      ],
      cvv: [
        '1234', Validators.compose([
          Validators.required,
        ])
      ],
      installment: [
        '', Validators.compose([
          Validators.required,
        ])
      ],
    });
  }



}
