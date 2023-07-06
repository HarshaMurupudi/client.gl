import React, {useEffect} from 'react'
import { connect } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';

import { fetchDeliveryQueueDetails } from './store/actions';
import { fetchPDF, fetchPDFByJob } from '../jobs/store/actions';
import { BasicUsageExample } from '../../components/data-table';

const columns = [
  {
    accessor: 'Job',
    render: ({ Job }) => (
      <p
        style={{
          textDecoration: 'underline',
        }}
      >
        {Job}
      </p>
    ),
  },
  {
    accessor: 'Location_ID'
  },
  {
    accessor: 'On_Hand_Qty'
  },
];

function DeliveryQueueDetails({deliveryQueueDetails, fetchDeliveryQueueDetails, fetchPDFByJob}) {
  const params = useParams();
  const jobID = params.jobID;

  useEffect(() => {
    const fetchPageData = async () => {
      await fetchDeliveryQueueDetails(jobID);
    };

    fetchPageData();
  }, []);

  return (
    <div>
        <BasicUsageExample
          columns={columns}
          rows={deliveryQueueDetails}
          sortStatus={null}
          onSortStatusChange={null}
          onCellClick={({
            event,
            record,
            recordIndex,
            column,
            columnIndex,
          }) => {
            if (column.accessor === 'Job') {
              fetchPDFByJob(record.Job);
            }
          }}
        />
    </div>
  )
}

const mapStateToProps = (state) => ({
  deliveryQueueDetails: state.getIn(['deliveryQueueDetail', 'deliveryQueueDetails']),
});

export default connect(mapStateToProps, { fetchDeliveryQueueDetails, fetchPDFByJob })(
  DeliveryQueueDetails
);
