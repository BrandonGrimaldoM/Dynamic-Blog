import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileEntity } from 'src/blog/entities/blog.entity';
@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
  ) {}

  create(createProfileDto: CreateProfileDto) {
    return 'This action adds a new profile';
  }

  async findAll(): Promise<ProfileEntity[]> {
    return this.profileRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    const profile = await this.profileRepository.findOne({ where: { id } });
    if (!profile) {
      throw new NotFoundException(`Login with id ${id} not found`);
    }
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (emailRegex.test(updateProfileDto.email)) {
      profile.email = updateProfileDto.email;
    } else {
      throw new BadRequestException(
        `Invalid email format: ${updateProfileDto.email}`,
      );
    }
    profile.first_name = updateProfileDto.first_name;
    profile.last_name = updateProfileDto.last_name;

    await this.profileRepository.save(profile);

    return profile;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
