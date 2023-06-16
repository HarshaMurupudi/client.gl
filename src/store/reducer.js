import { combineReducers } from 'redux-immutable';
// import { combineReducers } from 'redux';

import { reducer as jobsReducer } from '../features/jobs/store';
import { reducer as userReducer } from '../pages/login/store';

export default combineReducers({
  job: jobsReducer,
  user: userReducer,
});
