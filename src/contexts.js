import { createContext } from "react";

const QueryContext = createContext();
const MoviesContext = createContext();
const WatchedMoviesContext = createContext();
const IsOpenContext = createContext();
const DispatchContext = createContext();

export {
  QueryContext,
  MoviesContext,
  WatchedMoviesContext,
  IsOpenContext,
  DispatchContext,
};
