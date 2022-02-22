/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';
import { getUsersByInstitutSuccess, deleteUserFromInstitut, getExaminatorsByInstitutSuccess } from './user';
import { getSessionsByInstitutSuccess } from './session';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  institutes: {},
  institute: null,
  currentInstitut: null,
  max: 0,
  search: null,
  sortBy: null
};

const slice = createSlice({
  name: 'institute',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
      console.log(action.payload);
    },

    // GET INSTITUTS
    getInstitutesSuccess(state, action) {
      state.isLoading = false;

      state.max = Number(action.payload.message.split(" ")[0]);
      const allInstituts = action.payload.data;
      if (allInstituts)
        allInstituts.forEach((institut) => {
          state.institutes[institut.institut_id] = institut;
        });
    },

    // GET INSTITUT
    getInstituteSuccess(state, action) {
      state.isLoading = false;
      state.institute = action.payload.data;
      state.currentInstitut = null;
      state.currentInstitut = action.payload.data.institut_id;
      // console.log(state.institute);
    },

    setCurrentInstitut(state, action) {
      state.isLoading = false;
      state.currentInstitut = null;
      state.currentInstitut = action.payload;
    },

    // ADD INSTITUT
    addInstitute(state, action) {
      state.isLoading = false;
      const newInstitut = action.payload.data;
      state.institutes[newInstitut.institut_id] = newInstitut;
    },

    // UPDATE INSTITUT
    updateInstitute(state, action) {
      state.isLoading = false;
      const updatedInstitut = action.payload.data;
      state.institutes[updatedInstitut.institut_id] = updatedInstitut;
      // console.log('updatedInstit', action.payload.data);
    },

    // DELETE INSTITUT
    deleteInstitute(state, action) {
      state.isLoading = false;
      const deletedInstitut = action.payload.data;
      delete state.institutes[deletedInstitut.institut_id];
    },

    // RESET INSTITUT
    resetInstitutes(state, action) {
      state.institutes = {};
    },

    //  SORT & FILTER INSTITUTS
    sortByInstitutes(state, action) {
      state.sortBy = action.payload.data;
    },

    //  SET SEARCH FORM INSTITUT
    setSearchForm(state, action) {
      state.isLoading = false;
      state.search = action.payload;
    },

    //  CLEAR SEARCH FORM INSTITUT
    clearSearchForm(state, action) {
      state.isLoading = false;
      state.search = null;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const {
  addInstitute,
  deleteInstitute,
  updateInstitute,
  sortByInstitutes,
  setSearchForm,
  clearSearchForm,
  setCurrentInstitut,
  resetInstitutes
} = slice.actions;

// ----------------------------------------------------------------------

export function getInstitutes() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/instituts');
      dispatch(slice.actions.getInstitutesSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getInstitutesFiltered(values) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/instituts?${values}`);
      dispatch(slice.actions.getInstitutesSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getInstitute(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/instituts/${id}`);
      dispatch(slice.actions.getInstituteSuccess(response.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getInstitutUsers(institutId, values) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/instituts/${institutId}/users?${values}`);
      dispatch(getUsersByInstitutSuccess(response.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

// Reçoit les empowerments de l'institut, qui lui contient les examinateurs
export function getInstitutExaminators(institutId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/instituts/${institutId}/empowermenttests`);
      dispatch(getExaminatorsByInstitutSuccess(response.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function postInstitutUsers(values) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    const patchedValues = { ...values, role_id: Number(values.role_id) };
    await axios.post(`/instituts/${values.institut_id}/users`, patchedValues);
    //catch error in handleAddUser
  };
}


// ----------------------------------------------------------------------

export function removeInstitutUsers(institutId, userId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    const response = await axios.delete(`/instituts/${institutId}/users/${userId}`);
    dispatch(deleteUserFromInstitut(response.data));

    // pas de try catch, gérer dans UserListRaw
  };
}

// ----------------------------------------------------------------------

export function postEmpowermentUsers(institutId, values) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    await axios.post(`/instituts/${institutId}/empowermentests`, values);
    //catch error in handleAddExaminator
  };
}


// ----------------------------------------------------------------------

export function removeEmpowermentUsers(institutId, empowermentId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete(`/instituts/${institutId}/empowermentests/${empowermentId}`);
      dispatch(deleteUserEmpowerment(response.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------
// Unused?
export function getInstitutSessions(institutId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/instituts/${institutId}/sessions?levels=true`);
      dispatch(getSessionsByInstitutSuccess(response.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------
// For InstitutUserDetail & InstitutSessionsEdit
export function getInstitutSessionsWithUser(idInstitut) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    const response = await axios.get(`/instituts/${idInstitut}/sessions?users=true&levels=true`);
    dispatch(getSessionsByInstitutSuccess(response.data));
  };
}

// ----------------------------------------------------------------------

export function postInstitute(institute) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/instituts', institute);
      dispatch(slice.actions.addInstitute(response.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function removeInstitute(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    const response = await axios.delete(`/instituts/${id}`);
    dispatch(slice.actions.deleteInstitute(response.data));
  };
}

// ----------------------------------------------------------------------

export function putInstitute(institute) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    await axios.put(`/instituts/${institute.institut_id}`, institute);
  };
}
