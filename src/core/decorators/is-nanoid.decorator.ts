import { applyDecorators } from '@nestjs/common';
import {
  IsNotEmpty,
  IsString,
  Length,
  ValidationOptions,
} from 'class-validator';

export function IsNanoId(validationOptions?: ValidationOptions) {
  return applyDecorators(
    IsString(validationOptions),
    Length(21, 21, {
      ...validationOptions,
      message() {
        return '$property must be equal to $constraint1 characters';
      },
    }),
    IsNotEmpty(validationOptions),
  );
}
