import { createSelector } from "reselect";

const materailJobs = (state) => state.getIn(["materialJobs", "materialJobs"]);

export const selectMaterialJobsOpenTotals = createSelector(
  materailJobs,
  (materailJobs) => {
    let materialTotals = {};

    Object.entries(materailJobs).forEach(([material, jobData]) => {
      const total = jobData.jobs.reduce((total, item) => {
        total += item.Deferred_Qty;
        return total;
      }, 0);

      materialTotals[material] = total.toFixed(2);
    });

    return materialTotals;
  }
);
