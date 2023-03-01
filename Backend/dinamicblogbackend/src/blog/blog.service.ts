import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { CreateDocDto } from './dto/create-doc.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { UpdateDocDto } from './dto/update-doc.dto';
import {
  BlogEntity,
  ProfileEntity,
  DocumentEntity,
} from './entities/blog.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DateTime } from 'luxon';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogEntity)
    private readonly blogRepository: Repository<BlogEntity>,
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
    @InjectRepository(DocumentEntity)
    private readonly documentRepository: Repository<DocumentEntity>,
  ) {}

  async create(createBlogDto: CreateBlogDto): Promise<BlogEntity> {
    const profile = await this.profileRepository.findOne({
      where: { id: createBlogDto.profileId },
    });

    if (!profile) {
      throw new NotFoundException(
        `Profile with id ${createBlogDto.profileId} not found`,
      );
    }

    const blog = new BlogEntity();
    blog.title = createBlogDto.title;
    blog.description = createBlogDto.description;
    blog.state = createBlogDto.state;

    // Asignar la fecha actual al campo "date"
    blog.date = DateTime.local().toJSDate();
    blog.profile = profile;

    return this.blogRepository.save(blog);
  }

  async createDoc(createDoDto: CreateDocDto): Promise<DocumentEntity> {
    const id = await this.blogRepository.findOne({
      where: { id: createDoDto.blogId },
    });

    if (!id) {
      throw new NotFoundException(
        `Profile with id ${createDoDto.blogId} not found`,
      );
    }
    const document = new DocumentEntity();
    document.text = createDoDto.text;
    document.html = createDoDto.html;
    document.blogId = id.id;
    return this.documentRepository.save(document);
  }

  async findAll(): Promise<BlogEntity[]> {
    return await this.blogRepository.find();
  }

  async findAllDoc(): Promise<DocumentEntity[]> {
    return await this.documentRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} blog`;
  }

  async update(id: number, updateBlogDto: UpdateBlogDto) {
    const blog = await this.blogRepository.findOne({ where: { id } });
    if (!blog) {
      throw new NotFoundException(`Login with id ${id} not found`);
    }

    blog.title = updateBlogDto.title;
    blog.description = updateBlogDto.description;
    blog.date = DateTime.local().toJSDate();
    blog.state = updateBlogDto.state;

    await this.blogRepository.save(blog);

    return blog;
  }

  async updateDoc(id: number, updateDocDto: UpdateDocDto) {
    const document = await this.documentRepository.findOne({ where: { id } });
    if (!document) {
      throw new NotFoundException(`Login with id ${id} not found`);
    }

    document.html = updateDocDto.html;
    document.text = updateDocDto.text;

    await this.documentRepository.save(document);

    return document;
  }

  async removeDoc(id: number): Promise<void> {
    const doc = await this.documentRepository.findOne({ where: { id } });
    if (!doc) {
      throw new NotFoundException(`Login with id ${id} not found`);
    }
    await this.documentRepository.delete(id);
  }

  async remove(blogId: number): Promise<void> {
    const blog = await this.blogRepository.findOne({ where: { id: blogId } });

    if (!blog) {
      throw new NotFoundException(`Blog with ID ${blogId} not found`);
    }
    await this.documentRepository.delete({ blogId });
    await this.blogRepository.delete(blogId);
  }
}
