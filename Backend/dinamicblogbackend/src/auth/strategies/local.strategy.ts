/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'user',
            passwordField: 'password',
        })
    }

    async validate(user: string, password: string) {
        const login = await this.authService.validateUser(user, password);
        if(!login){
            throw new UnauthorizedException('not authorized');
        }
        return login;

    }
}
