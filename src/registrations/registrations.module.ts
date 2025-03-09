import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistrationsController } from './registrations.controller';
import { RegistrationsService } from './registrations.service';
import { Registration } from './entities/registration.entity';
import { UsersModule } from '../users/users.module';
import { EventsModule } from '../events/events.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Registration]),
    UsersModule,
    EventsModule,
  ],
  controllers: [RegistrationsController],
  providers: [RegistrationsService],
})
export class RegistrationsModule {}