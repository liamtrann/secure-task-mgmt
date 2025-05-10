import { Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Organization } from './organization.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolesGuard, Roles } from '@secure-task-mgmt/auth';
import { Role } from '@secure-task-mgmt/data';

@Resolver(() => Organization)
@UseGuards(RolesGuard)
export class OrganizationResolver {
  constructor(
    @InjectRepository(Organization)
    private readonly orgRepo: Repository<Organization>
  ) {}

  @Query(() => [Organization])
  @Roles(Role.OWNER, Role.ADMIN)
  async organizations(): Promise<Organization[]> {
    return this.orgRepo.find({ relations: ['users'] });
  }
}
