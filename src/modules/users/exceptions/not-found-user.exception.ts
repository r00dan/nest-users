import { NotFoundException } from '@nestjs/common';

export const notFoundUserById = (id: string) =>
  new NotFoundException(`User with ID: ${id} was not found.`);

export const notFoundUserByUsername = (username: string) =>
  new NotFoundException(`User with username: ${username} was not found.`);

export const notFoundUserByEmail = (email: string) =>
  new NotFoundException(`User with email: ${email} was not found.`);
