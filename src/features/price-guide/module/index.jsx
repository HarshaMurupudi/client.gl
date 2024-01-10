import { useState } from "react";
import { useForm } from "@mantine/form";
import { TextInput, Button, Box, Code, Grid, Flex } from "@mantine/core";
import DatePicker from "react-datepicker";

import { AutocompleteLoading } from "../../../components/Autocomplete";

export function ContractForm({
  handleSubmit,
  value,
  data,
  handleChange,
  currentAutofillSelection,
}) {
  const [submittedValues, setSubmittedValues] = useState("");

  const form = useForm({
    initialValues: {
      Part_Number: "",
    },
  });

  const isDisabled = (field) => {
    if (currentAutofillSelection === "") {
      return false;
    } else {
      return !(field === currentAutofillSelection);
    }
  };

  // const onSubmit = (data) => {
  //   console.log(data);
  // };

  const handleKeyDown = (event) => {
    // event.preventDefault();

    if (event.key === "Enter") {
      handleSubmit({ value });
    }
  };

  return (
    <Box mx="auto">
      <form
        component="form"
        // onSubmit={(e) => {
        //   e.preventDefault();
        //   handleSubmit(value);
        // }}
      >
        <Grid gutter={5}>
            <Grid.Col span={10}>
            {/* <TextInput
              label="Part Number"
              placeholder="Part Number"
              {...form.getInputProps("Part_Number")}
            /> */}
            <AutocompleteLoading
              value={currentAutofillSelection === "Part_Number" ? value : ""}
              data={data}
              handleChange={(e) => handleChange(e, "Part_Number")}
              // label="Part Number"
              placeholder="Part Number"
              onSubmit={handleSubmit}
              handleKeyDown={handleKeyDown}
              // disable={isDisabled("Part_Number")}
            />
          </Grid.Col>
        </Grid>
        {/* <Flex justify="center" my={32}>
          <Button type="submit">Submit</Button>
        </Flex> */}
      </form>

      {submittedValues && <Code block>{submittedValues}</Code>}
    </Box>
  );
}
