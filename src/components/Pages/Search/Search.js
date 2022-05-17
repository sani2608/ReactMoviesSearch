import { ThemeProvider } from "@emotion/react";
import SearchIcon from "@mui/icons-material/Search";
import { Button, createTheme, Tab, Tabs, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CustomPagination from "../../Pagination/CustomPagination";
import SingleContent from "../../SingleContent/SingleContent";
import "./Search.css";
const API_KEY = process.env.REACT_APP_API_KEY;

const Theme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#fff",
    },
  },
});

const Search = () => {
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState();
  const [numberOfPages, setNumberOfPages] = useState();
  // https://api.themoviedb.org/3/search/movie?api_key=&language=en-US&language=en-US&page=1&include_adult=false
  const fetchSearch = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/${
        type ? "tv" : "movie"
      }?api_key=${API_KEY}&page=${page}&language=en-US&query=${searchText}`
    );

    setContent(data.results);
  };
  //TODO: fix search
  useEffect(() => {
    fetchSearch();
    return () => {
      setSearchText("");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, page]);

  return (
    <div>
      <ThemeProvider theme={Theme}>
        <div className="search-container">
          <TextField
            style={{ flex: 1, color: "#fff" }}
            className="searchBox"
            label="search"
            variant="filled"
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            sx={{ input: { color: "#fff" } }}
          />
          <Button
            variant="contained"
            style={{ marginLeft: 10 }}
            onClick={fetchSearch}
          >
            <SearchIcon />
          </Button>
        </div>

        <Tabs
          value={type}
          indicatorColor="primary"
          textColor="primary"
          onChange={(event, newValue) => {
            console.log(newValue);
            setType(newValue);
            setPage(1);
          }}
          style={{ paddingBottom: 5 }}
        >
          <Tab style={{ width: "50%", color: "#fff" }} label="Search Movies" />
          <Tab
            style={{ width: "50%", color: "#fff" }}
            label="Search TV Series"
          />
        </Tabs>
      </ThemeProvider>
      <div className="movies">
        {content &&
          content.map((item) => (
            <SingleContent
              key={item.id}
              id={item.id}
              poster={item.poster_path}
              title={item.title || item.name}
              date={item.release_date || item.first_air_date}
              media_type="Movie"
              vote_average={item.vote_average}
            />
          ))}
      </div>
      {searchText &&
        !content &&
        (type ? (
          <h2 className="not-found">No TV Series found</h2>
        ) : (
          <h2 className="not-found">No Movies found</h2>
        ))}
      {numberOfPages > 1 && (
        <CustomPagination setPage={setPage} numberOfPages={numberOfPages} />
      )}
    </div>
  );
};

export default Search;
