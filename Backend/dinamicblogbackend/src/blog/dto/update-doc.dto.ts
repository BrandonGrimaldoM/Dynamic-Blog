import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateDocDto } from './create-doc.dto';

export class UpdateDocDto extends PartialType(CreateDocDto) {
  @IsNotEmpty()
  @IsString()
  html: string;

  @IsNotEmpty()
  @IsString()
  text: string;

  @IsNotEmpty()
  @IsNumber()
  blogId: number;
}
