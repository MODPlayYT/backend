import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Registration } from '../../registrations/entities/registration.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  date: Date;

  @Column()
  location: string;

  @Column()
  category: string;

  @Column()
  maxParticipants: number;

  @OneToMany(() => Registration, (registration) => registration.event)
  registrations: Registration[]; // Связь с регистрациями
}