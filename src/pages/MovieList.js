import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import * as movieAPI from '../services/movieAPI';
import Loading from '../components/Loading';
import Header from '../components/Header';

let scroll = 300;
let count = 1

class MovieList extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      loading: true,
    };
    this.reqMovieList = this.reqMovieList.bind(this);
  }

  componentDidMount() {
    this.reqMovieList();
    document.querySelector('.movie-list')
      .addEventListener('wheel', (e) => {
        if (e.deltaY > 0) e.target.scrollBy(scroll, 0);
        e.target.scrollBy(-scroll, 0);
      });
    document.querySelector('.scroll-left')
      .addEventListener('click', () => {
        if (count === 0) {
          scroll = -965;
          count = 4;
        }
        document.querySelector('.movie-list').scrollBy(-scroll, 0);
        console.log('dec', count, scroll);
        scroll = 300;
        if (count > 0) count -= 1;
      });
      document.querySelector('.scroll-right')
      .addEventListener('click', () => {
        if (count === 4) {
          scroll = -900
          count = 0;
        }
        count += 1;
        console.log(count, scroll);
        document.querySelector('.movie-list').scrollBy(scroll, 0);
        scroll = 300;
      });
  }

  async reqMovieList() {
    const apiMovieList = await movieAPI.getMovies();
    this.setState({
      movies: apiMovieList,
      loading: false,
    });
  }

  render() {
    const { movies, loading } = this.state;
    return (
      <div className="body-container">
          <Header />
        <div className="container-cards-and-arrows">
          <button
            type="button"
            onClick={ this.handleLeftClick }
            className="scroll-left"
          >
            <img src="static/static/images/216151_right_chevron_icon.png" alt="Scroll Left"/>
          </ button>            
          <div data-testid="movie-list" className="movie-list">
            { loading ? <Loading /> : movies
              .map((movie) => <MovieCard key={ movie.title } movie={ movie } />)}
          </div>
            <button
              type="button"
              onClick={ this.handleRightClick }
              className="scroll-right"
            >
              <img src="static/static/images/216151_right_chevron_icon.png" alt="Scroll Right"/>
            </button>
        </div>
          <Link to="/movies/new">ADICIONAR CARTÃO</Link>
      </div>
    );
  }
}

MovieList.propTypes = {
  movies: PropTypes.shape({
    title: PropTypes.string.isrequired,
  }),
}.isrequired;

export default MovieList;
