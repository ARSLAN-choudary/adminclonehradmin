import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function maxFileSizeValidator(maxBytes: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const files: File[] = control.value || [];
    const hasTooLarge = files.some(f => f.size > maxBytes);
    return hasTooLarge
      ? { maxFileSize: { maxSize: maxBytes, actual: files.map(f => f.size) } }
      : null;
  };
}
