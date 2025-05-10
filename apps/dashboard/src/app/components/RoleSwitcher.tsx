import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setRole } from '../features/auth/authSlice';

export default function RoleSwitcher() {
  const dispatch = useAppDispatch();
  const role = useAppSelector((state) => state.auth.role);

  return (
    <select
      value={role}
      onChange={(e) => dispatch(setRole(e.target.value as any))}
      className="p-2 rounded border"
    >
      <option>Owner</option>
      <option>Admin</option>
      <option>Viewer</option>
    </select>
  );
}
