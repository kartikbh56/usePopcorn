/* eslint-disable react/prop-types */
export default function Navbar({ children, moviesCount }) {
  return (
    <nav className="nav-bar">
      <div className="logo">
        <span role="img">🍿</span>
        <h1>usePopcorn</h1>
      </div>
      {children}
      <p className="num-results">
        Found <strong>{moviesCount}</strong> results
      </p>
    </nav>
  );
}
