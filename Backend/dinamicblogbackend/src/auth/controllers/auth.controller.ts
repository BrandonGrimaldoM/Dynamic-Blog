import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth/auth.service';
import { LoginEntity } from 'src/blog/entities/blog.entity';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({ summary: 'Principal login system for Auth' })
  login(@Req() req: Request) {
    return this.authService.generateJWT(req.user as LoginEntity);
  }
}
