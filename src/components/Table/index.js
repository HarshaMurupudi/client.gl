import React from "react";
import { Table } from "@mantine/core";
import { formatDate } from "../../utils";

function index({ columns, rows }) {
  const tableRows = (rows || []).map((row, index) => (
    <tr key={row[Object.keys(columns)[0]] + index}>
      {Object.keys(columns || {}).map((column, index) => {
        if (column === "Due_Date") {
          return (
            <td key={column + index}>{formatDate(new Date(row[column]))}</td>
          );
        } else {
          return <td key={column + index}>{row[column]}</td>;
        }
      })}
    </tr>
  ));

  return (
    <Table>
      <thead>
        <tr>
          {Object.entries(columns || {}).map(([key, value], index) => {
            return <th key={key + index}>{value}</th>;
          })}
        </tr>
      </thead>
      <tbody>{tableRows}</tbody>
    </Table>
  );
}

export default index;
