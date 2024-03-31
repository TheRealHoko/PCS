import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

export class CustomValidators {
  static passwordPolicy(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: string = control.value;
      let errors: ValidationErrors = {};

      const required = Validators.required(control);
      if (required) {
        return required;
      }

      const minLength = Validators.minLength(8)(control);
      if (minLength) {
        errors['minLength'] = true;
      }

      const maxLength = Validators.maxLength(16)(control);
      if (maxLength) {
        errors['maxLength'] = true;
      }


      const hasUpperCase = /[A-Z]+/.test(value);
      if (!hasUpperCase) {
        errors['hasUpperCase'] = true;
      }

      const hasLowerCase = /[a-z]+/.test(value);
      if (!hasLowerCase) {
        errors['hasLowerCase'] = true;
      }

      const hasNumeric = /[0-9]+/.test(value);
      if (!hasNumeric) {
        errors['hasNumeric'] = true;
      }

      const hasSpecialCharacter = /[\W_]+/.test(value);
      if (!hasSpecialCharacter) {
        errors['hasSpecialCharacter'] = true;
      }

      return Object.keys(errors).length ? errors : null;
    };
  }
}
