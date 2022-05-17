import { Chip } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import "./Genres.css";
const API_KEY = process.env.REACT_APP_API_KEY;

const Genres = ({
  type,
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  setPage,
  setGenreForUrl,
}) => {
  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${API_KEY}&language=en-US`
    );
    setGenres(data.genres);
  };

  useEffect(() => {
    fetchGenres();
    return () => setGenres([]); //unmount Genres component.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onGenreAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((item) => item.name !== genre.name));
    setPage(1);
  };

  const onGenreDelete = (genre) => {
    setSelectedGenres(
      selectedGenres.filter((item) => item.name !== genre.name)
    );

    setGenres([genre, ...genres]);
  };

  const chipStyle = {
    margin: "4px",
    cursor: "pointer",
    backgroundColor: "#f5f5f5",
  };

  return (
    <div className="genre-container">
      {selectedGenres &&
        selectedGenres.map((selectedGenre) => (
          <Chip
            key={selectedGenre.id + selectedGenre.name}
            label={selectedGenre.name}
            onDelete={() => onGenreDelete(selectedGenre)}
            style={chipStyle}
            variant="outlined"
            color="primary"
          />
        ))}
      {genres &&
        genres.map((genre) => (
          <Chip
            key={genre.id}
            label={genre.name}
            onClick={() => onGenreAdd(genre)}
            style={chipStyle}
            size="small"
          />
        ))}
    </div>
  );
};

export default Genres;
