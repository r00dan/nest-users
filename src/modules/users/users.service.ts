import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';

import { UsersModel } from './users.model';
import { UserDto } from './dtos/user.dto';
import {
  notFoundUserByEmail,
  notFoundUserById,
  notFoundUserByUsername,
} from './exceptions/not-found-user.exception';
import { CreateUserDto } from './dtos/create-user.dto';
import { nanoid } from 'nanoid';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersModel)
    private readonly usersRepository: Repository<UsersModel>,
  ) {}

  public async getUsers() {
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

  public async getUserByUsername(username: string) {
    const user = await this.usersRepository.findOne({ where: { username } });

    if (!user) {
      throw notFoundUserByUsername(username);
    }

    return plainToInstance(UserDto, user);
  }

  public async getUserByEmail(email: string) {
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      throw notFoundUserByEmail(email);
    }

    return plainToInstance(UserDto, user);
  }

  public async createUser(dto: CreateUserDto) {
    const currentDate = new Date();

    await this.usersRepository.save({
      id: nanoid(),
      created_at: currentDate,
      updated_at: currentDate,
      ...dto,
    });
  }
}
