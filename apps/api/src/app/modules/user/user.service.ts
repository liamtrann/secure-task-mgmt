import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { Organization } from '../organization';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(Organization)
    private readonly orgRepo: Repository<Organization>
  ) {}

  async createUser(input: CreateUserInput): Promise<User> {
    const organization = await this.orgRepo.findOneOrFail({
      where: { id: input.organizationId },
    });

    const user = this.userRepo.create({
      ...input,
      organization,
    });

    return this.userRepo.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepo.find({ relations: ['organization'] });
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepo.findOne({
      where: { id },
      relations: ['organization'],
    });
  }
}
