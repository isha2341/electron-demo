import { ValidatorFn, AbstractControl } from '@angular/forms';

export default class PasswordValidator {
static match(oldPassword: string, matchingControlName: string): ValidatorFn {
  return (controls: AbstractControl) => {
      const matchingControl = controls.get(matchingControlName);
      if (matchingControl?.errors && !matchingControl?.errors['matching']) {
          return null;
      }
      if (oldPassword !== matchingControl?.value) {
        controls.get(matchingControlName)?.setErrors({ matching: true });
          return { matching: true };
      } else {
          return null;
      }
  }
}
}



