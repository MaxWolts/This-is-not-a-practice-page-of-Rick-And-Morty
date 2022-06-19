import {
  useState,
  useContext,
  useReducer,
  useMemo,
  useRef,
  useCallback
} from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Search } from "../components/Search";
import { useCharacters } from "../hooks/useCharacters";
import "../styles/Characters.css";

const API = "https://rickandmortyapi.com/api/character/";

const initialState = {
  favorites: [],
};
const reducerObject = (state, payload) => ({
  ADD_TO_FAVORITES: {
    favorites: [...state.favorites, payload],
  },
});
const reducer = (state, action) => {
  if (reducerObject(state)[action.type]) {
    return reducerObject(state, action.payload)[action.type];
  }
};

const Characters = () => {
  const { themeValue } = useContext(ThemeContext);
  const [favorites, dispach] = useReducer(reducer, initialState);
  const [search, setSearch] = useState("");
  const searchInput = useRef(null);

  const addFavorites = (favorite) => {
    dispach({ type: "ADD_TO_FAVORITES", payload: favorite });
  };

  const characters = useCharacters(API);

//   const handleSearch = () => {
//     setSearch(searchInput.current.value);
//   };

  const handleSearch = useCallback( ()=> {
      setSearch(searchInput.current.value);
  }, [])

  // const filteredUsers = characters.filter((user)=>{
  //     return user.name.toLowerCase().includes(search.toLowerCase());
  // });

  const filteredUsers = useMemo(
    () =>
      characters.filter((user) => {
        return user.name.toLowerCase().includes(search.toLowerCase());
      }),
    [characters, search]
  );

  return (
    
    <div>
      <Search
        search={search}
        searchInput={searchInput}
        handleSearch={handleSearch}
        themeValue={themeValue}
      ></Search>

      {favorites.favorites.length >0 && (<div
        className={
          themeValue ? "favorites favorites-light-border" : "favorites"
        }
      >
        <h2
          className={
            themeValue ? "favorites--title favorites-light" : "favorites--title"
          }
        >
          {" "}
          Favorites list:{" "}
        </h2>
        <ul
          className={
            themeValue ? "favorites--list favorites-light" : "favorites--list"
          }
        >
          {favorites.favorites.map((favorite) => {
            return <li>{favorite.name}</li>;
          })}
        </ul>
      </div>)}

      

      <div className="characters">
        {filteredUsers.map((character) => {
          return (
            <div
              className={
                themeValue ? "character character-darkTheme" : "character"
              }
              key={character.id}
            >
              <div className="image-container">
                <img src={character.image} alt="" />
                <button
                  className="add-button"
                  onClick={() => {
                    addFavorites(character);
                  }}
                >
                  Add to favorites
                </button>
              </div>
              <h2 className="character--name">{character.name}</h2>
              <div className="information">
                <p>
                  <strong className="information__strong">Species:</strong>{" "}
                  {character.species}
                </p>
                <p>
                  <strong className="information__strong">Status:</strong>{" "}
                  {character.status}
                </p>
                <p>
                  <strong className="information__strong">Origin:</strong>{" "}
                  {character.origin.name}
                </p>
                <p>
                  <strong className="information__strong">Location: </strong>
                  {character.location.name}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { Characters };
