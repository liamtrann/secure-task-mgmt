import { useAppDispatch, useAppSelector } from '../store/hooks';
import { deleteTask } from '../features/tasks/taskSlice';

export default function TaskList() {
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const dispatch = useAppDispatch();

  return (
    <div className="p-4 space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="p-4 bg-white dark:bg-gray-800 shadow-md rounded-md flex justify-between"
        >
          <div>
            <h2 className="text-lg font-semibold">{task.title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">{task.category}</p>
            <p className="text-sm italic">{task.status}</p>
          </div>
          <button
            onClick={() => dispatch(deleteTask(task.id))}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
