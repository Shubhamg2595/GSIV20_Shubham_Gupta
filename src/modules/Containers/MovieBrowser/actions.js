import { createAsyncActionCreator } from '../../utils/helpers/redux';
import * as movieService from './services';

import { Constants } from './constants';

export const getTopMovies = (page) => createAsyncActionCreator(
    // actionType
    Constants.GET_TOP_MOVIES,
    // requestFn
    movieService.getTopMovies,
    // requestParams
    { page }
);

export const searchMovies = (query, page) => createAsyncActionCreator(
    Constants.SEARCH_MOVIES,
    movieService.searchMovies,
    { query, page }
);

export const getMovieDetails = (movieId) => createAsyncActionCreator(
    Constants.GET_MOVIE_DETAILS,
    movieService.getMovieDetails,
    { movieId }
);
