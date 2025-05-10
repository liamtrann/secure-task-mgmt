import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '../../types/auth';
import { Role } from '../../types/enums';

const initialState: AuthState = {
  currentRole: Role.VIEWER,
  isAuthenticated: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    switchRole: (state, action: PayloadAction<Role>) => {
      state.currentRole = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.currentRole = Role.VIEWER;
    },
  },
});

export const { switchRole, logout } = authSlice.actions;
export default authSlice.reducer;
