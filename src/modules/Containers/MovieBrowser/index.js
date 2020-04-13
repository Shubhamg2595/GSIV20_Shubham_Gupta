import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import { AppBar, TextField, RaisedButton } from 'material-ui';
import * as movieActions from './actions';
import * as movieHelpers from './helpers';
import MovieList from '../../Components/MovieList/index';
import * as scrollHelpers from '../../utils/helpers/scroll';
import MovieModal from '../MovieModal/index';
import SearchAppBar from '../SearchAppBar/index';
function MovieBrowser(props) {

    const { topMovies, getTopMovies, searchMovies, searchedMovies } = props;


    const [currentPage, setCurrentPage] = useState(1);

    const [searchResponse, setSearchResponse] = useState([]);

    useEffect(() => {
        window.onscroll = handleScroll;
        getTopMovies(currentPage);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])

    function handleScroll() {
        const { topMovies } = props;
        if (!topMovies.isLoading) {
            let percentageScrolled = scrollHelpers.getPercentageScrolledDown(window);
            if (percentageScrolled > .8) {
                const nextPage = currentPage + 1;
                getTopMovies(nextPage);
                setCurrentPage(nextPage);
            }
        }
    }


    function handleSearch(searchTerm) {
        if (searchTerm !== null) {
            setSearchResponse([]);
            searchMovies(searchTerm, currentPage);
        }
        else {
            setSearchResponse([]);
            getTopMovies(currentPage);
        }
    }
    const movies = movieHelpers.getMoviesList(topMovies.response);


    useEffect(() => {
        setSearchResponse(movieHelpers.getMoviesList(searchedMovies.response))
    }, [searchedMovies.response])


    return (
        <div>
            <SearchAppBar title='Movie Browser' handleSearch={handleSearch} getTopMovies={getTopMovies} />
            <Grid>
                <Row>
                    <p></p>
                </Row>
                <Row>
                    {searchResponse && searchResponse.length > 0 ?
                        <MovieList movies={searchResponse} isLoading={searchedMovies.isLoading} />
                        :
                        <MovieList movies={movies} isLoading={topMovies.isLoading} />

                    }

                </Row>
            </Grid>
            <MovieModal />
        </div>
    );
}

export default connect(
    // Map nodes in our state to a properties of our component
    (state) => ({
        topMovies: state.movieBrowser.topMovies,
        searchedMovies: state.movieBrowser.movieSearch,
    }),
    // Map action creators to properties of our component
    { ...movieActions }
)(MovieBrowser);
