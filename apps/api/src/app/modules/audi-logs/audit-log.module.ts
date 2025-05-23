import { Module } from '@nestjs/common';
import { AuditLogService } from './audit-log.service';
import { AuditLogResolver } from './audit-log.resolver';

@Module({
  providers: [AuditLogService, AuditLogResolver],
  exports: [AuditLogService],
})
export class AuditLogModule {}
