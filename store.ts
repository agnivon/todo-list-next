import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import todosReducer from './features/todos/todosSlice';
import filtersReducer from './features/filters/filtersSlice';

const store = configureStore({
  reducer: {
    // Define a top-level state field named `todos`, handled by `todosReducer`
    todos: todosReducer,
    filters: filtersReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;