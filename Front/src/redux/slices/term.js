import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

const initialState = {
  isLoading: false,
  terms: {},
  term: null
};

const slice = createSlice({
  name: 'term',
  initialState,
  reducers: {


    // Start loading
    startLoading(state) {
      state.isLoading = true;
    },


    // Store all terms
    getTermsSuccess(state, action) {
      const allTerms = action.payload;
      if (allTerms)
        allTerms.forEach((term) => {
          state.terms[term.id] = term;
        });
      state.isLoading = false;
    },


    // Store term by id
    getTermSuccess(state, action) {
      state.term = action.payload;
      state.isLoading = false;
    },


    // Add/Update term
    editTerm(state, action) {
      const editedTerm = action.payload;
      state.terms[editedTerm.id] = editedTerm;
      state.isLoading = false;
    },


    // Delete term
    deleteTerm(state, action) {
      const deletedTermI = action.payload;
      delete state.terms[deletedTermI];
      state.isLoading = false;
    },
  }
});


// Reducer
export default slice.reducer;


// Actions
export const {
  startLoading,
  getTermsSuccess,
  getTermSuccess,
  editTerm,
  deleteRule,
} = slice.actions;


// Thunks
const termsUrl = '/terms';


/**
 * Get all terms
 */
export function getTerms() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(termsUrl);
      dispatch(slice.actions.getTermsSuccess(response.data));
    } catch (error) {
      console.log(error.message);
    }
  };
}


/**
 * Get term by id
 */
export function getRuleById(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${termsUrl}/${id}`);
      dispatch(slice.actions.getTermSuccess(response.data));
    } catch (error) {
      console.error(error.message);
    }
  };
}


/**
 * Post term
 */
export function postTerm(term) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    const response = await axios.post(termsUrl, term);
    dispatch(slice.actions.editTerm(response.data));
  };
}


/**
 * Update term
 */
export function putTerm(term) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    const response = await axios.put(`${termsUrl}/${term.id}`, term);
    dispatch(slice.actions.editTerm(response.data));
  };
}


/**
 * Delete term
 */
export function removeTerm(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    const response = await axios.delete(`${termsUrl}/${id}`);
    dispatch(slice.actions.deleteTerm(response.data));
  };
}
