import { combineReducers } from 'redux-immutable';
// import { combineReducers } from 'redux';

import { reducer as jobsReducer } from '../features/jobs/store';
import { reducer as userReducer } from '../pages/login/store';
import { reducer as contractsReducer } from '../features/contracts/store';
import { reducer as operationsReducer } from '../features/operations/store';
import { reducer as opReducer } from '../features/po/store';
import { reducer as trackingReducer } from '../features/tracking/store';
import { reducer as pendingJobsReducer } from '../features/pending/store';
import { reducer as engineeringReducer } from '../features/engineering/store';
import { reducer as  deliveryQueueDetailReducer } from '../features/delivery-queue-details/store';

export default combineReducers({
  job: jobsReducer,
  user: userReducer,
  contract: contractsReducer,
  operation: operationsReducer,
  po: opReducer,
  tracking: trackingReducer,
  pendingJob: pendingJobsReducer,
  engineering: engineeringReducer,
  deliveryQueueDetail: deliveryQueueDetailReducer
});
