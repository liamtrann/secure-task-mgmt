export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  category: string;
  dueDate?: string;
  priority?: 'low' | 'medium' | 'high';
}

export type Category = {
  id: string;
  name: string;
  color: string;
};