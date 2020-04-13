import  {Constants}  from './constants';
import { createReducer } from '../../utils/helpers/redux';

// Placeholder reducer for our movie modal
const movieModalReducer = createReducer({ isOpen: false, movieId: undefined }, {
  [Constants.OPEN_MOVIE_MODAL]: (state, action) => ({
    isOpen: true,
    movieId: action.movieId
  }),
  [Constants.CLOSE_MOVIE_MODAL]: (state, action) => ({
    // Persist the movieId (and any other state tree objects)
    ...state,
    isOpen: false
  })
});

export default movieModalReducer;
