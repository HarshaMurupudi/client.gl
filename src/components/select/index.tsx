import { forwardRef, useState } from 'react';
import { Group, Avatar, Text, Select } from '@mantine/core';



interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  image: string;
  label: string;
  description: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ image, label, description, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <div>
          <Text size="sm">{label}</Text>
          <Text size="xs" opacity={0.65}>
            {description}
          </Text>
        </div>
      </Group>
    </div>
  )
);

export const GLSelect = ({data, cell, table, onSelect}: {data: any, cell:any, table: any, onSelect:any}) => {
  const [value, setValue] = useState(() => cell.getValue());
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
  const { creatingRow, editingRow } = getState();
  const isCreating = creatingRow?.id === row.id;
  const isEditing = editingRow?.id === row.id;

  const saveInputValueToRowCache = (newValue: string | null) => {
    //@ts-ignore
    row._valuesCache[column.id] = newValue;
    if (isCreating) {
      setCreatingRow({ ...row });
    } else if (isEditing) {
      setEditingRow({ ...row });
    }
  };

  const handleBlur = (event: any) => {
    saveInputValueToRowCache(value);
    setEditingCell(null);
  };

  return (
    <Select
      label="Plan Code"
      placeholder="Pick one"
      itemComponent={SelectItem}
      onChange={(value) => {
        onSelect?.(value as any);
        setValue(value);
      }}
      onBlur={handleBlur}
      value={value}
      data={data}
      searchable
      maxDropdownHeight={400}
      nothingFound="Nobody here"
      withinPortal
      filter={(value, item) =>
        item.label?.toLowerCase().includes(value.toLowerCase().trim()) ||
        item.description.toLowerCase().includes(value.toLowerCase().trim())
      }
       styles={(theme) => ({
        item: {
          // applies styles to selected item
          '&[data-selected]': {
            '&, &:hover': {
              backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.teal[9] : theme.colors.teal[1],
              color: theme.colorScheme === 'dark' ? theme.white : theme.colors.teal[9],
            },
          },

          // applies styles to hovered item (with mouse or keyboard)
          '&[data-hovered]': {},
        },
      })}
    />
  );
}