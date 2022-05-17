import axios from "axios";
import React, { useEffect, useState } from "react";
import Genres from "../../Genres/Genres";
import CustomPagination from "../../Pagination/CustomPagination";
import SingleContent from "../../SingleContent/SingleContent";
import useGenres from "./../../../hooks/useGenre";
import "./Movies.css";
const API_KEY = process.env.REACT_APP_API_KEY;

const Movies = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numberOfPages, setnumberOfPages] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const genreForURL = useGenres(selectedGenres);

  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${page}&with_genres=${genreForURL}`
    );

    setContent(data.results);
    setnumberOfPages(data.total_pages);
  };

  useEffect(() => {
    fetchMovies();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, genreForURL]);

  return (
    <div>
      <span className="pagetitle">Movies</span>
      <Genres
        type="movie"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
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
      {numberOfPages > 1 && (
        <CustomPagination
          setPage={setPage}
          numberOfPages={numberOfPages}
        />
      )}
    </div>
  );
};

export default Movies;
