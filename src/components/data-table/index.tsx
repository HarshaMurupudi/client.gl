import { DataTable } from 'mantine-datatable';

interface Props {
  columns: any;
  rows: any;
  onRowClick: any;
}

export const BasicUsageExample = ({ columns, rows, onRowClick }: Props) => {
  return <DataTable columns={columns} records={rows} onRowClick={onRowClick} />;
};
