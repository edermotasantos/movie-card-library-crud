import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import * as movieAPI from '../services/movieAPI';
import Loading from '../components/Loading';
import Header from '../components/Header';

const scroll = 300;

class MovieList extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      loading: true,
    };
    this.reqMovieList = this.reqMovieList.bind(this);
    // this.handleLeftClick = this.handleLeftClick.bind(this);
    // this.handleRightClick = this.handleRightClick.bind(this);
  }

  componentDidMount() {
    this.reqMovieList();
    // this.handleLeftClick();
    // this.handleRightClick();
    document.querySelector('.movie-list')
      .addEventListener('wheel', (e) => {
        if (e.deltaY > 0) e.target.scrollBy(scroll, 0);
        e.target.scrollBy(-scroll, 0);
      });
      document.querySelector('.scroll-left')
      .addEventListener('click', () => {
        document.querySelector('.movie-list').scrollBy(-scroll, 0);
      });
    document.querySelector('.scroll-right')
      .addEventListener('click', () => {
        document.querySelector('.movie-list').scrollBy(scroll, 0);
      });
  }

  // async handleLeftClick(e) {
  //   await document.querySelector('.scroll-left')
  //     .addEventListener('click', (e) => {
  //       e.target.scrollBy(-scroll, 0);
  //     });
  // }

  // async handleRightClick(e) {
  //   await document.querySelector('.scroll-right')
  //     .addEventListener('click', (e) => {
  //       e.target.scrollBy(scroll, 0);
  //     });
  // }

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
      <div data-testid="movie-list" className="body-container">
        <div data-testid="movie-list" className="container">
          <Header />
          <div data-testid="movie-list" className="movie-list">
            { loading ? <Loading /> : movies
              .map((movie) => <MovieCard key={ movie.title } movie={ movie } />)}
          </div>
          <Link to="/movies/new">ADICIONAR CARTÃO</Link>
        </div>
        <div className="buttons">
          <button
            type="button"
            onClick={ this.handleLeftClick }
            className="scroll-left"
          >
            <img src="static/static/images/216151_right_chevron_icon.png" alt="Scroll Left"/>
          </ button>
          <button
            type="button"
            onClick={ this.handleRightClick }
            className="scroll-right"
          >
            <img src="static/static/images/216151_right_chevron_icon.png" alt="Scroll Right"/>
          </button>
        </div>
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
