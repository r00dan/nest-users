import { NotFoundException } from '@nestjs/common';

export const notFoundUserById = (id: string) =>
  new NotFoundException(`User with ID: ${id} was not found.`);
