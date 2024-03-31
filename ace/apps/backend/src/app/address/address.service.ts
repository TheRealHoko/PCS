import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>) {}

  async create(createAddressDto: CreateAddressDto) {
    return await this.addressRepository.save(createAddressDto);
  }

  async findAll(): Promise<Address[]> {
    const addresses = await this.addressRepository.find(); 
    return addresses;
  }

  async findOne(id: number): Promise<Address | null> {
    const address = await this.addressRepository.findOne({where: { id }});

    if (!address) {
      throw new NotFoundException("This address has not been attributed to any user or property");
    }

    return address;
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    this.addressRepository.update(id, updateAddressDto);
  }

  remove(id: number) {
    this.addressRepository.delete(id);
  }
}
