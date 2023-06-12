import { combineReducers } from 'redux-immutable';
// import { combineReducers } from 'redux';

import { reducer as jobsReducer, reducer } from '../features/jobs/store';

console.log(reducer);

export default combineReducers({
  job: jobsReducer,
});
