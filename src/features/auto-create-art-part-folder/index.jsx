import React, { useState, useRef } from "react";
import { TextInput, Button, Box, Code, Grid, Flex } from "@mantine/core";
import { connect } from "react-redux";

import { AutocompleteLoading } from "../../components/Autocomplete";
import { searchJobs } from "../tracking/store/actions";
import { createPartFolders } from "./store/actions";

function AutoCreateArtFolder({ searchJobs, createPartFolders }) {
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  const timeoutRef = useRef(-1);

  const handleChange = async (val, key) => {
    if (key) {
      window.clearTimeout(timeoutRef.current);
      setValue(val);
      setData([]);
      let jobs = [];

      jobs = await searchJobs("Part_Number", val);
      console.log(jobs);

      setData(jobs);
    }
  };

  const handleKeyDown = (event) => {
    // event.preventDefault();

    if (event.key === "Enter") {
      handleSubmit({ value });
    }
  };

  const handleSubmit = async () => {
    console.log(value);
    await createPartFolders(value);
    // await fetchTracking({ [currentAutofillSelection]: data.value });
    // setValue("");
    // setData([]);
  };

  return (
    <Box mx="auto">
      {/* <form component="form"> */}

      <Grid.Col span={4} display={"flex"}>
        {/* <TextInput
              label="Part Number"
              placeholder="Part Number"
              {...form.getInputProps("Part_Number")}
            /> */}
        <AutocompleteLoading
          value={value}
          data={data}
          handleChange={(e) => handleChange(e, "Part_Number")}
          // label="Part Number"
          placeholder="Part Number"
          // onSubmit={handleSubmit}
          handleKeyDown={handleKeyDown}
          // disable={isDisabled("Part_Number")}
        />
        <Button variant="filled" onClick={() => handleSubmit()}>
          Create
        </Button>
      </Grid.Col>
      {/* </form> */}
    </Box>
  );
}

export default connect(null, { searchJobs, createPartFolders })(
  AutoCreateArtFolder
);
