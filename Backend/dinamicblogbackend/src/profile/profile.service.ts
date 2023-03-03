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
    return { profile, user: login.user, id: login.id };
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

    await this.profileRepository.save(profile);

    return profile;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
