const SearchInput = ({ search, setSearch, filteredGenre, setFilteredGenre, games }) => {
  const genreList = ['All', ...new Set(games.map((game) => game.genre).filter(Boolean))];

  return (
    <div className="catalog-controls">
      <label className="search-field">
        <span className="search-field__icon" aria-hidden="true">⌕</span>
        <input
          placeholder="Search games..."
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          aria-label="Search games"
        />
      </label>

      <label className="genre-filter">
        <span className="sr-only">Filter by genre</span>
        <select value={filteredGenre} onChange={(event) => setFilteredGenre(event.target.value)}>
          {genreList.map((genre) => (
            <option key={genre} value={genre}>
              {genre === 'All' ? 'All genres' : genre}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default SearchInput;
