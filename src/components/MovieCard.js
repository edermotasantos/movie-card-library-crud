import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * Consultei o repositório do Guilherme Oliveira para resolver essa parte.
 * Link: https://github.com/tryber/sd-011-project-movie-card-library-crud/pull/177/commits/592f4b0403841461bf83e803703c78b805b1ceed
 */

class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;
    const { title, storyline, id, imagePath } = movie;
    return (
      <div data-testid="movie-card" className="movie-card">
        Movie Card
        <img alt="Movie Cover" className="movie-card-image" src={ `../${imagePath}` } />
        <div className="movie-card-body">
          <h3 className="movie-card-title">{ title }</h3>
          <p className="movie-card-storyline">{ storyline }</p>
          <Link to={ `/movies/${id}` }>VER DETALHES</Link>
        </div>
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
