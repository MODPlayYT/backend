import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { Request } from './entities/request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Request])], // Регистрируем сущность Request
  controllers: [RequestsController], // Регистрируем контроллер
  providers: [RequestsService], // Регистрируем сервис
})
export class RequestsModule {}