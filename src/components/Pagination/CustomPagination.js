import { Pagination } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import "./CustomPagination.css";

const darkTheme = createTheme({
  palette: {
    type: "dark",
  },
});

const CustomPagination = ({ setPage, numberOfPages = 10 }) => {
  const handlePageChange = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };

  return (
    <div className="pagination-container">
      <ThemeProvider theme={darkTheme}>
        <Pagination
          count={numberOfPages}
          color="primary"
          hideNextButton
          hidePrevButton
          onChange={(event) => handlePageChange(event.target.textContent)}
        />
      </ThemeProvider>
    </div>
  );
};

export default CustomPagination;
