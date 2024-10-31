import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { nanoid } from 'nanoid';
import bcrypt from 'bcrypt';

import { UsersModel } from './users.model';
import { UserDto } from './dtos/user.dto';
import { notFoundUserById } from './exceptions/not-found-user.exception';
import { CreateUserDto } from './dtos/create-user.dto';
import {
  duplicateUserWithSameEmail,
  duplicateUserWithSameUsername,
} from './exceptions/duplicate-user.exception';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UpdateUserPasswordDto } from './dtos/update-user-password.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersModel)
    private readonly usersRepository: Repository<UsersModel>,
  ) {}

  public async getUserList() {
    const users = await this.usersRepository.find();

    return users.map((user) => plainToInstance(UserDto, user));
  }

  public async getUserById(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw notFoundUserById(id);
    }

    return plainToInstance(UserDto, user);
  }

  public async createUser(dto: CreateUserDto) {
    const currentDate = new Date();
    const password = await this.encodePassword(dto.password);
    const candidate = this.usersRepository.create({
      ...dto,
      id: nanoid(),
      password,
      created_at: currentDate,
      updated_at: currentDate,
    });
    const existingUser = await this.usersRepository.findOne({
      where: [{ email: dto.email }, { username: dto.username }],
    });

    if (existingUser) {
      if (existingUser.email === dto.email) {
        throw duplicateUserWithSameEmail(dto.email);
      }

      if (existingUser.username === dto.username) {
        throw duplicateUserWithSameUsername(dto.username);
      }
    }

    await this.usersRepository.save(candidate);

    return plainToInstance(UserDto, candidate);
  }

  public async updateUser(id: string, dto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({ where: { id } });

    const existingUser = await this.usersRepository.findOne({
      where: [{ email: dto.email }, { username: dto.username }],
    });

    if (existingUser) {
      if (existingUser.email === dto.email) {
        throw duplicateUserWithSameEmail(dto.email);
      }

      if (existingUser.username === dto.username) {
        throw duplicateUserWithSameUsername(dto.username);
      }
    }

    await this.usersRepository.save({
      ...user,
      ...dto,
      updated_at: new Date(),
    });
  }

  public async updateUserPassword(
    id: string,
    { password }: UpdateUserPasswordDto,
  ) {
    const user = await this.usersRepository.findOne({ where: { id } });
    const newEncodedPassword = await this.encodePassword(password);

    await this.usersRepository.save({
      ...user,
      password: newEncodedPassword,
      updated_at: new Date(),
    });
  }

  public async deleteUser(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw notFoundUserById(id);
    }

    await this.usersRepository.remove(user);
  }

  private async encodePassword(raw: string) {
    const salt = await bcrypt.genSalt(5);

    return await bcrypt.hash(raw, salt);
  }
}
