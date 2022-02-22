import { configureStore } from '@reduxjs/toolkit'
import rules from './slices/rules';

export const store = configureStore({
  reducer: {
    rules
  },
})