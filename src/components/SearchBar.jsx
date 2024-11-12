import { useContext } from "react";
import { QueryContext, DispatchContext } from "../contexts";

export default function SearchBar() {
  const query = useContext(QueryContext);
  const dispatch = useContext(DispatchContext);
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => dispatch({ type: "queryInput", query: e.target.value })}
    />
  );
}
