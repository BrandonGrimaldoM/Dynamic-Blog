import { Injectable } from '@nestjs/common';
import { LoginService } from '../../../login/login.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginEntity } from 'src/blog/entities/blog.entity';
import { PayloadToken } from '../../models/token.model';

@Injectable()
export class AuthService {
  constructor(
    private loginService: LoginService,
    private jwtService: JwtService,
  ) {}

  async validateUser(user: string, password: string) {
    const login = await this.loginService.findByUsername(user);
    if (login) {
      const isMatch = await bcrypt.compare(password, login.password);
      if (isMatch) {
        return { id: login.id, user: login.user };
      }
    }
    return null;
  }

  generateJWT(user: LoginEntity) {
    const payload: PayloadToken = { user: user.user, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
