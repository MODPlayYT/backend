import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Извлечение токена из заголовка Authorization
      ignoreExpiration: false, // Токен будет считаться недействительным после истечения срока
      secretOrKey: jwtConstants.secret, // Секретный ключ для проверки подписи токена
    });
  }

  async validate(payload: any) {
    // payload — это расшифрованный токен
    return { userId: payload.sub, email: payload.email }; // Возвращаем данные пользователя
  }
}