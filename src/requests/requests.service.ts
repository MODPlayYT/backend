import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from './entities/request.entity';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Request)
    private readonly requestRepository: Repository<Request>,
  ) {}

  async create(createRequestDto: CreateRequestDto): Promise<Request> {
    const request = this.requestRepository.create(createRequestDto);
    return await this.requestRepository.save(request);
  }

  async findAll(): Promise<Request[]> {
    return await this.requestRepository.find();
  }

  async findOne(id: number): Promise<Request> {
    const request = await this.requestRepository.findOne({ where: { id } });
    if (!request) {
      throw new NotFoundException(`Заявка с ID ${id} не найдена`);
    }
    return request;
  }

  async update(id: number, updateRequestDto: UpdateRequestDto): Promise<Request> {
    const request = await this.findOne(id);
    Object.assign(request, updateRequestDto);
    return await this.requestRepository.save(request);
  }

  async remove(id: number): Promise<void> {
    const request = await this.findOne(id);
    await this.requestRepository.remove(request);
  }
}