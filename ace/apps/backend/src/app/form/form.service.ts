import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { Form } from './entities/form.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class FormService {
  constructor(
    @InjectRepository(Form)
    private readonly formRepository: Repository<Form>
  ){}

  async create(CreateFormDto: CreateFormDto): Promise<Form> {
    const form = this.formRepository.create(CreateFormDto);
    return this.formRepository.save(form);
  }

  findAll(): Promise<Form[]> {
    return this.formRepository.find();
  }

  async findOne(where: FindOptionsWhere<Form>): Promise<Form> {
    const form = await this.formRepository.findOne({ where });
    if (!form){
      throw new NotFoundException();
    }
    return form;
  }

  async update(id: number, updateFormDto: UpdateFormDto): Promise<Form> {
    const form = await this.formRepository.preload({
      id: id,
      ...updateFormDto
    });
    if (!form) {
      throw new NotFoundException();
    }
    return this.formRepository.save(form);  
  }

  async remove(where: FindOptionsWhere<Form>): Promise<void> {
    const form = await this.formRepository.findOne({ where });
    if (!form){
      throw new NotFoundException();
    }  
    await this.formRepository.remove(form);
  }
}
