import { PartialType } from '@nestjs/swagger';
import { CreateLoginDto } from './create-login.dto';
import { IsNotEmpty, IsString } from 'class-validator';
export class UpdateLoginDto extends PartialType(CreateLoginDto) {
  @IsNotEmpty()
  @IsString()
  user: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}
