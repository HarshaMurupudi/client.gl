import { useState, useRef } from "react";
import { useForm } from "@mantine/form";
import { TextInput, Button, Box, Code, Grid, Flex } from "@mantine/core";
import { AutocompleteLoading } from "../../../components/Autocomplete";

export function PoForm({ handleSubmit, value, laoding, data, handleChange }) {
  const form = useForm({
    initialValues: {
      jobID: "",
    },
  });

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      console.log("do validate");
      handleSubmit(value);
    }
  };

  return (
    <Box mx="auto">
      <form
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          // handleSubmit(value);
        }}
      >
        <Grid gutter={5} align="end">
          <Grid.Col span={12}>
            {/* <TextInput
              label="Job"
              placeholder="Job"
              {...form.getInputProps("jobID")}
            /> */}

            <AutocompleteLoading
              value={value}
              data={data}
              handleChange={handleChange}
              onSubmit={handleSubmit}
              placeholder="Job"
              handleKeyDown={handleKeyDown}
            />
          </Grid.Col>
          {/* <Grid.Col span={4}>
            <Button type="submit">Submit</Button>
          </Grid.Col> */}
        </Grid>
      </form>
    </Box>
  );
}
