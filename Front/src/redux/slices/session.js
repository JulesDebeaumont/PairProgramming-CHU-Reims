/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';
import { getUsersBySessionSuccess, deleteUserFromSession, updateUserFromSession } from './user';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  sessions: {},
  sessionsByInstitut: {},
  sessionUsers: {},
  session: null,
  sessionWip: null,
  sessionHasExamsWip: {},
  search: null,
  sortBy: null
};

const slice = createSlice({
  name: 'session',
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

    // GET SESSIONS
    getSessionsSuccess(state, action) {
      state.isLoading = false;
      state.sessions = {};
      const allSessions = action.payload.data;
      if (allSessions)
        allSessions.forEach((session) => {
          state.sessions[session.session_id] = session;
        });
    },

    // GET SESSION
    getSessionSuccess(state, action) {
      state.isLoading = false;
      state.session = action.payload.data;
      // console.log(state.institute);
    },

    // GET SESSIONS BY INSTITUT
    getSessionsByInstitutSuccess(state, action) {
      state.isLoading = false;
      state.sessionsByInstitut = {};
      const allSessions = action.payload.data;
      // console.log(allUsers);
      if (allSessions)
        allSessions.forEach((session) => {
          state.sessionsByInstitut[session.session_id] = session;
        });
    },

    // GET SESSION USERS
    getSessionUsersSuccess(state, action) {
      state.isLoading = false;
      state.sessionUsers = {};
      const allSessionUsers = action.payload.data;
      
      if (allSessionUsers)
        allSessionUsers.forEach((sessionUser) => {
          state.sessionUsers[sessionUser.sessionUser_id] = sessionUser;
        });
    },

    // ADD SESSION
    addSession(state, action) {
      state.isLoading = false;
      const newSession = action.payload.data;
      state.sessions[newSession.session_id] = newSession;
    },

    // UPDATE SESSION
    updateSession(state, action) {
      state.isLoading = false;
      const updatedSession = action.payload.data;
      state.sessions[updatedSession.session_id] = updatedSession;
      state.session = updatedSession;
      // console.log('payload', action.payload.data);
    },

    // STORE WIP SESSION FROM SESSION CREATE
    storeWipSessionInSlice(state, action) {
      state.isLoading = false;
      state.sessionWip = null;
      const wipSession = action.payload;
      state.sessionWip = wipSession;
    },

    // STORE WIP SESSION FROM SESSION CREATE
    storeWipSessionHasExamsInSlice(state, action) {
      state.isLoading = false;
      const wipSessionHasExams = action.payload;

      state.sessionHasExamsWip[wipSessionHasExams.exam_id] = wipSessionHasExams;
    },

    // RESET SESSIONWIP AND SESSIONHASEXAMSWIP
    resetSessionBuild(state, action) {
      state.sessionWip = null;
      state.sessionHasExamsWip = {};
    },

    // DELETE SESSION
    deleteSession(state, action) {
      state.isLoading = false;
      const deletedSession = action.payload.data;
      delete state.sessionsByInstitut[deletedSession.session_id];
      delete state.sessions[deletedSession.session_id];
    },

    // SORT & FILTER INSTITUTS
    sortBySessions(state, action) {
      state.sortBy = action.payload.data;
    },

    // SET SEARCH FORM SESSION
    setSearchForm(state, action) {
      state.isLoading = false;
      state.search = action.payload;
    },

    // CLEAR SEARCH FORM SESSION
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
  addSession,
  deleteSession,
  updateSession,
  sortBySessions,
  setSearchForm,
  clearSearchForm,
  getSessionsByInstitutSuccess,
  storeWipSessionInSlice,
  storeWipSessionHasExamsInSlice,
  resetSessionBuild,
  getSessionUsersSuccess
} = slice.actions;

// ----------------------------------------------------------------------

export function getSessions() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/sessions');
      dispatch(slice.actions.getSessionsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getSessionsFiltered(values) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/sessions?${values}`);
      dispatch(slice.actions.getSessionsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getSession(idInstitut, idSession) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/instituts/${idInstitut}/sessions/${idSession}`);
      dispatch(slice.actions.getSessionSuccess(response.data));
      // les users sont aussi dans la session ici
      dispatch(getUsersBySessionSuccess(response.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function postSession(idInstitut, session) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    await axios.post(`/instituts/${idInstitut}/sessions`, session);
  };
}

// ----------------------------------------------------------------------

export function removeSession(institutId, sessionId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    const response = await axios.delete(`/instituts/${institutId}/sessions/${sessionId}`);
    dispatch(slice.actions.deleteSession(response.data));
    // catch dans 
  };
}

// ----------------------------------------------------------------------

export function putSession(institutId, sessionId, session) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    await axios.put(`/instituts/${institutId}/sessions/${sessionId}`, session);
    const response = await axios.get(`/instituts/${institutId}/sessions/${sessionId}`);
    dispatch(slice.actions.updateSession(response.data))
  };
}

// ----------------------------------------------------------------------

export function putSessionAdmin(institutId, sessionId, session) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    await axios.put(`/instituts/${institutId}/sessions/${sessionId}/admin`, session);
    const response = await axios.get(`/instituts/${institutId}/sessions/${sessionId}`);
    dispatch(slice.actions.updateSession(response.data))
  };
}

// ----------------------------------------------------------------------

export function getSessionUsers(institutId, sessionId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/instituts/${institutId}/sessions/${sessionId}/users`);
      dispatch(getSessionUsersSuccess(response.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function postSessionUsers(values, idInstitut) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    // mettre session values
    await axios.post(`/instituts/${idInstitut}/sessions/users`, values);
  }
}

// ----------------------------------------------------------------------

export function removeSessionUsers(institutId, sessionId, userId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    const response = await axios.delete(`/instituts/${institutId}/sessions/${sessionId}/users/${userId}`);
    dispatch(deleteUserFromSession(response.data));
    //catch dans le handleRemoveUser
  };
}

// ----------------------------------------------------------------------

export function putSessionUsers(institutId, sessionId, patchedUser) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    const response = await axios.put(`/instituts/${institutId}/sessions/${sessionId}/users/${patchedUser.user_id}`, patchedUser);
    dispatch(updateUserFromSession(response.data));
    //catch dans les formulaires
  };
}
