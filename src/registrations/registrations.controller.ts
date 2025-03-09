import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { RegistrationsService } from './registrations.service';
import { Registration } from './entities/registration.entity';

@Controller('registrations')
export class RegistrationsController {
  constructor(private readonly registrationsService: RegistrationsService) {}

  @Post()
  create(@Body() registration: Registration) {
    return this.registrationsService.create(registration);
  }

  @Get()
  findAll() {
    return this.registrationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.registrationsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.registrationsService.remove(+id);
  }
}