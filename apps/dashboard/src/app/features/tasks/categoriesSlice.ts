import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CategoriesState {
  categories: string[];
  selectedCategory: string;
}

const initialState: CategoriesState = {
  categories: ["Work", "Personal", "Shopping", "Other"],
  selectedCategory: "all",
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<string>) => {
      if (!state.categories.includes(action.payload)) {
        state.categories.push(action.payload);
      }
    },
    selectCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const { addCategory, selectCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;