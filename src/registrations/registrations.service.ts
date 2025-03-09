import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Registration } from './entities/registration.entity';

@Injectable()
export class RegistrationsService {
  constructor(
    @InjectRepository(Registration)
    private registrationsRepository: Repository<Registration>,
  ) {}

  async create(registration: Registration): Promise<Registration> {
    return this.registrationsRepository.save(registration);
  }

  async findAll(): Promise<Registration[]> {
    return this.registrationsRepository.find();
  }

  async findOne(id: number): Promise<Registration | null> {
    return this.registrationsRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.registrationsRepository.delete(id);
  }
}