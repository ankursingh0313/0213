import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ViewState } from '../../types';

interface UiState {
  currentView: ViewState;
  searchQuery: string;
  isDarkMode: boolean;
}

const initialState: UiState = {
  currentView: ViewState.DASHBOARD,
  searchQuery: '',
  isDarkMode: true,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCurrentView: (state, action: PayloadAction<ViewState>) => {
      state.currentView = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    setTheme: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
  },
});

export const { setCurrentView, setSearchQuery, toggleTheme, setTheme } = uiSlice.actions;

export default uiSlice.reducer;
