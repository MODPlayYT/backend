import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // Создание пользователя
  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10); // Хешируем пароль
    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword, // Сохраняем хешированный пароль
    });
    return this.usersRepository.save(user);
  }

  // Получение всех пользователей
  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  // Получение пользователя по ID
  async findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  // Получение пользователя по email
  async findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  // Обновление пользователя
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10); // Хешируем пароль, если он предоставлен
    }
    await this.usersRepository.update(id, updateUserDto);
    return this.usersRepository.findOne({ where: { id } });
  }

  // Удаление пользователя
  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}