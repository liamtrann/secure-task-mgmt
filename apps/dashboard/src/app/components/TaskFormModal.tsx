import React from 'react';
import { Modal } from './common';
import { TaskForm } from './TaskForm';
import { Task } from './types/task';

interface TaskFormModalProps {
  showForm: boolean;
  editingTask: Task | null;
  onSave: (task: Task) => void;
  onCancel: () => void;
  categories: string[];
}

export const TaskFormModal: React.FC<TaskFormModalProps> = ({
  showForm,
  editingTask,
  onSave,
  onCancel,
  categories,
}) => {
  return (
    <Modal isOpen={showForm} title={editingTask ? 'Edit Task' : 'Add New Task'}>
      <TaskForm
        task={editingTask}
        onSave={onSave}
        onCancel={onCancel}
        categories={categories}
      />
    </Modal>
  );
};
