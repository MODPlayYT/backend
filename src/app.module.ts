import { Module } from '@nestjs/common'; // Импортируем Module только один раз
import { TypeOrmModule } from '@nestjs/typeorm'; // Импорт TypeOrmModule для работы с базой данных
import { CacheModule } from '@nestjs/cache-manager'; // Импортируем CacheModule из правильного пакета
import * as redisStore from 'cache-manager-redis-store'; // Импортируем redisStore для работы с Redis
import { UsersModule } from './users/users.module'; // Модуль для работы с пользователями
import { EventsModule } from './events/events.module'; // Модуль для работы с мероприятиями
import { RegistrationsModule } from './registrations/registrations.module'; // Модуль для работы с регистрациями
import { User } from './users/entities/user.entity'; // Сущность пользователя
import { Event } from './events/entities/event.entity'; // Сущность мероприятия
import { Registration } from './registrations/entities/registration.entity'; // Сущность регистрации
import { AppController } from './app.controller'; // Контроллер приложения
import { AppService } from './app.service'; // Сервис приложения
import { AuthModule } from './auth/auth.module'; // Модуль для аутентификации
import { RequestsModule } from './requests/requests.module';
import { Request } from './requests/entities/request.entity'; // Импортируем сущность Request



@Module({
  controllers: [AppController], // Регистрация контроллера
  providers: [AppService], // Регистрация сервиса
  imports: [
    // Настройка TypeORM для подключения к PostgreSQL
    TypeOrmModule.forRoot({
      type: 'postgres', // Тип базы данных
      host: 'localhost', // Хост базы данных
      port: 5432, // Порт базы данных
      username: 'MODPlay', // Имя пользователя
      password: 'oleg098', // Пароль
      database: 'oneplusone', // Название базы данных
      entities: [User, Event, Registration, Request], // Сущности, используемые в приложении
      synchronize: true, // Отключаем автоматическую синхронизацию (рекомендуется для production)
    }),
    // Подключение модулей приложения
    UsersModule,
    EventsModule,
    RegistrationsModule,
    AuthModule,
    // Настройка кэширования с использованием Redis
    CacheModule.register({
      store: redisStore, // Используем Redis как хранилище для кэша
      host: 'localhost', // Хост Redis
      port: 6379, // Порт Redis
    }),
    RequestsModule
  ],
})
export class AppModule {}