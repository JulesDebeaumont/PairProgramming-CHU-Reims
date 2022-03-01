import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  rules: {},
  rule: null,
  error: null,
};


// Re Order Object for pivot relation
function reOrderObject(rule) {
  const copyRule = { ...rule };
  copyRule.sub_rules.forEach((sub_rule, index) => {
    sub_rule.pivot.operator = copyRule.sub_rule_operators[index];
    sub_rule.criterias.forEach((criteria, subIndex) => {
      criteria.pivot.operator = sub_rule.criteria_operators[subIndex];
    })
  });

  return copyRule;
}


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
      const allRules = action.payload;
      if (allRules)
        allRules.forEach((rule) => {
          state.rules[rule.id] = reOrderObject(rule);
        });
      state.isLoading = false;
    },


    // Store rule by id
    getRuleSuccess(state, action) {
      state.rule = reOrderObject(action.payload);
      state.isLoading = false;
    },


    // Reset stored rule
    resetRuleSingle(state, action) {
      state.rule = null;
      state.isLoading = false;
    },


    // Add/Update rule
    editRule(state, action) {
      const newRule = action.payload;
      state.rules[newRule.id] = reOrderObject(newRule);
    },


    // Delete rule
    deleteRule(state, action) {
      const deletedRuleId = action.payload;
      delete state.rules[deletedRuleId];
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
  resetRuleSingle,
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
    const response = await axios.get(`${rulesUrl}/${id}`);
    dispatch(slice.actions.getRuleSuccess(response.data));
  };
}


/**
 * Post new rule
 */
export function postRule(rule) {
  return async (dispatch) => {
    const response = await axios.post(rulesUrl, rule);
    dispatch(slice.actions.editRule(response.data));
  };
}


/**
 * Update rule
 */
export function putRule(rule) {
  return async (dispatch) => {
    const response = await axios.put(`${rulesUrl}/${rule.id}`, rule);
    dispatch(slice.actions.editRule(response.data));
  };
}


/**
 * Delete rule
 */
export function removeRule(id) {
  return async (dispatch) => {
    const response = await axios.delete(`${rulesUrl}/${id}`);
    dispatch(slice.actions.deleteRule(response.data));
  };
}
