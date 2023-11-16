import { Text } from "@mantine/core";

import { GLTextarea } from "../../components/ReactTableTextarea";

export const getColumns = (
  editedUsers: any,
  setEditedUsers: any,
) => {

  const formatTime = (date) => {
    if (date){
      var hours = date.getUTCHours();
      var minutes = date.getUTCMinutes();
      var period = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      var strTime = hours + ':' + minutes + ' ' + period;
      return strTime;
    } 
    return "-";
  }

  const onBlur = (event: any, cell: any, column: any) => {
    const { row } = cell;

    if (editedUsers[row.id]) {
      setEditedUsers({
        ...editedUsers,
        [row.id]: {
          ...editedUsers[row.id],
          ...{ [column.id]: event.currentTarget.value },
        },
      });
    } else {
      setEditedUsers({
        ...editedUsers,
        [row.id]: {
          ...row.original,
          ...{ [column.id]: event.currentTarget.value },
        },
      });
    }
  };

  const columns = [
    {
      accessorKey: "First_Name",
      header: "First Name",
      enableEditing: false,
      filterVariant: "multi-select",
    },
    {
      accessorKey: "Last_Name",
      header: "Last Name",
      enableEditing: false,
      filterVariant: "multi-select",
    },
    {
      accessorFn: (row: any) => {
        if (row.Login) {
          const sDay = new Date(row.Login);
          return sDay;
        }
      },
      enableEditing: false,
      id: "Login",
      header: "Clock In",
      enableColumnFilterModes: true,
      Cell: ({ cell }: { cell: any }) => formatTime(cell.getValue())
    },
    {
      accessorFn: (row: any) => {
        if (row.Logout) {
          const sDay = new Date(row.Logout);
          return sDay;
        }
      },
      enableEditing: false,
      id: "Logout",
      header: "Clock Out",
      enableColumnFilterModes: true,
      Cell: ({ cell }: { cell: any }) => formatTime(cell.getValue()),
    },
    {
      accessorKey: "Attendance_Note",
      header: "Notes",
      enableEditing: true,
      size: 250,
      Cell: ({ cell, row }: { cell: any; row: any }) => (
        <Text>{cell.getValue()}</Text>
      ),
      Edit: ({
        cell,
        column,
        table,
      }: {
        cell: any;
        column: any;
        table: any;
      }) => {
        return (
          <GLTextarea
            cell={cell}
            table={table}
            onTextChange={(e: any) => onBlur(e, cell, column)}
          />
        );
      },
    },
  ];
  return columns;
};
