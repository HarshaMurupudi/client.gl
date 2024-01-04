import { Text } from "@mantine/core";

import { GLTextarea } from "../../components/ReactTableTextarea";
import { start } from "repl";

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
      minutes = minutes < 10 ? '0'+ String(minutes) : minutes;
      var strTime = hours + ':' + minutes + ' ' + period;
      return strTime;
    } 
    return "-";
  }

  function timeDifference(date1: any, date2: any): number | null {
    const startDate = new Date(date1);
    if (!date2) {
      return null;
    }
    const endDate = new Date(date2);

    const startDateOffset = startDate.getTimezoneOffset();
    const endDateOffset = endDate.getTimezoneOffset();
    startDate.setMinutes(startDate.getMinutes() + startDateOffset);
    endDate.setMinutes(endDate.getMinutes() + endDateOffset);

    startDate.setFullYear(2000, 0, 1);
    endDate.setFullYear(2000, 0, 1);
  
    const diff = endDate.getTime() - startDate.getTime();
    const totalMinutes = diff / (1000 * 60);
    const decimalMinutes = totalMinutes.toFixed(2);
  
    return parseFloat(decimalMinutes);
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
      Cell: ({ cell, row }: { cell: any; row: any }) => {
        const clockInDate = row.original.Login ? new Date(row.original.Login) : null;
        const date = formatTime(clockInDate);
        const textStyle = {
          color: date === "-" && row.original.Type === "Shop" ? "#ff0000" : "black",
        };
    
        return <p style={{ margin: 0 }}><span style={textStyle}>{cell.getValue()}</span></p>;
      },
    },
    {
      accessorKey: "Last_Name",
      header: "Last Name",
      enableEditing: false,
      filterVariant: "multi-select",
      Cell: ({ cell, row }: { cell: any; row: any }) => {
        const clockInDate = row.original.Login ? new Date(row.original.Login) : null;
        const date = formatTime(clockInDate);
        const textStyle = {
          color: date === "-" ? "#ff0000" : "black",
        };
    
        return <p style={{ margin: 0 }}><span style={textStyle}>{cell.getValue()}</span></p>;
      },
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
      Cell: ({ cell, row }: { cell: any; row: any }) => {
        const clockInDate = row.original.Login ? new Date(row.original.Login) : null;
        const startDateTime = row.original.Start_Time ? new Date(row.original.Start_Time) : null;
        const difference = timeDifference(startDateTime, clockInDate);
        const textStyle = {
          color: difference && difference > 3.0 ? '#ff0000' : 'inherit'
        };
        return <p style={{ margin: 0 }}><span style={textStyle}>{formatTime(clockInDate)}</span></p>;
      },
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
      accessorFn: (row: any) => {
        if (row.Start_Time) {
          const sDay = new Date(row.Start_Time);
          return sDay;
        }
      },
      enableEditing: false,
      id: "Start_Time",
      header: "Shift Start",
      enableColumnFilterModes: true,
      Cell: ({ cell }: { cell: any }) => formatTime(cell.getValue())
    },
    {
      accessorFn: (row: any) => {
        if (row.End_Time) {
          const sDay = new Date(row.End_Time);
          return sDay;
        }
      },
      enableEditing: false,
      id: "End_Time",
      header: "Shift End",
      enableColumnFilterModes: true,
      Cell: ({ cell }: { cell: any }) => formatTime(cell.getValue())
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
