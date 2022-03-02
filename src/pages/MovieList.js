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
    // this.handleLeftClick = this.handleLeftClick.bind(this);
    // this.handleRightClick = this.handleRightClick.bind(this);
    // this.carousel = this.carousel.bind(this);
    // this.scrollList = this.scrollList.bind(this);
  }
  
  componentDidMount() {
    this.reqMovieList();
    // this.handleLeftClick();
    // this.handleRightClick();
    // this.scrollList();
    // this.carousel;
    document.querySelector('.movie-list')
      .addEventListener("wheel", e => {
        if(e.deltaY > 0) {
          e.target.scrollBy(300, 0)
        } else {
          e.target.scrollBy(-300, 0)
        }
      })
  }
  
  async reqMovieList() {
    const apiMovieList = await movieAPI.getMovies();
    this.setState({
      movies: apiMovieList,
      loading: false,
    });
  }

  // async scrollList() {
  //   await document.querySelector('#movie-list')
  //   .addEventListener("wheel", e => {
  //     if(e.deltaY > 0) {
  //       e.target.scrollBy(300, 0)
  //     } else {
  //       e.target.scrollBy(-300, 0)
  //     }
  //   })
  // }

  // carousel = useRef(null);
    
  // async handleLeftClick (e) {
  //   // await e.preventDefault(); // previne comportamento padrão
  //   // this.carousel.current.scrollLeft -= this.carousel.current.offsetWidth;
  //   offsetWidth -= document.querySelector('#foo').offsetWidth;
  // }

  // async handleRightClick (e) {
  //   // await e.preventDefault();
  //   // this.carousel.current.scrollLeft += this.carousel.current.offsetWidth;
  //   offsetWidth += document.querySelector('#foo').offsetWidth;
  // }

  render() {
    const { movies, loading } = this.state;
    // const { handleLeftClick, handleRightClick } = this;
    return (
      <>
        <Header />
        <div className="container">
          <div data-testid="movie-list" className="movie-list">
            { loading ? <Loading /> : movies
              .map((movie) => <MovieCard key={ movie.title } movie={ movie } />)}
          </div>
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
