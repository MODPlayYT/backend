import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity'; // Импортируем сущность User

@Entity()
export class Request {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string; // Тип помощи (например, "транспорт", "сопровождение")

  @Column()
  description: string; // Описание заявки

  @Column({ default: 'pending' })
  status: string; // Статус заявки (например, "pending", "in_progress", "completed")

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date; // Дата создания заявки

  // Связь "многие к одному" с сущностью User
  @ManyToOne(() => User, (user) => user.requests)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number; // ID пользователя, создавшего заявку
}