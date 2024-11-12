/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import Loading from "./Loading";
import {
  DispatchContext,
  IsOpenContext,
  MoviesContext,
  QueryContext,
} from "../contexts";
const apiKey = import.meta.env.VITE_API_KEY;

export default function Movies() {
  const [loadingState, setLoadinState] = useState(false);
  const dispatch = useContext(DispatchContext);
  const isMoviesOpen = useContext(IsOpenContext);
  const query = useContext(QueryContext);

  useEffect(() => {
    if (query) {
      setLoadinState(true);
      const id = setTimeout(() => {
        fetch(
          `https://www.omdbapi.com/?i=tt3896198&apikey=${apiKey}&s=${query}`
        )
          .then((data) => data.json())
          .then((data) => {
            console.log("fetched");
            setLoadinState(false);
            dispatch({ type: "setMovies", movies: data?.Search || [data] });
          })
          .catch((err) => console.log(err));
      }, 1000);

      return () => {
        console.log("clean up performed");
        clearInterval(id);
      };
    } else {
      dispatch({ type: "setMovies", movies: [] });
      setLoadinState(false);
    }
  }, [query]);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => dispatch({ type: "setIsOpen", isOpen: "Movies" })}
      >
        {isMoviesOpen ? "–" : "+"}
      </button>
      {isMoviesOpen && <>{loadingState ? <Loading /> : <MovieList />}</>}
    </div>
  );
}

function MovieList() {
  const movies = useContext(MoviesContext);
  console.log(movies);
  const errorStatus = movies.find((m) => m.Error) || "";
  if (errorStatus) {
    return <div className="err">⛔️ Movie not found</div>;
  }
  if (movies.length === 0) {
    return <div className="err">🔍 Search for a movie</div>;
  }
  return (
    <ul className="list">
      {movies?.map((movie) => {
        return (
          <Movie
            key={movie.imdbID}
            title={movie.Title}
            poster={movie.Poster}
            year={movie.Year}
          />
        );
      })}
    </ul>
  );
}

function Movie({ title, poster, year }) {
  return (
    <li key={title}>
      <img src={poster} alt={`${title} poster`} />
      <h3>{title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{year}</span>
        </p>
      </div>
    </li>
  );
}
