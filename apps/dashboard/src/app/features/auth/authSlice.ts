import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Role = 'Owner' | 'Admin' | 'Viewer';

interface AuthState {
  role: Role;
}

const initialState: AuthState = {
  role: 'Viewer',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<Role>) => {
      state.role = action.payload;
    },
  },
});

export const { setRole } = authSlice.actions;
export default authSlice.reducer;
export type { AuthState };