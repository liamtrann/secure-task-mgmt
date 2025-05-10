import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './index';

// Custom hook for dispatching actions
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Custom hook for selecting state
export const useAppSelector: <TSelected>(
  selector: (state: RootState) => TSelected
) => TSelected = useSelector;
