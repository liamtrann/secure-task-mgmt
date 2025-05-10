export interface ITask {
  id: string;
  title: string;
  description?: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  createdAt: Date;
  updatedAt: Date;
  ownerId: string;
  organizationId: string;
}
