import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  create(createUserDto: CreateUserDto) {
    const user = new User();
    const saltRounds = 10;

    user.email = createUserDto.email;
    user.firstname = createUserDto.firstname;
    user.lastname = createUserDto.lastname;
    user.tel = createUserDto.tel;
    
    bcrypt.hash(createUserDto.password, saltRounds, (err ,hash) => {
      if (err) {
        console.log(err);
      }
      user.hash = hash;
      this.usersRepository.save(user);
    });    
  }

  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.find({
      select: ['id', 'firstname', 'lastname', 'email', 'tel']
    });
    
    if (!users) {
      throw new NotFoundException("No users");
    }

    return users;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({id: id});

    if (!user) {
      throw new NotFoundException("User doesn't exist")
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (!(await this.usersRepository.existsBy({id: id}))) {
      throw new BadRequestException("User doesn't exist")
    }
    
    this.usersRepository.update(id, updateUserDto)
  }

  remove(id: number) {
    this.usersRepository.delete(id);
  }
}
