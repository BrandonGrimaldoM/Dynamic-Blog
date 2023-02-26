/* eslint-disable prettier/prettier */
import { DataSource, DataSourceOptions } from 'typeorm';
import {
  ProfileEntity,
  LoginEntity,
  BlogEntity,
  DocumentEntity,
} from '../src/blog/entities/blog.entity';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
config();
const configService = new ConfigService();
export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: configService.get<string>('DATABASE_HOST'),
  port: configService.get<number>('DATABASE_PORT'),
  username: configService.get<string>('DATABASE_USER'),
  password: configService.get<string>('DATABASE_PASSWORD'),
  database: configService.get<string>('DATABASE_NAME'),
  entities: [ProfileEntity, LoginEntity, BlogEntity, DocumentEntity],
  migrations: [configService.get<string>('TYPEORM_MIGRATION')],
  synchronize: configService.get<boolean>('TYPEORM_SYNCHRONIZE'),
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
