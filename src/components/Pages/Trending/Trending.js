import React, { useEffect } from 'react';
import './Trending.css';
import axios from 'axios';
import SingleContent from '../../SingleContent/SingleContent';

const API_KEY = process.env.REACT_APP_API_KEY;

const Trending = () => {
  const [content, setContent] = React.useState([]);

  const fetchTrending = async () => {
    console.log('fetching data');
    const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`);
    setContent(data.results);
    // console.log(data.results);
  };

  useEffect(() => {
    fetchTrending();
  }, []);


  return (
    <div>
      <span className="pagetitle">Trending Today</span>
        <div className="trending">
          {
            content && content.map((item) => (
              <SingleContent
                key={item.id}
                id={item.id}
                poster={item.poster_path}
                title={item.title || item.name}
                date={item.release_date || item.first_air_date}
                mdeia_type={item.media_type}
                vote_average={item.vote_average}
              />))
          }
        </div>
      
    </div>
  )
}

export default Trending