import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Organization } from './organization.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Resolver(() => Organization)
export class OrganizationResolver {
  constructor(
    @InjectRepository(Organization)
    private readonly orgRepo: Repository<Organization>
  ) {}

  // Fetch all organizations (existing)
  @Query(() => [Organization])
  async organizations(): Promise<Organization[]> {
    return this.orgRepo.find({ relations: ['users'] });
  }

  // Create a new organization (no strict role restriction)
  @Mutation(() => Organization)
  async createOrganization(@Args('name') name: string): Promise<Organization> {
    const newOrganization = this.orgRepo.create({ name });
    return this.orgRepo.save(newOrganization);
  }

  // Update an existing organization
  @Mutation(() => Organization)
  async updateOrganization(
    @Args('id') id: string,
    @Args('name') name: string
  ): Promise<Organization> {
    const organization = await this.orgRepo.findOne(id);
    if (!organization) {
      throw new Error('Organization not found');
    }
    organization.name = name;
    return this.orgRepo.save(organization);
  }
}
