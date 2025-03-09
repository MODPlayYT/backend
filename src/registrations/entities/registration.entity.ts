import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Event } from '../../events/entities/event.entity';

@Entity()
export class Registration {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.registrations)
  user: User;

  @ManyToOne(() => Event, (event) => event.registrations)
  event: Event;

  @Column()
  status: string; // Например, "активна", "отменена"
}