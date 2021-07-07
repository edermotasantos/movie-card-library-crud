import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as movieAPI from '../services/movieAPI';
import { Loading } from '../components';

/**
 * Consultei o repositório do Wendell Costa para resolver essa parte.
 * Link: https://github.com/tryber/sd-011-project-movie-card-library-crud/pull/172/files
 */

class MovieDetails extends Component {
  constructor() {
    super();
    this.state = {
      movie: [],
      loading: true,
    };
    this.reqMovieDetails = this.reqMovieDetails.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
  }

  componentDidMount() {
    this.reqMovieDetails();
  }

  async reqMovieDetails() {
    const { match } = this.props;
    const { id } = match.params;
    const apiMovieDetails = await movieAPI.getMovie(id);
    this.setState({
      movie: apiMovieDetails,
      loading: false,
    });
  }

  async deleteMovie() {
    const { match } = this.props;
    const { id } = match.params;
    await movieAPI.deleteMovie(id);
  }

  renderMovieDetails() {
    const { movie } = this.state;
    const { id, title, storyline, imagePath, genre, rating, subtitle } = movie;
    return (
      <div data-testid="movie-details">
        <img alt="Movie Cover" src={ `../${imagePath}` } />
        <p>{ `Title: ${title}` }</p>
        <p>{ `Subtitle: ${subtitle}` }</p>
        <p>{ `Storyline: ${storyline}` }</p>
        <p>{ `Genre: ${genre}` }</p>
        <p>{ `Rating: ${rating}` }</p>
        <Link to={ `/movies/${id}/edit` }>EDITAR</Link>
        <Link to="/">VOLTAR</Link>
        <Link to="/" onClick={ this.deleteMovie }>DELETAR</Link>
      </div>
    );
  }

  render() {
    const { loading } = this.state;
    return loading ? <Loading /> : <div>{ this.renderMovieDetails() }</div>;
  }
}

MovieDetails.propTypes = {
  match: PropTypes.objectOf({
    params: PropTypes.objectOf({
      id: PropTypes.number.isRequired,
    }),
  }).isRequired,
};

export default MovieDetails;
