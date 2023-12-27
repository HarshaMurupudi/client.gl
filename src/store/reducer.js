import { combineReducers } from "redux-immutable";
// import { combineReducers } from 'redux';

import { reducer as jobsReducer } from "../features/jobs/store";
import { reducer as userReducer } from "../pages/login/store";
import { reducer as contractsReducer } from "../features/contracts/store";
import { reducer as operationsReducer } from "../features/operations/store";
import { reducer as opReducer } from "../features/po/store";
import { reducer as trackingReducer } from "../features/tracking/store";
import { reducer as pendingJobsReducer } from "../features/pending/store";
import { reducer as engineeringReducer } from "../features/engineering/store";
import { reducer as printReducer } from "../features/print/store";
import { reducer as vendorReducer } from "../features/vendor/store";
import { reducer as deliveryQueueDetailReducer } from "../features/delivery-queue-details/store";
import { reducer as modalReducer } from "../components/modal/store";
import { reducer as poDetailsReducer } from "../features/POReview/store";
import { reducer as materialJobsReducer } from "../features/material-requirement/store";
import { reducer as shiplinesReducer } from "../features/shiplines/store";
import { reducer as mantineDataTableReducer } from "../components/mantine-data-table/store";
import { reducer as attendanceReducer } from "../features/attendance/store";
import { reducer as meetingReducer } from "../features/meeting/store";
import { reducer as calendarReducer } from "../features/calendar/store";
import { reducer as trainingReducer } from "../features/training/store";
import { reducer as trainingLogReducer } from "../features/training/store/log_store";
import { reducer as employeesReducer } from "../features/training/store/employees_store";
import { reducer as namesReducer } from "../features/training/store/names_store";
import { reducer as autoCreateJobFolderReducer } from "../features/auto-create/store";
import { reducer as autoCreatePartFolderReducer } from "../features/auto-create-part-folder/store";
import { reducer as requestsReducer } from "../features/requests/store";
import { reducer as approvalReducer } from "../features/requestApproval/store";
import { reducer as ecoReducer } from "../features/ecoApproval/store";
import { reducer as onHoldReducer } from "../features/onHold/store";

export default combineReducers({
  job: jobsReducer,
  user: userReducer,
  contract: contractsReducer,
  operation: operationsReducer,
  po: opReducer,
  tracking: trackingReducer,
  pendingJob: pendingJobsReducer,
  engineering: engineeringReducer,
  print: printReducer,
  vendor: vendorReducer,
  deliveryQueueDetail: deliveryQueueDetailReducer,
  modal: modalReducer,
  poDetails: poDetailsReducer,
  materialJobs: materialJobsReducer,
  shiplines: shiplinesReducer,
  meeting: meetingReducer,
  training: trainingReducer,
  trainingLog: trainingLogReducer,
  names: namesReducer,
  employees: employeesReducer,
  mantineDataTable: mantineDataTableReducer,
  attendance: attendanceReducer,
  calendar: calendarReducer,
  autoCreateJobFolder: autoCreateJobFolderReducer,
  autoCreatePartFolder: autoCreatePartFolderReducer,
  requests: requestsReducer,
  approval: approvalReducer,
  ecoApproval: ecoReducer,
  onHold: onHoldReducer
});
