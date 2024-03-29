// @ts-nocheck
import { useEffect, useRef, useState } from 'react';
import {
  MantineReactTable,
  useMantineReactTable,
  MRT_ToggleFiltersButton,
  MRT_EditActionButtons,
  type MRT_RowSelectionState,
} from 'mantine-react-table';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  Tooltip,
  Box,
  Skeleton,
  Text,
  Flex,
  Button,
  Stack,
  Title,
  ActionIcon,
  Divider,
  rem,
  Popover,
  LoadingOverlay,
  Group,
  // IconRefresh,
} from '@mantine/core';
import { IconRefresh } from '@tabler/icons-react';
import { connect } from 'react-redux';
import { useDisclosure } from '@mantine/hooks';

import { MRT_ShowHideColumnsButton } from '../mantine-custom/buttons/MRT_ShowHideColumnsButton';
import { fetchPOPDF } from '../../features/po/store/actions';
import { setModalText, setModalVisibility } from '../modal/store/actions';
import {
  fetchCustomerApprovalPDF,
  fetchZundCutFilePDF,
  openFolder,
  createJobFolders,
  createPartFolders,
  createCert,
} from './store/actions';

interface Props {
  columns: any;
  data: any;
  tableProps: any;
  state: any;
  initialState: any;
  onColumnVisibilityChange: any;
  tableKey: any;
}

