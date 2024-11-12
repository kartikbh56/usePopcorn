import { useReducer } from "react";
import Navbar from "./components/Navbar";
import Content from "./components/Content";
import SearchBar from "./components/SearchBar";
import Movies from "./components/Movies";
import WatchedMovies from "./components/WatchedMovies";
import {
  DispatchContext,
  IsOpenContext,
  MoviesContext,
  QueryContext,
  WatchedMoviesContext,
} from "./contexts";

const tempMovieData = [];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const initialState = {
  query: "",
  movies: tempMovieData,
  watchedMovies: tempWatchedData,
  isMoviesOpen: true,
  isWatchedMoviesOpen: true,
};

function reducer(state, action) {
  switch (action.type) {
    case "queryInput":
      return { ...state, query: action.query };
    case "setMovies":
      return { ...state, movies: action.movies };
    case "setWatched":
      return { ...state, watchedMovies: action.watched };
    case "setIsOpen":
      return {
        ...state,
        [`is${action.isOpen}Open`]: !state[`is${action.isOpen}Open`],
      };
    case "default":
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { movies, watchedMovies, query, isMoviesOpen, isWatchedMoviesOpen } =
    state;
  const moviesCount = movies.length;
  return (
    <>
      <DispatchContext.Provider value={dispatch}>
        <Navbar moviesCount={moviesCount}>
          <QueryContext.Provider value={query}>
            <SearchBar />
          </QueryContext.Provider>
        </Navbar>

        <Content>
          <IsOpenContext.Provider value={isMoviesOpen}>
            <MoviesContext.Provider value={movies}>
              <QueryContext.Provider value={query}>
                <Movies />
              </QueryContext.Provider>
            </MoviesContext.Provider>
          </IsOpenContext.Provider>

          <IsOpenContext.Provider value={isWatchedMoviesOpen}>
            <WatchedMoviesContext.Provider value={watchedMovies}>
              <WatchedMovies />
            </WatchedMoviesContext.Provider>
          </IsOpenContext.Provider>
        </Content>
      </DispatchContext.Provider>
    </>
  );
}
