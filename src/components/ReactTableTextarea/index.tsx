import { useState } from "react";
import { Textarea } from "@mantine/core";

export const GLTextarea = ({
  //   data,
  cell,
  table,
  onTextChange,
}: {
  //   data: any;
  cell: any;
  table: any;
  onTextChange: any;
  //   placeholder: any;
  //   label:
}) => {
  const {
    getState,
    options: {
      createDisplayMode,
      editDisplayMode,
      mantineEditTextInputProps,
      mantineEditSelectProps,
    },
    refs: { editInputRefs },
    setEditingCell,
    setEditingRow,
    setCreatingRow,
  } = table;
  const { column, row } = cell;
  const { columnDef } = column;
  const { creatingRow, editingRow } = getState();

  const isCreating = creatingRow?.id === row.id;
  const isEditing = editingRow?.id === row.id;

  const [value, setValue] = useState(cell.getValue());

  const mTableBodyCellEditTextInputProps =
    mantineEditTextInputProps instanceof Function
      ? mantineEditTextInputProps({ cell, column, row, table })
      : mantineEditTextInputProps;

  const mcTableBodyCellEditTextInputProps =
    columnDef.mantineEditTextInputProps instanceof Function
      ? columnDef.mantineEditTextInputProps({
          cell,
          column,
          row,
          table,
        })
      : columnDef.mantineEditTextInputProps;

  const textInputProps = {
    ...mTableBodyCellEditTextInputProps,
    ...mcTableBodyCellEditTextInputProps,
  };

  const saveInputValueToRowCache = (newValue: string | null) => {
    //@ts-ignore
    row._valuesCache[column.id] = newValue;
    if (isCreating) {
      setCreatingRow({ ...row });
    } else if (isEditing) {
      setEditingRow({ ...row });
    }
  };

  const handleBlur = (event) => {
    saveInputValueToRowCache(event.target.value);
    setEditingCell(null);
  };

  // const handleEnterKeyDown = (event) => {
  //   // textInputProps.onKeyDown?.(event);
  //   if (event.key === "Enter") {
  //     editInputRefs.current[cell.id]?.blur();
  //   }
  // };

  return (
    // <Textarea
    //   value={value}
    //   minRows={1}
    //   draggable={true}
    //   onBlur={(event) => {
    //     onTextChange?.(event);
    //     handleBlur(event);
    //   }}
    //   // onKeyDown={handleEnterKeyDown}
    //   onChange={(event) => {
    //     setValue(event.target.value);
    //   }}
    //   ref={(node) => {
    //     if (node) {
    //       editInputRefs.current[cell.id] = node;
    //       if (textInputProps.ref) {
    //         textInputProps.ref.current = node;
    //       }
    //     }
    //   }}
    //   styles={(theme) => ({
    //     root: {
    //       width: "-webkit-fill-available",
    //     },
    //     wrapper: {
    //       width: "-webkit-fill-available",
    //     },
    //   })}
    // />
    <textarea
      style={{
        lineHeight: 1,
        width: "100%",
        fontSize: '.75rem',
        resize: 'vertical',
        height: '1.2rem'
      }}
      draggable="true"
      value={value}
      onBlur={(event) => {
        onTextChange?.(event);
        handleBlur(event);
      }}
      // onKeyDown={handleEnterKeyDown}
      onChange={(event) => {
        setValue(event.target.value);
      }}
      ref={(node) => {
        if (node) {
          editInputRefs.current[cell.id] = node;
          if (textInputProps.ref) {
            textInputProps.ref.current = node;
          }
        }
      }}
    ></textarea>
  );
};
