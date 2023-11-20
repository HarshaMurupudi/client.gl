import React, { useState } from "react";
import { Container } from "@mantine/core";
import PowerBi from "../../features/power-bi";

function Dashboard() {
  return (
    <Container fluid>
      <PowerBi />
    </Container>
  );
}

export default Dashboard;
