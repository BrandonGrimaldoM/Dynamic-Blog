import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogModule } from '../blog/blog.module';
import {
  LoginEntity,
  ProfileEntity,
  BlogEntity,
  DocumentEntity,
} from 'src/blog/entities/blog.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      LoginEntity,
      ProfileEntity,
      BlogEntity,
      DocumentEntity,
    ]),
    BlogModule, // Añadimos el módulo que contiene la entidad a los imports
  ],
  controllers: [LoginController],
  providers: [LoginService],
  exports: [LoginService],
})
export class LoginModule {}
