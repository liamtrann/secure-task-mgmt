import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from './organization.entity';
import { OrganizationResolver } from './organization.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Organization])],
  providers: [OrganizationResolver],
  exports: [TypeOrmModule],
})
export class OrganizationModule {}
