import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
