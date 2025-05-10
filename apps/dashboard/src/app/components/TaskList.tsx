import { Task, TaskStatus } from '../types/task';
import { TaskCard } from './TaskCard';
import { Droppable } from 'react-beautiful-dnd';

interface TaskListProps {
  status: TaskStatus;
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const statusTitles = {
  todo: 'To Do',
  'in-progress': 'In Progress',
  done: 'Done',
};

export const TaskList = ({
  status,
  tasks,
  onEdit,
  onDelete,
}: TaskListProps) => {
  return (
    <div className="flex-1">
      <h2 className="text-xl font-bold mb-4">{statusTitles[status]}</h2>
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`bg-gray-50 p-4 rounded-lg min-h-[200px] ${
              snapshot.isDraggingOver ? 'bg-blue-50' : ''
            }`}
          >
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
