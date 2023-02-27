import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginEntity, ProfileEntity } from 'src/blog/entities/blog.entity';
import { Repository } from 'typeorm';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
    @InjectRepository(LoginEntity)
    private readonly loginRepository: Repository<LoginEntity>,
  ) {}

  async create(createLoginDto: CreateLoginDto) {
    const { first_name, last_name, email, user, password } = createLoginDto;

    const profile = this.profileRepository.create({
      first_name,
      last_name,
      email,
    });

    await this.profileRepository.save(profile); // guardar ProfileEntity en la BD para obtener el ID generado

    const login = this.loginRepository.create({
      user,
      password,
      profileId: profile.id, // asignar el ID generado al LoginEntity
    });

    await this.loginRepository.save(login);

    return { profile, login };
  }

  async findAll() {
    return `This action returns login`;
  }

  findOne(id: number) {
    return `This action returns a #${id} login`;
  }

  update(id: number, updateLoginDto: UpdateLoginDto) {
    return `This action updates a #${id} login`;
  }

  remove(id: number) {
    return `This action removes a #${id} login`;
  }
}
