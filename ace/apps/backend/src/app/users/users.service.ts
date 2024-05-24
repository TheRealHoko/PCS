import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from '@ace/shared';
import { UpdateUserDto } from '@ace/shared';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Role } from '../roles/entities/role.entity';
import { Address } from '../address/entities/address.entity';

@Injectable()
export class UsersService {
  private saltRounds = 10;

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
    private readonly loggerService: Logger
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = new User();

    user.email = createUserDto.email;
    user.firstname = createUserDto.firstname;
    user.lastname = createUserDto.lastname;
    user.phone = createUserDto.phone;
    user.email_verification_token = createUserDto.email_verification_token;

    const address = new Address();
    Object.assign(address, createUserDto.address);

    user.addresses = [address];

    if (createUserDto.roles) {
      this.loggerService.log(createUserDto);
      const roles = await Promise.all(
        createUserDto.roles.map(async (role_name) => {
          return this.rolesRepository.findOne({ where: { name: role_name } });
        })
      );

      user.roles = roles.filter((role) => role !== undefined);
    }

    try {
      const hash = await bcrypt.hash(createUserDto.password, this.saltRounds);
      user.hash = hash;
      return this.usersRepository.save(user);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findAll(options?: FindManyOptions<User>): Promise<User[]> {
    const users = await this.usersRepository.find(options);

    if (!users) {
      throw new NotFoundException('No users');
    }

    const usersWithoutHash = users.map((user) => {
      const { hash, ...userWithoutHash } = user;
      return userWithoutHash;
    });

    return usersWithoutHash;
  }

  async findOne(options: FindOneOptions<User>): Promise<User | null> {
    const user = await this.usersRepository.findOne(options);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.usersRepository.findOne({ where: { id } });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      // Apply this when we do user profile logic
      // const isOldPasswordCorrect = await bcrypt.compare(updateUserDto.oldPassword, user.hash);

      // if (!isOldPasswordCorrect) {
      //   throw new BadRequestException("Old password is wrong");
      // }

      if (updateUserDto.roles) {
        const roles = await Promise.all(
          updateUserDto.roles.map(async (role_name) => {
            return this.rolesRepository.findOne({ where: { name: role_name } });
          })
        );

        user.roles = roles.filter((role) => role !== undefined);
        this.loggerService.log(
          `Updating user ${user.id} with ${JSON.stringify(updateUserDto)}`
        );
      }

      const { roles, ...updateUserDtoWithoutRoles } = updateUserDto;

      Object.assign(user, updateUserDtoWithoutRoles);

      if (updateUserDto.password) {
        const hash = await bcrypt.hash(updateUserDto.password, this.saltRounds);
        user.hash = hash;
      }

      return await this.usersRepository.save(user);
    } catch (error) {
      const err = error as Error;
      throw new BadRequestException('Error : ' + err.message);
    }
  }

  remove(id: number) {
    this.usersRepository.delete(id);
  }
}
