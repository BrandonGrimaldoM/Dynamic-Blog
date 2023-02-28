import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import {
  LoginEntity,
  ProfileEntity,
  BlogEntity,
  DocumentEntity,
} from '../blog/entities/blog.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LoginEntity,
      ProfileEntity,
      BlogEntity,
      DocumentEntity,
    ]),
  ],
  controllers: [BlogController],
  providers: [BlogService],
  exports: [BlogService],
})
export class BlogModule {}
