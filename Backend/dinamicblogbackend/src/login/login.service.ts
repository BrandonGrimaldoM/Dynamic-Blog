import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BlogEntity,
  DocumentEntity,
  LoginEntity,
  ProfileEntity,
} from 'src/blog/entities/blog.entity';
import { Repository } from 'typeorm';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
    @InjectRepository(LoginEntity)
    private readonly loginRepository: Repository<LoginEntity>,
    @InjectRepository(BlogEntity)
    private readonly blogRepository: Repository<BlogEntity>,
    @InjectRepository(DocumentEntity)
    private readonly documentRepository: Repository<DocumentEntity>,
  ) {}

  async create(createLoginDto: CreateLoginDto) {
    const { first_name, last_name, email, user, password } = createLoginDto;
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      throw new BadRequestException(`Invalid email format: ${email}`);
    }
    const profile = this.profileRepository.create({
      first_name,
      last_name,
      email,
    });

    await this.profileRepository.save(profile);
    const hash = await bcrypt.hash(password, 10);

    const login = this.loginRepository.create({
      user,
      password,
      profileId: profile.id,
    });

    login.password = hash;

    await this.loginRepository.save(login);

    return { profile, user: login.user };
  }

  async findByUsername(user: string): Promise<LoginEntity> {
    const login = await this.loginRepository.findOne({ where: { user } });
    return login;
  }

  async update(id: number, updateLoginDto: UpdateLoginDto) {
    const login = await this.loginRepository.findOne({ where: { id } });
    if (!login) {
      throw new NotFoundException(`Login with id ${id} not found`);
    }

    if (updateLoginDto.user != '') {
      login.user = updateLoginDto.user;
    }

    if (updateLoginDto.password != '') {
      const hash = await bcrypt.hash(updateLoginDto.password, 10);
      login.password = hash;
    }

    await this.loginRepository.save(login);

    return { user: login.user };
  }

  async remove(profileId: number): Promise<void> {
    const profile = await this.profileRepository.findOne({
      where: { id: profileId },
    });

    if (!profile) {
      throw new NotFoundException(`Profile with ID ${profileId} not found`);
    }

    const blogs = await this.blogRepository.find({ where: { profileId } });
    for (const blog of blogs) {
      const documents = await this.documentRepository.find({
        where: { blogId: blog.id },
      });
      if (documents.length > 0) {
        await this.documentRepository.remove(documents);
      }
      await this.blogRepository.remove(blog);
    }

    const login = await this.loginRepository.findOne({ where: { profileId } });
    if (login) {
      await this.loginRepository.remove(login);
    }

    await this.profileRepository.delete(profileId);
  }
}
