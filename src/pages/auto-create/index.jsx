import React from "react";
import { Grid } from "@mantine/core";

import AutoCreateJobFolders from "../../features/auto-create";
import AutoCreatePartFolder from "../../features/auto-create-part-folder";
import AutoCreateArtFolder from "../../features/auto-create-art-part-folder";

function AutoCreateFolders() {
  return (
    <Grid>
      <Grid.Col span={12}>
        <AutoCreateArtFolder />
      </Grid.Col>
      <Grid.Col span={6}>
        <AutoCreateJobFolders />
      </Grid.Col>
      <Grid.Col span={6}>
        <AutoCreatePartFolder />
      </Grid.Col>
    </Grid>
  );
}

export default AutoCreateFolders;
