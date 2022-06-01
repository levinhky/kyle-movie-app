import tmdbApi from 'api/tmdbApi';
import SimilarItem from 'components/SimilarItem';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './movie.css'

function Movie(props) {
  const { category, id } = useParams();
  const [movie, setMovie] = useState({})
  const [detail, setDetail] = useState({})
  const [genres, setGenres] = useState([])
  const [similarMovies, setSimilarMovies] = useState([])
  useEffect(() => {
    const getMovieDetail = async () => {
      const response = await tmdbApi.getVideos(category, id)
      const response2 = await tmdbApi.similar(category, id)
      const response3 = await tmdbApi.detail(category, id, { params: {} })
      setMovie(response.results[response.results.length - 1])
      setSimilarMovies(response2.results)
      setDetail(response3)
      setGenres(response3.genres)
    }

    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    getMovieDetail()
  }, [category, id])

  return (
    <div className="section">
      <div className="container">
        <div className="row">
          <div className="col-8 col-md-12 col-sm-12">
            <div className="video-container">
              {/* <video controls>
                <source src="https://viettrung258.work/film" />
                Video is not supported!
              </video> */}
              <iframe title='video-detail' width="420" height="315"
                src={`https://www.youtube.com/embed/${movie.key}`}>
              </iframe>
            </div>

            <div className="movie-details">
              <h1>{detail.title || detail.original_name}</h1>
              <div className="movie-info">
                <div className="rating">
                  <span className="star">
                    <i className='bx bxs-star'></i>
                  </span>
                  <span className="score">{detail.vote_average}</span>
                </div>
                <div className="release">
                  <span className="calendar">
                    <i className='bx bxs-calendar'></i>
                  </span>
                  <span className="year">{detail.release_date}</span>
                </div>
              </div>
              <div className="movie-genre">
                {genres.map(genre => (
                  <a href='=' className="genre" key={genre.id}>{genre.name}</a>
                ))}
              </div>
              <div className="movie-description">
                <p>
                  {detail.overview}
                </p>
              </div>
            </div>

            <h2>Episodes</h2>
            <div className="episodes-list">
              <a href="2" className="episode active">1</a>
              <a href="3" className="episode">2</a>
              <a href="4" className="episode">3</a>
            </div>

          </div>
          <div className="col-4 col-md-12 col-sm-12">
            <div className="similar-container">
              <div className="header">
                <h2>Similar to this</h2>
              </div>
              <div className="similar-list">
                {similarMovies.map(similarMovie => (
                  <SimilarItem similar={similarMovie} key={similarMovie.id} />
                ))}
              </div>
            </div>
          </div>
          {/* Comment section */}
          <div className="col-8 col-md-12 col-sm-12">
            <div className="comments-section">
              <h2>Comments</h2>

              {/* <!-- <div className="comment-alert">
              <div className="avatar">
                <img src="https://filmhot.live/default-avatar.png" alt="">
              </div>
              <p>You need to <a>Sign in</a> to comment !</p>
            </div> --> */}

              <form className="comment-box">
                <div className="avatar">
                  <img src="https://filmhot.live/default-avatar.png" alt="" />
                </div>
                <input type="text" placeholder="Comment what yout think..." />
                <button>
                  <i className='bx bxs-send'></i>
                </button>
              </form>

              {/* <h4 style="text-align:center">No one has commented </h4>  */}

              <div className="comment-item">
                <img
                  src="https://images.weserv.nl/?url=https%3A%2F%2Flh3.googleusercontent.com%2Fa-%2FAOh14GhUigrReywgtRTgeW77KiP1up9ro5ruHpIla3bmnQ%3Ds96-c&w=50&h=50&fit=outside"
                  alt="" />
                <div className="info">
                  <div className="info-name">
                    <span className="name">Én Én</span>
                    <span className="time">Just now</span>
                  </div>
                  <div className="content">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores, esse tempore deleniti dolore
                    laborum obcaecati assumenda quae eaque iusto quod quo quasi sed. Dicta itaque numquam libero aperiam
                    tempora beatae.
                    Doloribus veritatis ipsam itaque nesciunt ea inventore provident exercitationem consectetur totam.
                    Natus, neque perspiciatis. Sequi asperiores perferendis possimus mollitia! Numquam doloremque ipsa ea
                    aliquid dolorum nulla excepturi quod totam illo.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Movie;