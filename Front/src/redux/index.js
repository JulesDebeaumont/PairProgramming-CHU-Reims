import { configureStore } from '@reduxjs/toolkit'
import rule from './slices/rule';
import term from './slices/term';

export const store = configureStore({
  reducer: {
    rule,
    term
  },
})