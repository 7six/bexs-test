import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validateCard, validateFullname, validateExpireDate } from '@app/shared/validators/custom-validators';
import { ECardsRegex } from '../shared/enum/ECardsRegex';


@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  public show = false;
  public form: FormGroup;
  public currentField = null;
  public installments = [];

  private showInvalidFields = false;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {

    this.createForm();
    this.setFakeInstallments();
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

  mask(event: any) {

    const fieldName = event.target['attributes']['formcontrolname']['value'];
    const field = this.form.get(fieldName);
    let newValue: any;

    if (fieldName === 'cardNumber') {

      const cleanedValue = field.value.replace(/\D/g, '');
      const matcher = cleanedValue.match(/(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})/);
      const value = [matcher[1]];

      value.push((matcher[2]) ? ' ' + matcher[2] : '');
      value.push((matcher[3]) ? ' ' + matcher[3] : '');
      value.push((matcher[4]) ? ' ' + matcher[4] : '');
      newValue = value.join('');

      this.fillCardBrand(cleanedValue)

    } else if (fieldName === 'holderName') {
      newValue = field.value.replace(/\d/g, '');

    } else if (fieldName === 'expireDate') {

      const cleanedValue = field.value.replace(/\D/g, '');
      const matcher = cleanedValue.match(/(\d{0,2})(\d{0,2})/);
      const value = [matcher[1]];
      value.push((matcher[2]) ? '/' + matcher[2] : '');
      newValue = value.join('');

    } else if (fieldName === 'cvv') {

      const cleanedValue = field.value.replace(/\D/g, '');
      const matcher = cleanedValue.match(/(\d{0,3})/);
      newValue = matcher[1];
    }

    if (newValue !== undefined) {
      field.setValue(newValue);
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

  private fillCardBrand(card: any) {

    const field = this.form.get('brand');

    for (const [key, value] of Object.entries(ECardsRegex)) {
      if (card.match(value)) {
        field.setValue(key);
        return;
      }
    }

    field.setValue('');
  }

  private createForm() {

    this.form = this.formBuilder.group({
      cardNumber: [
        '', Validators.compose([
          Validators.required,
          Validators.minLength(13),
          Validators.maxLength(25),
          validateCard
        ])
      ],
      holderName: [
        '', Validators.compose([
          Validators.required,
          validateFullname
        ])
      ],
      expireDate: [
        '', Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(5),
          validateExpireDate
        ])
      ],
      cvv: [
        '', Validators.compose([
          Validators.required,
        ])
      ],
      brand: [
        '', Validators.compose([
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

  private setFakeInstallments() {

    const total = 12000;
    let installments = [];

    for (let i = 1; i <= 12; i++) {
      installments.push({
        installmentNumber: i,
        installmentValue: (total / i),
        interestDescription: (i === 1 ? 'à vista' : 'sem juros')
      });
    }

    this.installments = installments;
  }

}
