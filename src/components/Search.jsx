import '../styles/Search.css';

const Search = ({ search, searchInput, handleSearch, themeValue}) => {
  return (
    <div className="Search">
      <p className={themeValue? 'text-color-white': ''}>Search:</p>
      <input
        type="text"
        value={search}
        ref={searchInput}
        onChange={handleSearch}
        className='Search__input'
      />
    </div>
  );
};

export { Search };
