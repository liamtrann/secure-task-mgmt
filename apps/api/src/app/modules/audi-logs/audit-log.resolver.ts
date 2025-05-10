import { Resolver, Query } from '@nestjs/graphql';
import { AuditLogService } from './audit-log.service';
import { UseGuards } from '@nestjs/common';
import { AuditEntry } from './models/audit-log.model';
import { Roles, RolesGuard } from '@secure-task-mgmt/auth';
import { Role } from '@secure-task-mgmt/data';

@Resolver(() => AuditEntry)
export class AuditLogResolver {
  constructor(private readonly auditLogService: AuditLogService) {}

  @Query(() => [AuditEntry])
  @Roles(Role.OWNER, Role.ADMIN)
  @UseGuards(RolesGuard)
  auditLog(): AuditEntry[] {
    return this.auditLogService.getEntries();
  }
}
