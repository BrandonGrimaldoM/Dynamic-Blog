import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Public } from '../auth/docorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Login')
@UseGuards(JwtAuthGuard)
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Public()
  @Post()
  async create(@Body() createLoginDto: CreateLoginDto) {
    const result = await this.loginService.create(createLoginDto);

    return result;
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateLoginDto: UpdateLoginDto,
  ) {
    return await this.loginService.update(id, updateLoginDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.loginService.remove(+id);
    return { message: `Profile ${id} has been deleted` };
  }
}
