import { useSelector } from 'react-redux';
import RoleSwitcher from './components/RoleSwitcher';
import TaskBoard from './components/TaskBoard';
import { RootState } from './store';

const App = () => {
  const { currentRole } = useSelector((state: RootState) => state.auth);
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="flex justify-between items-center w-full">
        <span className="text-sm font-medium">Current Role: {currentRole}</span>
        <RoleSwitcher />
      </div>
      <TaskBoard />
    </div>
  );
};

export default App;
