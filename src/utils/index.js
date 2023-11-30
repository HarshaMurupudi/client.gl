import { format, addMinutes, subBusinessDays } from "date-fns";
import { Box, Button, Text, Textarea } from "@mantine/core";

export function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export const getDateColor = (nDate) => {
  let color = "black";

  if (!nDate) return;

  if (nDate.toLocaleDateString() === new Date().toLocaleDateString()) {
    color = "yellow";
  } else if (nDate.getTime() < new Date().getTime()) {
    color = "red";
  } else {
    color = "black";
  }

  return color;
};

function isValidDate(d) {
  // @ts-ignore
  return d instanceof Date && !isNaN(d);
}

export function isDate(date) {
  return (
    isNaN(date) && new Date(date) !== "Invalid Date" && !isNaN(new Date(date))
  );
}

export function formatDate(date) {
  return date
    ? isValidDate(date)
      ? format(addMinutes(date, date.getTimezoneOffset()), "MM/dd/yyyy")
      : "-"
    : "-";
}

export function subBusDays(date, days) {
  return subBusinessDays(date, days);
}

export function formatDateWithoutTZ(date) {
  return date ? (isValidDate(date) ? format(date, "MM/dd/yyyy") : "-") : "-";
}

export const getShipByDateColumn = (
  promiseDateDatatype,
  title = "Ship By Date"
) => {
  return {
    id: "shipBayDateDate",
    enableEditing: false,
    accessorFn: (row) => {
      let offsetTime = null;
      if (promiseDateDatatype === "model") {
        offsetTime = row.Deliveries
          ? new Date(row.Deliveries[0]?.Promised_Date)
          : null;
      } else {
        offsetTime = row.Promised_Date ? new Date(row.Promised_Date) : null;
      }

      const dayOfWeekTZOffset = offsetTime
        ? addMinutes(offsetTime, offsetTime.getTimezoneOffset())
        : null;
      const currentDate = dayOfWeekTZOffset;
      const nDate = currentDate ? new Date(currentDate) : null;
      const sDay = nDate ? subBusDays(nDate, row.Lead_Days) : null;

      return sDay;
    },
    header: title,
    filterVariant: "date",
    sortingFn: "datetime",
    sortUndefined: false,
    enableColumnFilterModes: false,
    Cell: ({ cell }) => {
      const dayOfWeekTZOffset =
        cell.getValue() && isValidDate(cell.getValue())
          ? addMinutes(cell.getValue(), cell.getValue().getTimezoneOffset())
          : null;
      const currentDate = dayOfWeekTZOffset;
      const nDate = currentDate ? new Date(currentDate) : null;

      return <Text c={getDateColor(nDate)}>{formatDate(cell.getValue())}</Text>;
    },
  };
};

export const getEarlyShipDateColumn = (
  promiseDateDatatype,
  title = "Early Ship"
) => {
  return {
    id: "earlyShipDate",
    enableEditing: false,
    accessorFn: (row) => {
      let offsetTime = null;
      if (promiseDateDatatype === "model") {
        offsetTime = row.Deliveries
          ? new Date(row.Deliveries[0]?.Promised_Date)
          : null;
      } else {
        offsetTime = row.Promised_Date ? new Date(row.Promised_Date) : null;
      }

      const dayOfWeekTZOffset = offsetTime
        ? addMinutes(offsetTime, offsetTime.getTimezoneOffset())
        : null;
      const subDays = row.Lead_Days + (row.Numeric2 || 0);
      const currentDate = dayOfWeekTZOffset;
      const nDate = currentDate ? new Date(currentDate) : null;
      const sDay = nDate ? subBusDays(nDate, subDays) : null;

      return sDay;
    },
    header: title,
    filterVariant: "date",
    sortingFn: "datetime",
    sortUndefined: false,
    enableColumnFilterModes: false,
    Cell: ({ cell }) => {
      const dayOfWeekTZOffset =
        cell.getValue() && isValidDate(cell.getValue())
          ? addMinutes(cell.getValue(), cell.getValue().getTimezoneOffset())
          : null;
      const currentDate = dayOfWeekTZOffset;
      const nDate = currentDate ? new Date(currentDate) : null;

      return <Text c={getDateColor(nDate)}>{formatDate(cell.getValue())}</Text>;
    },
  };
};
