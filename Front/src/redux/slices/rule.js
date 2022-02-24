import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  rules: {},
  rule: null
};

const slice = createSlice({
  name: 'rule',
  initialState,
  reducers: {


    // Start loading
    startLoading(state) {
      state.isLoading = true;
    },


    // Store all rules
    getRulesSuccess(state, action) {
      const allRules = action.payload.data;
      if (allRules)
        allRules.forEach((rule) => {
          state.rules[rule.id] = rule;
        });
      state.isLoading = false;
    },


    // Store rule by id
    getRuleSuccess(state, action) {
      state.rule = action.payload.data;
      state.isLoading = false;
    },


    // Add/Update rule
    editRule(state, action) {
      const newRule = action.payload.data;
      state.rules[newRule.id] = newRule;
      state.isLoading = false;
    },


    // Delete rule
    deleteRule(state, action) {
      const deletedRule = action.payload.data;
      delete state.rules[deletedRule.id];
      state.isLoading = false;
    },
  }
});


// Reducer
export default slice.reducer;


// Actions
export const {
  startLoading,
  getRulesSuccess,
  getRuleSuccess,
  editRule,
  deleteRule,
} = slice.actions;


// Thunks
const rulesUrl = '/rules';


/**
 * Get all rules
 */
export function getRules() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(rulesUrl);
      dispatch(slice.actions.getRulesSuccess(response.data));
    } catch (error) {
      console.log(error.message);
    }
  };
}


/**
 * Get rule by id
 */
export function getRuleById(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${rulesUrl}/${id}`);
      dispatch(slice.actions.getRuleSuccess(response.data));
    } catch (error) {
      console.error(error.message);
    }
  };
}


/**
 * Post new rule
 */
export function postRule(rule) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(rulesUrl, rule);
      dispatch(slice.actions.editRule(response.data));
    } catch (error) {
      console.error(error.message);
    }
  };
}


/**
 * Update rule
 */
export function putRule(rule) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(`${rulesUrl}/${rule.id}`, rule);
      dispatch(slice.actions.editRule(response.data));
    } catch (error) {
      console.error(error.message);
    }
  };
}


/**
 * Delete rule
 */
export function removeRule(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete(`${rulesUrl}/${id}`);
      dispatch(slice.actions.deleteRule(response.data));
    } catch (error) {
      console.error(error.message);
    }
  };
}
