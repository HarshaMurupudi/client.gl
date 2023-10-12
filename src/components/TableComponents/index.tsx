import { Box, Button, Text, Textarea, Checkbox, Group } from "@mantine/core";
import React, { useEffect, useState, useMemo, useRef } from "react";
import { delay } from "../../utils";

export const CheckboxFilter = ({ column, options }) => {
  const [value, setValue] = useState<string[]>([]);
  const [checkAll, setCheckAll] = useState(false);

  useEffect(() => {
    const prevValue = column.getFilterValue() || [];

    if (prevValue.length > 0) {
      setValue(prevValue);
    } else {
      column.setFilterValue([...options, "-"]);
      setValue([...options, "-"]);
      setCheckAll(true);
    }
  }, []);

  const onCheckboxChange = async (e) => {
    setValue(e);
    await delay(120);
    column.setFilterValue(e);
  };

  const onCheckAllboxChange = async (e) => {
    setCheckAll(e.target.checked);
    if (e.target.checked) {
      setValue([...options, "-"]);
      await delay(100);
      column.setFilterValue([...options, "-"]);
    } else {
      setValue([]);
      await delay(120);
      column.setFilterValue([]);
    }
  };

  return (
    <Group>
      <Checkbox
        size="xs"
        mt={8}
        checked={checkAll}
        label={"All"}
        onChange={onCheckAllboxChange}
      />
      <Checkbox.Group value={value} onChange={onCheckboxChange}>
        {[...options, "-"].map((option: any) => (
          <Checkbox
            size="xs"
            mt={8}
            key={option}
            value={option}
            label={option}
          />
        ))}
      </Checkbox.Group>
    </Group>
  );
};
