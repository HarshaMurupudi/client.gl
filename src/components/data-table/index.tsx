import { DataTable } from 'mantine-datatable';

interface Props {
  columns: any;
  rows: any;
  onRowClick: any;
  sortStatus: any;
  onSortStatusChange: any;
  onCellClick: any;
  rowContextMenu: any;
  rowExpansion: any;
}

export const BasicUsageExample = ({
  columns,
  rows,
  onRowClick,
  sortStatus,
  onSortStatusChange,
  onCellClick,
  rowContextMenu,
  rowExpansion,
}: Props) => {
  return (
    <DataTable
      columns={columns}
      records={rows}
      onRowClick={onRowClick}
      sortStatus={sortStatus}
      onSortStatusChange={onSortStatusChange}
      onCellClick={onCellClick}
      rowContextMenu={rowContextMenu}
      rowExpansion={rowExpansion}
    />
  );
};
