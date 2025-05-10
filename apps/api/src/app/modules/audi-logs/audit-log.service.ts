import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { AuditEntry } from './models/audit-log.model';

@Injectable()
export class AuditLogService {
  private readonly logFile = path.join(__dirname, 'audit.log');

  private entries: AuditEntry[] = [];

  log(userId: string, action: string, targetId?: string, metadata?: string) {
    const entry: AuditEntry = {
      timestamp: new Date().toISOString(),
      userId,
      action,
      targetId,
      metadata,
    };

    this.entries.push(entry);

    const line = JSON.stringify(entry);
    fs.appendFileSync(this.logFile, line + '\n');
  }

  getEntries(): AuditEntry[] {
    return [...this.entries];
  }
}
