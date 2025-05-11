import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { switchRole } from '../features/auth/authSlice';
import SelectOption from './common/SelectOption';
import { Role } from './types/enums';

const roleOptions: Role[] = [Role.ADMIN, Role.OWNER, Role.VIEWER];

const RoleSwitcher = () => {
  const dispatch = useDispatch();
  const currentRole = useSelector((state: RootState) => state.auth.currentRole);

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(switchRole(e.target.value as Role));
  };

  return (
    <div className="role-switcher">
      <SelectOption
        value={currentRole}
        onChange={handleRoleChange}
        options={roleOptions}
      />
    </div>
  );
};

export default RoleSwitcher;