const DataTable = ({
  title,
  columns,
  data,
  tableProps,
  state,
  initialState,
  onColumnVisibilityChange,
  tableKey,
  maxHeight,
  minHeight,
  fetchData,
  loading,
  mantineDataTableLoading,
  isEditable,
  isEdited,
  hasCustomActionBtn,
  children,
  hasRefetch,
  fetchPOPDF,
  handleSave,
  setModalVisibility,
  setModalText,
  hasActionColumn,
  enableGrouping,
  customOnRowSelection,
  isBasicTable = false,
  columnFilters,
  fetchCustomerApprovalPDF,
  fetchZundCutFilePDF,
  openFolder,
  createJobFolders,
  createPartFolders,
  createCert,
}: Props) => {
  const navigate = useNavigate();
  const isFirstRender = useRef(true);
  const [opened, { open, close }] = useDisclosure(false);
  const [columnVisibility, setColumnVisibility] = useState(() => {
    return JSON.parse(localStorage.getItem(tableKey)) || {};
  });
  const firstColumn = hasActionColumn ? ['mrt-row-actions'] : [];

  // ? enableGrouping ? mrt - row - expand
  // ? ["mrt-row-expand", "mrt-row-actions"]
  // :
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

  const getFlatColumns = () => {
    let flatColumns = [];

    Object.values(columns).forEach((item) => {
      flatColumns.push(item.accessorKey || item.id);
    });

    return flatColumns;
  };

  const hasNewColumns = (oldColumns, newColumns) => {
    let result = false;

    if (!oldColumns.includes('mrt-row-actions')) {
      return true;
    }

    for (const col of newColumns) {
      if (!oldColumns.includes(col)) {
        result = true;
      }
    }

    for (const col of oldColumns) {
      if (!newColumns.includes(col)) {
        result = true;
      }
    }

    // mrt-row-expand
    if (enableGrouping && !oldColumns.includes('mrt-row-expand')) {
      return true;
    }

    return result;
  };

  const getModifiedColumns = (oldColumns, newColumns) => {
    let columns = [...oldColumns];

    // removed columns
    for (const col of oldColumns) {
      if (!newColumns.includes(col) && col === 'mrt-row-actions') {
        columns = columns.filter((fCol) => fCol !== col);
      }
    }

    // add new columns
    for (const col of newColumns) {
      if (!oldColumns.includes(col)) {
        columns = [...columns, col];
      }
    }

    if (!columns.includes('mrt-row-actions')) {
      columns = [...firstColumn, ...columns];
    }

    return columns;
  };

  const getColumnOrder = () => {
    const exisitingOrder = JSON.parse(
      localStorage.getItem(`${tableKey}-column-order`)
    );

    if (exisitingOrder) {
      // if no new coloumns
      // show exisiting
      // new aditions
      // add it to the last

      if (hasNewColumns(exisitingOrder, getFlatColumns())) {
        // return getFlatColumns();
        return getModifiedColumns(exisitingOrder, getFlatColumns());
      } else {
        return exisitingOrder;
      }
    } else {
      // return local columns
      return [...firstColumn, ...getFlatColumns()];
    }
  };

  const [columnOrder, setColumnOrder] = useState(() => {
    // const localColumns =
    //   JSON.parse(localStorage.getItem(`${tableKey}-column-order`)) ||
    //   getFlatColumns();

    return getColumnOrder();
  });

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  useEffect(() => {
    if (isFirstRender.current) return;

    localStorage.setItem(tableKey, JSON.stringify(columnVisibility));
  }, [columnVisibility]);

  useEffect(() => {
    if (isFirstRender.current) return;

    localStorage.setItem(
      `${tableKey}-column-order`,
      JSON.stringify(columnOrder)
    );
  }, [columnOrder]);

  const handleActionBtn = async (row, type) => {
    const selecetedRowID = row.id.split('_')[0];
    const { Part_Number } = row.original;

    if (type === 'operations') {
      window.open(`/operations/${selecetedRowID}`, '_blank');
    } else if (type === 'customer-approval') {
      await fetchCustomerApprovalPDF(Part_Number);
    } else if (type === 'zund-cut-file') {
      await fetchZundCutFilePDF(Part_Number);
    } else if (type === 'auto-create-job-folders') {
      await createJobFolders(row.original.Job);
    } else if (type === 'auto-create-part-folders') {
      await createPartFolders(row.original.Part_Number);
    } else if (type === 'cert') {
      await createCert(row.original.Job);
    }
  };

  const handleInventoryActionBtn = (row) => {
    window.open(
      `/delivery-queue-details/${row.original.Part_Number}_${row.original.Job}`,
      '_blank'
    );
  };

  const handleMaterialActionBtn = (row, action) => {
    if (action === 'material') {
      window.open(`/material-requirement/${row.original.Job}`, '_blank');
    } else if (action === 'shiplines') {
      window.open(`/shiplines/${row.original.Job}`, '_blank');
    }
  };

  const handleNoteActionBtn = (row) => {
    setModalVisibility(true);
    setModalText(row.original.Note_Text);
  };

  const handlePOActionBtn = async (row) => {
    const jobId = row.original.Job;
    await fetchPOPDF(jobId);
  };

  const handleFolderOpen = async (row, key) => {
    const id = row.original[key];
    await openFolder(id, key);
  };

  // fetchCustomerApprovalPDF

  const table = useMantineReactTable({
    key: tableKey,
    columns: columns,
    data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableRowSelection: false, //enable some features
    enableColumnOrdering: true,
    enableGlobalFilter: false, //turn off a feature
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    enableColumnResizing: true,
    enableGrouping: enableGrouping,
    enableStickyHeader: true,
    enableFacetedValues: true,
    enableMultiSort: true,
    isMultiSortEvent: () => true, //now no need to hold `shift` key to multi-sort
    maxMultiSortColCount: 3, //prevent more than 3 columns from being sorted at once
    // columnFilterDisplayMode: 'popover',
    enablePagination: true, //turn off pagination
    // enableRowVirtualization: true, //enable row virtualization
    mantinePaginationProps: {
      // rowsPerPageOptions: ["100"],
      // showRowsPerPage: true,
      showRowsPerPage: true,
    },
    // paginationDisplayMode: 'mantine',
    // rowCount: data.length,
    mantineTableContainerProps: {
      sx: { maxHeight: maxHeight || '78vh', minHeight: minHeight || '30vh' },
      // sx: { minHeight: minHeight || "30vh" },
    },
    // rowVirtualizerProps: { overscan: 8 }, //optionally customize the virtualizer
    enableBottomToolbar: true,
    columnResizeMode: 'onEnd',
    enablePinning: true,
    initialState: {
      // showColumnFilters: true,
      density: 'xs',
      pagination: { pageSize: 50, pageIndex: 0 },
      ...initialState,
    },
    mantineTableProps: {
      striped: true,
      fontSize: '.80rem',
    },
    mantineTableBodyCellProps: {
      sx: {
        border: '1px solid #ced4da',
        padding: '0 0 0 0.5rem !important',
        input: {
          height: '1.2rem !important',
        },
      },
    },
    ...tableProps,
    state: {
      columnVisibility,
      columnOrder,
      rowSelection,
      isLoading: loading,
      ...(columnFilters && { columnFilters }),
    },
    positionToolbarAlertBanner: 'none', //hide alert banner selection message
    columnFilterDisplayMode: 'popover',
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    renderToolbarInternalActions: ({ table }) => (
      <Flex gap='xs' align='center'>
        {!isBasicTable && (
          <Text fz='md' fw={700}>
            Rows: {data.length}
          </Text>
        )}

        {hasRefetch && (
          <Tooltip label='Refresh Data'>
            <ActionIcon onClick={() => fetchData()}>
              <IconRefresh />
            </ActionIcon>
          </Tooltip>
        )}

        {/* <MRT_ToggleFiltersButton table={table} /> */}
        {!isBasicTable && <MRT_ShowHideColumnsButton table={table} />}
      </Flex>
    ),
    renderTopToolbarCustomActions: () => (
      <Flex align='center' gap='md' style={{ maxWidth: '65vw' }}>
        <Text fz='md' fw={700}>
          {title}
        </Text>
        <Divider size='sm' orientation='vertical' />
        {hasCustomActionBtn && children}
        {isEditable && (
          <Button
            size='xs'
            color='blue'
            onClick={(e) => handleSave(e, table)}
            disabled={isEdited}
          >
            Save
          </Button>
        )}
      </Flex>
    ),
    enableRowActions: hasActionColumn,
    positionActionsColumn: 'first',
    ...(hasActionColumn && {
      renderRowActionMenuItems: ({ row }) => (
        <>
          <Menu.Item onClick={() => handleActionBtn(row, 'operations')}>
            Operations
          </Menu.Item>
          <Menu.Item onClick={() => handlePOActionBtn(row)}>PO</Menu.Item>
          <Menu.Item onClick={() => handleNoteActionBtn(row)}>Note</Menu.Item>
          <Menu.Item onClick={() => handleInventoryActionBtn(row)}>
            Inventory
          </Menu.Item>
          <Menu.Item onClick={() => handleMaterialActionBtn(row, 'material')}>
            Material
          </Menu.Item>
          <Menu.Item onClick={() => handleActionBtn(row, 'customer-approval')}>
            Customer Approval
          </Menu.Item>
          {/* only in zund plot */}
          {/* key = O-ZUNDPLOT-data-table */}
          {(tableKey === 'O-ZUNDPLOT-data-table' ||
            tableKey === 'contracts-queue-data-table') && (
            <Menu.Item onClick={() => handleActionBtn(row, 'zund-cut-file')}>
              Z.Cut File
            </Menu.Item>
          )}
          <Menu.Item onClick={() => handleMaterialActionBtn(row, 'shiplines')}>
            Shiplines
          </Menu.Item>
          {tableKey === `auto-create-folders-jobs-data-table` && (
            <Menu.Item
              onClick={() => handleActionBtn(row, 'auto-create-job-folders')}
            >
              Create Job Folders
            </Menu.Item>
          )}
          {tableKey === `auto-create-folders-parts-data-table` && (
            <Menu.Item
              onClick={() => handleActionBtn(row, 'auto-create-part-folders')}
            >
              Create Part Folders
            </Menu.Item>
          )}
          {/* <Menu.Item onClick={() => handleFolderOpen(row, "Part_Number")}>
            Open Part Folder
          </Menu.Item>
          <Menu.Item onClick={() => handleFolderOpen(row, "Job")}>
            Open Job Folder
          </Menu.Item>
          <Menu.Item onClick={() => handleFolderOpen(row, "Quote")}>
            Open Quote Folder
          </Menu.Item> */}
          <Menu.Item onClick={() => handleActionBtn(row, 'cert')}>
            Cert
          </Menu.Item>

          <Popover width='target' position='right' withArrow shadow='md'>
            <Popover.Target>
              <Button w={150}>Open Folder</Button>
            </Popover.Target>
            <Popover.Dropdown>
              <>
                <Menu.Item onClick={() => handleFolderOpen(row, 'Part_Number')}>
                  Part
                </Menu.Item>
                <Menu.Item onClick={() => handleFolderOpen(row, 'Job')}>
                  Job
                </Menu.Item>
                <Menu.Item onClick={() => handleFolderOpen(row, 'Quote')}>
                  Quote
                </Menu.Item>
              </>
            </Popover.Dropdown>
          </Popover>
        </>
      ),
    }),
    mantineTableBodyRowProps: ({ row }) => ({
      //implement row selection click events manually
      onClick: () => {
        setRowSelection((prev) => ({
          // ...prev,
          [row.id]: !prev[row.id],
        }));
        customOnRowSelection && customOnRowSelection(rowSelection, row);
      },
      selected: rowSelection[row.id],
      sx: {
        cursor: 'pointer',
        // backgroundColor: 'lightblue'
      },
    }),
  });

  return (
    <>
      {/* <GLModal opened={opened} open={open} close={close} /> */}
      <Box pos='relative'>
        <LoadingOverlay
          visible={mantineDataTableLoading}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
        />
        {/* ...other content */}
        <MantineReactTable table={table} key={tableKey} />
      </Box>
    </>
  );
};

const mapStateToProps = (state) => ({
  mantineDataTableLoading: state.getIn([
    'mantineDataTable',
    'mantineDataTableLoading',
  ]),
});

export const MantineDataTable = connect(mapStateToProps, {
  fetchPOPDF,
  setModalVisibility,
  setModalText,
  fetchCustomerApprovalPDF,
  fetchZundCutFilePDF,
  openFolder,
  createJobFolders,
  createPartFolders,
  createCert,
})(DataTable);
