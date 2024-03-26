import { BadRequestException, Injectable, Logger, NotFoundException} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Role } from '../roles/entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
    private readonly loggerService: Logger
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = new User();
    const saltRounds = 10;

    user.email = createUserDto.email;
    user.firstname = createUserDto.firstname;
    user.lastname = createUserDto.lastname;
    user.tel = createUserDto.tel;
    
    if (createUserDto.roles) {
      this.loggerService.log(createUserDto);
      const roles = await Promise.all(createUserDto.roles.map(async role_name => {
        return this.rolesRepository.findOne({ where: { name: role_name } });
      }));
  
      user.roles = roles.filter(role => role !== undefined);
    }

    bcrypt.hash(createUserDto.password, saltRounds, (err ,hash) => {
      if (err) {
        console.log(err);
        return;
      }
      user.hash = hash;
      this.usersRepository.save(user);
    });    
  }

  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.find({
      select: ['id', 'firstname', 'lastname', 'email', 'tel', 'roles']
    });
    
    if (!users) {
      throw new NotFoundException("No users");
    }

    return users;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: {
        id: id
      },
      select: ['id', 'firstname', 'lastname', 'email', 'tel', 'roles']
    });

    if (!user) {
      throw new NotFoundException("User doesn't exist")
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.usersRepository.findOne({where: {id}});

      if (!user) {
        throw new NotFoundException("User not found");
      }

      if (updateUserDto.roles) {
        const roles = await Promise.all(updateUserDto.roles.map(async role_name => {
          return this.rolesRepository.findOne({ where: { name: role_name } });
        }));
    
        user.roles = roles.filter(role => role !== undefined);
      }
    } catch (error) {
      const err = error as Error;
      throw new BadRequestException("Error : " + err.message);
    }
  }

  remove(id: number) {
    this.usersRepository.delete(id);
  }
}
