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
      Job: "",
      Part_Number: "",
      Customer_PO: "",
      Customer: "",
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
          {/* <Grid.Col span={2}>
            <DatePicker
              selectsRange={true}
              startDate={currentAutofillSelection === "Promised_Date" ? value.startDate : ""}
              endDate={currentAutofillSelection === "Promised_Date" ? value.endDate : ""}
              onChange={(update) => {
                handleChange(update, "Promised_Date")
              }}
              isClearable={true}
            />
          </Grid.Col> */}
          <Grid.Col span={3}>
            <AutocompleteLoading
              value={currentAutofillSelection === "Job" ? value : ""}
              data={data}
              handleChange={(e) => handleChange(e, "Job")}
              // label="Job"
              placeholder="Job"
              onSubmit={handleSubmit}
              handleKeyDown={handleKeyDown}
              // disable={isDisabled("Job")}
            />
          </Grid.Col>
          <Grid.Col span={3}>
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
          <Grid.Col span={3}>
            {/* <TextInput
              type="text"
              label="PO Number"
              placeholder="PO"
              {...form.getInputProps("Customer_PO")}
            /> */}

            <AutocompleteLoading
              value={currentAutofillSelection === "Customer_PO" ? value : ""}
              data={data}
              handleChange={(e) => handleChange(e, "Customer_PO")}
              // label="PO Number"
              placeholder="PO Number"
              onSubmit={handleSubmit}
              handleKeyDown={handleKeyDown}
              // disable={isDisabled("Customer_PO")}
            />
          </Grid.Col>
          <Grid.Col span={3}>
            <AutocompleteLoading
              value={currentAutofillSelection === "Customer" ? value : ""}
              data={data}
              handleChange={(e) => handleChange(e, "Customer")}
              // label="Customer"
              // disable={true}
              // disabled={isDisabled("Customer")}
              placeholder="Customer"
              onSubmit={handleSubmit}
              handleKeyDown={handleKeyDown}
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
