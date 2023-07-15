import { MantineReactTable, useMantineReactTable,
  type MRT_TableOptions,
} from 'mantine-react-table';

interface Props {
  columns: any;
  data: any;
  tableProps: any;
}

export const MantineDataTable = ({ columns, data, tableProps }: Props) => {
  // const [pagination, setPagination] = useState({
  //   pageIndex: 0,
  //   pageSize: 15,
  // });
  // useEffect(() => {
  // }, [pagination.pageIndex, pagination.pageSize]);

  console.log(tableProps)

  const table = useMantineReactTable({
    columns,
    data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableRowSelection: false, //enable some features
    enableColumnOrdering: true,
    enableGlobalFilter: false, //turn off a feature
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    enableColumnResizing: true,
    enablePagination: false, //turn off pagination
    enableRowVirtualization: true, //enable row virtualization
    mantineTableContainerProps: { sx: { maxHeight: '72vh' } },
    rowVirtualizerProps: { overscan: 8 }, //optionally customize the virtualizer
    columnResizeMode: 'onEnd',
    initialState: {
      density: 'xs',
    },
    mantineTableProps:{
      striped: true,
    },
    mantineTableBodyCellProps:{
      sx: {
        border: '1px solid #ced4da', //add a border between columns
      }, 
    },
    ...tableProps
  });

  return (
    <MantineReactTable table={table} />
  )
  

};
