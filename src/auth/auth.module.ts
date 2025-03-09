import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module'; // Импортируйте UsersModule, если используете его для аутентификации
import { jwtConstants } from './constants';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }), // Регистрируем Passport с JWT-стратегией
    JwtModule.register({
      secret: jwtConstants.secret, // Секретный ключ для подписи токенов
      signOptions: { expiresIn: '60m' }, // Время жизни токена (например, 60 минут)
    }),
    UsersModule, // Импортируйте UsersModule, если используете его для аутентификации
  ],
  providers: [AuthService, JwtStrategy], // Подключаем JwtStrategy
  exports: [AuthService], controllers: [AuthController], // Экспортируем AuthService, чтобы использовать его в других модулях
})
export class AuthModule {}