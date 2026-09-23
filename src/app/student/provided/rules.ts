import { ValidationError } from '@angular/forms/signals';

export function nonBlankError(value: string): ValidationError | undefined {
  return value.trim().length > 0
    ? undefined
    : { kind: 'blank', message: 'La valeur ne peut pas être vide.' };
}

export function integerError(value: number | null): ValidationError | undefined {
  return value !== null && Number.isInteger(value)
    ? undefined
    : { kind: 'integer', message: 'Saisissez une année entière.' };
}