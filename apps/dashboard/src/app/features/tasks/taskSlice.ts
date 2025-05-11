import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task, TaskStatus } from '../../components/types/task';

export interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: [
    {
      id: '1',
      title: 'Complete project proposal',
      description: 'Finish the draft and send for review',
      status: 'todo',
      category: 'Work',
      dueDate: '2023-06-15',
      priority: 'high',
    },
    {
      id: '2',
      title: 'Buy groceries',
      description: 'Milk, eggs, bread, fruits',
      status: 'todo',
      category: 'Shopping',
      dueDate: '2023-06-10',
      priority: 'medium',
    },
    {
      id: '3',
      title: 'Morning run',
      description: '5km around the park',
      status: 'in-progress',
      category: 'Personal',
      priority: 'low',
    },
    {
      id: '4',
      title: 'Read React documentation',
      description: 'New hooks and features',
      status: 'done',
      category: 'Work',
      dueDate: '2023-06-05',
      priority: 'medium',
    },
  ],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    reorderTasks: (
      state,
      action: PayloadAction<{
        sourceStatus: TaskStatus;
        destinationStatus: TaskStatus;
        sourceIndex: number;
        destinationIndex: number;
      }>
    ) => {
      const { sourceStatus, destinationStatus, sourceIndex, destinationIndex } =
        action.payload;

      if (sourceStatus === destinationStatus) {
        // Reorder within the same status
        const statusTasks = state.tasks.filter(
          (task) => task.status === sourceStatus
        );
        const [removed] = statusTasks.splice(sourceIndex, 1);
        statusTasks.splice(destinationIndex, 0, removed);

        // Update the tasks array
        state.tasks = state.tasks.map((task) =>
          task.status === sourceStatus ? statusTasks.shift()! : task
        );
      } else {
        // Move to another status
        const taskToMove = state.tasks.find(
          (task) => task.status === sourceStatus
        )!;

        if (taskToMove) {
          taskToMove.status = destinationStatus;
        }
      }
    },
  },
});

export const { addTask, updateTask, deleteTask, reorderTasks } =
  tasksSlice.actions;
export default tasksSlice.reducer;
