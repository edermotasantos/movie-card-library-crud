import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import * as movieAPI from '../services/movieAPI';
import Loading from '../components/Loading';
import Header from '../components/Header';

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
      <>
        <Header />
        <div data-testid="movie-list" className="movie-list">
          { loading ? <Loading /> : movies
            .map((movie) => <MovieCard key={ movie.title } movie={ movie } />)}
        </div>
        <Link to="/movies/new">ADICIONAR CARTÃO</Link>
      </>
    );
  }
}

MovieList.propTypes = {
  movies: PropTypes.shape({
    title: PropTypes.string.isrequired,
  }),
}.isrequired;

export default MovieList;
