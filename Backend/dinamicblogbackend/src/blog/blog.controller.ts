import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { CreateDocDto } from './dto/create-doc.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { BlogEntity, DocumentEntity } from './entities/blog.entity';
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

  @Get()
  async findAll(): Promise<BlogEntity[]> {
    return await this.blogService.findAll();
  }

  @Get('docs')
  async findAllDoc(): Promise<DocumentEntity[]> {
    return await this.blogService.findAllDoc();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(+id, updateBlogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogService.remove(+id);
  }
}
