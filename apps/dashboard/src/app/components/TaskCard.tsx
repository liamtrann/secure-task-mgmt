import { Draggable } from 'react-beautiful-dnd';
import { Task } from './types/task';
import { Button, DateFormat, Heading, PriorityBadge } from './common';
import { Role } from './types/enums';
import { RootState } from '../store';
import { useSelector } from 'react-redux';

interface TaskCardProps {
  task: Task;
  index: number;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export const TaskCard = ({ task, index, onEdit, onDelete }: TaskCardProps) => {
  const { currentRole } = useSelector((state: RootState) => state.auth);
  const statusColors = {
    todo: 'bg-gray-200',
    'in-progress': 'bg-blue-200',
    done: 'bg-green-200',
  };

  // Permission checks
  const canEdit = currentRole === Role.OWNER || currentRole === Role.ADMIN;
  const canDelete = currentRole === Role.OWNER;

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`p-4 mb-3 rounded-lg shadow ${
            statusColors[task.status]
          } hover:shadow-md transition-shadow`}
        >
          <div className="flex justify-between items-start">
            <Heading title={task.title} />
            <div className="flex space-x-2">
              <Button
                onClick={() => onEdit(task)}
                title="Edit"
                variant="primary"
                disabled={!canEdit}
              />
              <Button
                onClick={() => onDelete(task.id)}
                title="Delete"
                variant="secondary"
                disabled={!canDelete}
              />
            </div>
          </div>
          <p className="text-gray-700 mt-1">{task.description}</p>
          {task.dueDate && <DateFormat title="Due" dueDate={task.dueDate} />}
          {task.priority && <PriorityBadge priority={task.priority} />}
          <div className="mt-2 flex justify-between items-center">
            <span className="text-sm text-gray-600">{task.category}</span>
          </div>
        </div>
      )}
    </Draggable>
  );
};
