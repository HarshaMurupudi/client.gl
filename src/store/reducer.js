import { combineReducers } from 'redux-immutable';
// import { combineReducers } from 'redux';

import { reducer as jobsReducer } from '../features/jobs/store';
import { reducer as userReducer } from '../pages/login/store';
import { reducer as contractsReducer } from '../features/contracts/store';

export default combineReducers({
  job: jobsReducer,
  user: userReducer,
  contract: contractsReducer,
});
