import { DataTable } from 'mantine-datatable';

interface Props {
  columns: any;
  rows: any;
  onRowClick: any;
  sortStatus: any;
  onSortStatusChange: any;
}

export const BasicUsageExample = ({
  columns,
  rows,
  onRowClick,
  sortStatus,
  onSortStatusChange,
}: Props) => {
  console.log(sortStatus, onSortStatusChange);
  return (
    <DataTable
      columns={columns}
      records={rows}
      onRowClick={onRowClick}
      sortStatus={sortStatus}
      onSortStatusChange={onSortStatusChange}
    />
  );
};
