import { FormControl } from '@angular/forms';

export function validateCard(control: FormControl) {

    let value = control.value;

    if (value !== undefined && value.replace(/\D/g, '').length > 12) {
        value = control.value.replace(/\D/g, '');

        let nCheck = 0;
        let nDigit = 0;
        let bEven = false;

        const allowedFirstNumbers = [2, 3, 4, 5, 6];
        const firstNumber = parseInt(value.substring(0, 1), 10);

        if (allowedFirstNumbers.indexOf(firstNumber) === -1) {
            return {
                noAcceptCard: true
            };
        }

        for (let n = value.length - 1; n >= 0; n--) {
            const cDigit = value.charAt(n);
            nDigit = parseInt(cDigit, 10);

            if (bEven) {
                /* tslint:disable-next-line */
                if ((nDigit *= 2) > 9) {
                    nDigit -= 9;
                }
            }

            nCheck += nDigit;
            bEven = !bEven;
        }

        if ((nCheck % 10) === 0) {
            return null;
        }

        return {
            invalidCard: true
        };

    }
}

export function validateExpireDate(control: FormControl) {
    let value = control.value;

    if (value !== undefined && value.length === 5) {

        const today = new Date();
        const cardDate = new Date();
        const currentYear = today.getFullYear();

        value = value.split('/');
        let year = parseInt('20' + value[1], 10);
        let month = parseInt(value[0], 10);

        if (month === 12) {
            month = 0;
            year = year + 1;
        }

        cardDate.setFullYear(year, month, 1);
        // console.log(today);
        if (cardDate < today || month > 12 || year > (currentYear + 10)) {
            return { invalidDate: true };
        }
        return null;
    }
}

export function validateFullname(control: FormControl) {

    if (control.value) {

        const value = control.value.replace(/\d/g, '');
        const values = value.split(' ');

        if ((values[0] && values[0].length > 1) &&
            (values[1] && values[1].length > 0)) {
            return null;
        }
    }

    return { invalidFullname: true };
}
