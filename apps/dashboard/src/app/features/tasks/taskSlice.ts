import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TaskCategory = 'Work' | 'Personal' | 'Other';
export type TaskStatus = 'To Do' | 'In Progress' | 'Done';

export interface Task {
  id: string;
  title: string;
  description?: string;
  category: TaskCategory;
  status: TaskStatus;
}

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [
    {
      id: '1',
      title: 'Finish coding challenge',
      category: 'Work',
      status: 'To Do',
    },
    {
      id: '2',
      title: 'Buy groceries',
      category: 'Personal',
      status: 'In Progress',
    },
  ],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload);
    },
    updateTask(state, action: PayloadAction<Task>) {
      const index = state.tasks.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) state.tasks[index] = action.payload;
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
  },
});

export const { addTask, updateTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
export type { TaskState };