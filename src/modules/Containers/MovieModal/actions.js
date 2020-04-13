
import { Constants } from './constants';

// Opens the <MovieModal /> with a movieId
export const openMovieModal = (movieId) => {
    return {
        type: Constants.OPEN_MOVIE_MODAL,
        movieId
    };
}

// Closes the <MovieModal />
export const closeMovieModal = () => {
    return {
        type: Constants.CLOSE_MOVIE_MODAL
    };
}
