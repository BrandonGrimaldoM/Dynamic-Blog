import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { CreateDocDto } from './dto/create-doc.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { UpdateDocDto } from './dto/update-doc.dto';
import { BlogEntity, DocumentEntity } from './entities/blog.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Public } from '../auth/docorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Blog')
@UseGuards(JwtAuthGuard)
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  async create(@Body() createBlogDto: CreateBlogDto): Promise<BlogEntity> {
    return await this.blogService.create(createBlogDto);
  }

  @Post('docs')
  async createDoc(@Body() createDocDto: CreateDocDto): Promise<DocumentEntity> {
    return await this.blogService.createDoc(createDocDto);
  }

  @Public()
  @Get()
  async findAll(): Promise<BlogEntity[]> {
    return await this.blogService.findAll();
  }

  @Public()
  @Get('docs')
  async findAllDoc(): Promise<DocumentEntity[]> {
    return await this.blogService.findAllDoc();
  }

  @Public()
  @Get('pagination')
  async getBlogs(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<BlogEntity[]> {
    return this.blogService.getBlogs(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateBlogDto: UpdateBlogDto) {
    return await this.blogService.update(id, updateBlogDto);
  }

  @Patch('docs/:id')
  async updateDoc(@Param('id') id: number, @Body() updateDocDto: UpdateDocDto) {
    return await this.blogService.updateDoc(id, updateDocDto);
  }

  @Delete('docs/:id')
  async removeDoc(@Param('id') id: string): Promise<{ message: string }> {
    await this.blogService.removeDoc(Number(id));
    return { message: `Blog ${id} has been deleted` };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.blogService.remove(Number(id));
    return { message: `Blog ${id} has been deleted` };
  }
}
