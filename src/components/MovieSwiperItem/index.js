import apiConfig from 'api/apiConfig';
import React from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const MovieSwiperItem = ({ category, item }) => {

  return (
    <>
      {item.backdrop_path !== null &&
        <Link to={`/detail/${category}/${item.id}`} state={item} className="item-grid" >
          <LazyLoadImage src={apiConfig.w500Image(item.backdrop_path)} alt={item.name || item.title} />
          <div className="movie-item-content">
            <div className="movie-item-title">
              {item.name || item.title}
            </div>
            <div className="movie-infos">
              <div className="movie-info">
                <i className="bx bxs-star"></i>
                <span>{item.vote_average}</span>
              </div>
              {/* <div className="movie-info">
                <i className="bx bxs-time"></i>
                <span>120 mins</span>
              </div> */}
              <div className="movie-info">
                <span>HD</span>
              </div>
              <div className="movie-info">
                <span>16+</span>
              </div>
            </div>
          </div>
        </Link>
      }
    </>
  );
};

export default MovieSwiperItem;