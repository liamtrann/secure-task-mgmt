import { useState } from 'react';
import { Task } from '../types/task';
import { Button, FormField, Input, Label, Select, Textarea } from './common';

interface TaskFormProps {
  task?: Task;
  onSave: (task: Task) => void;
  onCancel: () => void;
  categories: string[];
}

export const TaskForm = ({
  task,
  onSave,
  onCancel,
  categories,
}: TaskFormProps) => {
  const [formData, setFormData] = useState<Task>(
    task || {
      id: '',
      title: '',
      description: '',
      status: 'todo',
      category: categories[0] || 'Personal',
      dueDate: '',
      priority: 'medium',
    }
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const taskToSave = {
      ...formData,
      id: task?.id || Date.now().toString(),
    };
    onSave(taskToSave);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <FormField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        type="textarea"
        rows={3}
      />

      <FormField
        label="Status"
        name="status"
        value={formData.status}
        onChange={handleChange}
        type="select"
        options={[
          { value: 'todo', label: 'To Do' },
          { value: 'in-progress', label: 'In Progress' },
          { value: 'done', label: 'Done' },
        ]}
      />

      <FormField
        label="Category"
        name="category"
        value={formData.category}
        onChange={handleChange}
        type="select"
        options={categories.map((cat) => ({ value: cat, label: cat }))}
      />

      <FormField
        label="Due Date"
        name="dueDate"
        value={formData.dueDate || ''}
        onChange={handleChange}
        type="date"
      />

      <FormField
        label="Priority"
        name="priority"
        value={formData.priority || 'low'}
        onChange={handleChange}
        type="select"
        options={[
          { value: 'low', label: 'Low' },
          { value: 'medium', label: 'Medium' },
          { value: 'high', label: 'High' },
        ]}
      />

      <div className="flex justify-end space-x-3">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          title="Cancel"
        />
        <Button type="submit" title="Save Task" />
      </div>
    </form>
  );
};
