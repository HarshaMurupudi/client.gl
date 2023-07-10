import { useState, useEffect } from 'react';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';

interface Props {
  columns: any;
  data: any;
}

export const MantineDataTable = ({ columns, data }: Props) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 15, //customize the default page size
  });
  useEffect(() => {
    //do something when the pagination state changes
  }, [pagination.pageIndex, pagination.pageSize]);

  const table = useMantineReactTable({
    columns,
    data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableRowSelection: false, //enable some features
    enableColumnOrdering: true,
    enableGlobalFilter: false, //turn off a feature
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    enableColumnResizing: true,
    columnResizeMode: 'onEnd',
    initialState: {
      density: 'xs',
      pagination,
    },
  });

  return <MantineReactTable table={table} />;
};
