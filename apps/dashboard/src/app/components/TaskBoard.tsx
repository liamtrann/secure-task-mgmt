import { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Task, TaskStatus } from '../types/task';
import { TaskList } from '../components/TaskList';
import { TaskForm } from '../components/TaskForm';
import { CategoryFilter } from '../components/CategoryFilter';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import {
  addTask,
  updateTask,
  deleteTask,
  reorderTasks,
} from '../features/tasks/taskSlice';
import { selectCategory } from '../features/tasks/categoriesSlice';
import { Button, Heading, Modal } from '../components/common';

export default function TaskBoard() {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state: RootState) => state.tasks);
  const { categories, selectedCategory } = useSelector(
    (state: RootState) => state.categories
  );

  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;

    dispatch(
      reorderTasks({
        sourceStatus: source.droppableId as TaskStatus,
        destinationStatus: destination.droppableId as TaskStatus,
        sourceIndex: source.index,
        destinationIndex: destination.index,
      })
    );
  };

  const handleSaveTask = (task: Task) => {
    if (editingTask) {
      dispatch(updateTask(task));
    } else {
      dispatch(addTask(task));
    }
    setShowForm(false);
    setEditingTask(null);
  };

  const handleDeleteTask = (id: string) => {
    dispatch(deleteTask(id));
  };

  const handleSelectCategory = (category: string) => {
    dispatch(selectCategory(category));
  };

  const filteredTasks =
    selectedCategory === 'all'
      ? tasks
      : tasks.filter((task) => task.category === selectedCategory);

  const todoTasks = filteredTasks.filter((task) => task.status === 'todo');
  const inProgressTasks = filteredTasks.filter(
    (task) => task.status === 'in-progress'
  );
  const doneTasks = filteredTasks.filter((task) => task.status === 'done');

  return (
    <>
      <div className="max-w-7xl mx-auto">
        <Heading title="Task Management Dashboard" />

        <div className="flex justify-between items-center mb-6">
          <Button
            title="Add New Task"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            onClick={() => {
              setEditingTask(null);
              setShowForm(true);
            }}
          />
        </div>

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />

        {showForm && (
          <Modal
            isOpen={showForm}
            title={editingTask ? 'Edit Task' : 'Add New Task'}
          >
            <TaskForm
              task={editingTask}
              onSave={handleSaveTask}
              categories={categories}
              onCancel={() => setShowForm(false)}
            />
          </Modal>
        )}

        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TaskList
              status="todo"
              tasks={todoTasks}
              onEdit={(task) => {
                setEditingTask(task);
                setShowForm(true);
              }}
              onDelete={handleDeleteTask}
            />
            <TaskList
              status="in-progress"
              tasks={inProgressTasks}
              onEdit={(task) => {
                setEditingTask(task);
                setShowForm(true);
              }}
              onDelete={handleDeleteTask}
            />
            <TaskList
              status="done"
              tasks={doneTasks}
              onEdit={(task) => {
                setEditingTask(task);
                setShowForm(true);
              }}
              onDelete={handleDeleteTask}
            />
          </div>
        </DragDropContext>
      </div>
    </>
  );
}
