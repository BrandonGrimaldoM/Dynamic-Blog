import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { LoginEntity, ProfileEntity } from 'src/blog/entities/blog.entity';
import * as fs from 'fs';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
    @InjectRepository(LoginEntity)
    private readonly loginRepository: Repository<LoginEntity>,
  ) {}

  create(createProfileDto: CreateProfileDto) {
    return 'This action adds a new profile';
  }

  async findAll(): Promise<ProfileEntity[]> {
    return this.profileRepository.find();
  }

  async findOne(user: string) {
    const login = await this.loginRepository.findOne({ where: { user } });
    if (!login) {
      throw new NotFoundException('This user does not exist');
    }
    const profile = await this.profileRepository.findOne({
      where: { id: login.profileId },
    });

    if (profile.avatar === null) {
      return {
        profile,
        user: login.user,
        id: login.id,
      };
    } else {
      const imagen: any = profile.avatar;
      const imagenBuffer = Buffer.from(imagen, 'binary');
      const base64Image = imagenBuffer.toString('base64');
      const img = `data:image/jpeg;base64,${base64Image}`;
      return {
        profile,
        avatarImg: img,
        user: login.user,
        id: login.id,
      };
    }
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    const profile = await this.profileRepository.findOne({ where: { id } });
    if (!profile) {
      throw new NotFoundException(`Login with id ${id} not found`);
    }
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (updateProfileDto.email != '') {
      if (emailRegex.test(updateProfileDto.email)) {
        profile.email = updateProfileDto.email;
      } else {
        throw new BadRequestException(
          `Invalid email format: ${updateProfileDto.email}`,
        );
      }
    }
    if (updateProfileDto.first_name != '') {
      profile.first_name = updateProfileDto.first_name;
    }
    if (updateProfileDto.last_name != '') {
      profile.last_name = updateProfileDto.last_name;
    }

    if (updateProfileDto.avatar != null) {
      profile.avatar = Buffer.from(updateProfileDto.avatar);
    }

    await this.profileRepository.save(profile);

    return profile;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
