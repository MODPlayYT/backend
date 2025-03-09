import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
  ) {}

  async create(event: Event): Promise<Event> {
    return this.eventsRepository.save(event);
  }

  async findAll(): Promise<Event[]> {
    return this.eventsRepository.find();
  }

  async findOne(id: number): Promise<Event | null> {
    return this.eventsRepository.findOne({ where: { id } });
  }

  async update(id: number, event: Event): Promise<Event | null> {
    await this.eventsRepository.update(id, event);
    return this.eventsRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.eventsRepository.delete(id);
  }
}