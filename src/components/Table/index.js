import React from "react";
import { Table } from "@mantine/core";
import { formatDate } from "../../utils";

function index({ columns, rows }) {
  const tableRows = (rows || []).map((row) => (
    <tr key={row[Object.keys(columns)[0]]}>
      {Object.keys(columns || {}).map((column) => {
        if (column === "Due_Date") {
          return formatDate(new Date(row[column]));
        } else {
          return <td>{row[column]}</td>;
        }
      })}
    </tr>
  ));

  return (
    <Table>
      <thead>
        <tr>
          {Object.entries(columns || {}).map(([key, value]) => {
            return <th key={key}>{value}</th>;
          })}
        </tr>
      </thead>
      <tbody>{tableRows}</tbody>
    </Table>
  );
}

export default index;
