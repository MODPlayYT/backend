import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  // Метод для проверки email и пароля
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email); // Находим пользователя по email
    if (user && await bcrypt.compare(pass, user.password)) { // Сравниваем хеши
      const { password, ...result } = user; // Убираем пароль из результата
      return result;
    }
    return null;
  }

  // Метод для генерации JWT-токена
  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}