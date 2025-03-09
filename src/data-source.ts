import { DataSource } from 'typeorm';
import { User } from './users/entities/user.entity';
import { Event } from './events/entities/event.entity';
import { Registration } from './registrations/entities/registration.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'MODPlay',
  password: 'oleg098',
  database: 'oneplusone',
  entities: [User, Event, Registration],
  synchronize: false, // Отключите синхронизацию при использовании миграций
  migrations: ['src/migrations/*.ts'], // Укажите путь к миграциям
});