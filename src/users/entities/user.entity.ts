import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Registration } from '../../registrations/entities/registration.entity';
import { Request } from '../../requests/entities/request.entity'; // Импортируем сущность Request

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @OneToMany(() => Registration, (registration) => registration.user)
  registrations: Registration[];

  @OneToMany(() => Request, (request) => request.user)
  requests: Request[];
}
