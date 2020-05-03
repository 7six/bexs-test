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

    if (this.form.valid) {

    } else {
      console.log(this.form);
      this.showInvalidFields = true;
    }
  }

  setCurrentField(field: string) {
    this.currentField = field;
  }

  toggleLabel(fieldName: string) {
    const field = this.form.get(fieldName);
    return (!!field.value);
  }

  mask(fieldName: string) {

    let newValue: any;
    const field = this.form.get(fieldName);

    if (fieldName === 'cardNumber') {

      console.log(field);


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

  error(fieldName: string) {

    let message: string;
    const error = this.form.get(fieldName).errors;

    if (fieldName === 'cardNumber') {
      if (error.required) {
        message = `Campo obrigatório`;

      } else if (error.invalidCard || error.minlength || error.maxlength) {
        message = 'Número de cartão inválido';
      }
    }

    if (fieldName === 'holderName') {
      if (error.required) {
        message = `Campo obrigatório`;

      } else if (error.invalidFullname) {
        message = `Insira seu nome completo`;
      }
    }

    if (fieldName === 'expireDate') {
      if (error.required) {
        message = `Campo obrigatório`;

      } else if (error.invalidDate || error.minlength || error.maxlength) {
        message = `Data inválida`;
      }
    }

    if (fieldName === 'cvv') {
      if (error.required) {
        message = `Campo obrigatório`;

      } else if (error.minlength || error.maxlength) {
        message = `Código inválido`;
      }
    }

    if (fieldName === 'installment') {
      if (error.required) {
        message = `Insira o número de parcelas`;
      }
    }

    if (message) {
      return message;
    }
  }

  isFieldInvalid(fieldName: string) {
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
        '5555666677778884', Validators.compose([
          Validators.required,
          Validators.minLength(19),
          Validators.maxLength(19),
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
          Validators.minLength(3),
          Validators.maxLength(3),
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

      this.mask('cardNumber');
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
