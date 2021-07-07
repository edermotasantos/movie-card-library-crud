import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Consultei o repositório do Guilherme Oliveira para resolver essa parte.
 * Link: https://github.com/tryber/sd-011-project-movie-card-library-crud/pull/177/commits/592f4b0403841461bf83e803703c78b805b1ceed
 */

class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;
    const { title, storyline, id } = movie;
    return (
      <div data-testid="movie-card">
        Movie Card
        <h3>{ title }</h3>
        <p>{ storyline }</p>
        <Link to={ `/movies/${id}` }>VER DETALHES</Link>
      </div>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    storyline: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
}.isrequired;

export default MovieCard;
