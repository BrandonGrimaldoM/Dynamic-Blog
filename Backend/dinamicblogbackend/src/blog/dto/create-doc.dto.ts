import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateDocDto {
  @IsNotEmpty()
  @IsString()
  html: string;

  @IsNotEmpty()
  @IsString()
  text: string;

  @IsNotEmpty()
  @IsNumber()
  blogId: number;

  image: Buffer;
}
