import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
// slices
import userReducer from './slices/user';
import instituteReducer from './slices/institute';
import sessionReducer from './slices/session';
import levelsReducer from './slices/levels';
import filtersTestsReducer from './slices/filterTests';
import skillsReducer from './slices/skills';
import testsReducer from './slices/tests';
import variationsReducer from './slices/variations';
import examReducer from './slices/exam';
import testsAllReducer from './slices/testsAll';
import institutPriceReducer from './slices/institutPrice';
import sessionUserReducer from './slices/sessionUser';
import empowermentReducer from './slices/empowerment';
import DocumentsReducer from './slices/docs';
import countryReducer from './slices/country';
import languageReducer from './slices/language';
import roleReducer from './slices/role';
import sessionExamReducer from './slices/sessionExam';
import invoicesReducer from './slices/invoices';
import templateCsvReducer from './slices/templateCsv';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: []
};

const rootReducer = combineReducers({
  user: userReducer,
  institute: instituteReducer,
  session: sessionReducer,
  tests: testsReducer,
  levels: levelsReducer,
  variations: variationsReducer,
  exam: examReducer,
  filtersTests: filtersTestsReducer,
  skills: skillsReducer,
  testsAll: testsAllReducer,
  sessionUser: sessionUserReducer,
  institutPrice: institutPriceReducer,
  empowerment: empowermentReducer,
  documents: DocumentsReducer,
  country: countryReducer,
  language: languageReducer,
  role: roleReducer,
  sessionExam: sessionExamReducer,
  invoices: invoicesReducer,
  templateCsv: templateCsvReducer
});

export { rootPersistConfig, rootReducer };
