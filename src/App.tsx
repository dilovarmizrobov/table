import React from 'react';
import Table from "./features/table/EnhancedTable";
import styled from "@emotion/styled";
import {Box, Container} from "@mui/material";

const StyledBox = styled(Box)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  background-color: #E7EBF0;
`

function App() {
  return (
    <StyledBox>
        <Container>
            <Table/>
        </Container>
    </StyledBox>
  );
}

export default App;
