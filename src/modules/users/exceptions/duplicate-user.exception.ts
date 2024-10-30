import { ConflictException } from '@nestjs/common';

export const duplicateUserWithSameEmail = (email: string) =>
  new ConflictException(`User with email: ${email} already exists.`);

export const duplicateUserWithSameUsername = (username: string) =>
  new ConflictException(`User with username: ${username} already exists.`);
