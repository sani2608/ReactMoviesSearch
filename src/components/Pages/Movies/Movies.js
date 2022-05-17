import axios from "axios";
import React, { useEffect, useState } from "react";
import CustomPagination from "../../Pagination/CustomPagination";
import SingleContent from "../../SingleContent/SingleContent";
import "./Movies.css";
const API_KEY = process.env.REACT_APP_API_KEY;

const Movies = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numberOfPages, setnumberOfPages] = useState(1);

  const fetchMovies = async () => {
    // const {data} = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${page}&with_genres=${genreForURL}`);
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${page}`
    );
    setContent(data.results);
    setnumberOfPages(data.total_pages);
  };

  useEffect(() => {
    fetchMovies();
  }, [page]);

  return (
    <div>
      <span className="pagetitle">Movies</span>
      <div className="trending">
        {content &&
          content.map((item) => (
            <SingleContent
              key={item.id}
              id={item.id}
              poster={item.poster_path}
              title={item.title || item.name}
              date={item.release_date || item.first_air_date}
              mdeia_type={item.media_type}
              vote_average={item.vote_average}
            />
          ))}
      </div>
      {numberOfPages > 1 && (
        <CustomPagination setPage={setPage} numberOfPages={numberOfPages} />
      )}
    </div>
  );
};

export default Movies;
