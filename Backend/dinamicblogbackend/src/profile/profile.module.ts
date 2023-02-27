import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogModule } from '../blog/blog.module';
import { ProfileEntity } from 'src/blog/entities/blog.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProfileEntity]),
    BlogModule, // Añadimos el módulo que contiene la entidad a los imports
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
