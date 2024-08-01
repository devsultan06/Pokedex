/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import { MdGrass } from "react-icons/md";
import { FaFire } from "react-icons/fa";
import { GiPoison } from "react-icons/gi";
import { IoIosWater } from "react-icons/io";
import { GiFlyingDagger } from "react-icons/gi";
import { FaBug } from "react-icons/fa";
import { RiEmotionNormalLine } from "react-icons/ri";
import { FaCampground } from "react-icons/fa";
import { MdElectricMeter } from "react-icons/md";

function App() {
  const options = [
    { value: "Lowest Number First", label: "Lowest Number First" },
    { value: "Highest Number First", label: "Highest Number First" },
    { value: "a-z", label: "A-Z" },
  ];

  const [selectedValue, setSelectedValue] = useState("Lowest Number First");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const [pokemon, setPokemon] = useState([]);
  const [pokemonData, setPokemonData] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    try {
      fetch("https://pokeapi.co/api/v2/pokemon?limit=30")
        .then((response) => response.json())
        .then((allPokemon) => {
          console.log(allPokemon.results);
          setPokemon(allPokemon.results);
          const pokemonDataPromises = allPokemon.results.map((pokemon) => {
            return fetch(pokemon.url).then((response) => response.json());
          });
          Promise.all(pokemonDataPromises).then((pokemonData) => {
            console.log(pokemonData);

            setPokemonData(pokemonData);
          });
        });
    } catch (error) {
      setError(error.message);
    }
  }, []);

  const getTypeColor = (typeName) => {
    switch (typeName) {
      case "normal":
        return "#b6b6b6";
      case "normal1":
        return "#c7c9c9";
      case "fire":
        return "#ed6f70";
      case "fire1":
        return "#ef6767";
      case "water":
        return "#009acc";
      case "water1":
        return "#89efff";
      case "electric":
        return "#EFCE4A";
         case "electric1":
        return "#FCD847";
      case "grass":
        return "#20b911";
      case "grass1":
        return "#74d96c";
      case "ice":
        return "#45B5FA";
      case "fighting":
        return "#C22E28";
      case "poison":
        return "#9C27B0";
      case "poison1":
        return "#c9abe7";
      case "ground":
        return "#C6C6B1";
      case "ground1":
        return "#989891";
      case "flying":
        return "#A98FF3";
      case "flying1":
        return "#40a7e9";
      case "psychic":
        return "#FFC5C5";
      case "bug":
        return "#8DD743";
      case "rock":
        return "#B6B6B6";
      case "ghost":
        return "#735797";
      case "steel":
        return "#B1B1B1";
      case "dragon":
        return "#6F35FC";
      case "dark":
        return "#6B6B6B";
      case "fairy":
        return "#E6DAC3";
      default:
        return "#FFFFFF";
    }
  };

  const getTypeImage = (typeName) => {
    switch (typeName) {
      case "grass":
        return <MdGrass className="icon" />;
      case "fire":
        return <FaFire />;
      case "poison":
        return <GiPoison />;
      case "water":
        return <IoIosWater />;
      case "flying":
        return <GiFlyingDagger />;
      case "bug":
        return <FaBug />;
      case "normal":
        return <RiEmotionNormalLine />;
      case "ground":
        return <FaCampground />;
      case "electric":
        return <MdElectricMeter />;
    }
  };

  return (
    <header>
      <nav>
        <h1 className="title">Pokédex</h1>
      </nav>

      <div className="search-bar">
        <div className="search-input">
          <FaSearch className="icon" />
          <input type="text" placeholder="Pokémon name, number or type" />
        </div>

        <div className="search-button">
          <button className="search">Search</button>
        </div>
      </div>

      <div className="filter-bar">
        <div className="filter1">
          <select value={selectedValue} onChange={handleChange}>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="filter2">
          <button>
            {" "}
            <IoFilter />
            Filters
          </button>
        </div>
      </div>

      <div>
        {pokemonData.length > 0 && (
          <div className="characters">
            {pokemonData.map((pokeData, index) => (
              <div
                key={index}
                className="character"
                style={{
                  backgroundColor: getTypeColor(pokeData.types[0].type.name),
                }}
              >
                <a>
                  {" "}
                  <h2 className="name">{pokeData.name}</h2>
                </a>

                <p className="number">#{`000${pokeData.id}`.slice(-3)}</p>

                <p>
                  {pokeData.types.length > 1 ? (
                    <div className="button">
                      <button
                        className="button1"
                        style={{
                          backgroundColor: getTypeColor(
                            pokeData.types[0].type.name + "1"
                          ),
                        }}
                      >
                        {getTypeImage(pokeData.types[0].type.name)}
                        <span>{pokeData.types[0].type.name}</span>
                      </button>
                      <br />
                      <button
                        className="button2"
                        style={{
                          backgroundColor: getTypeColor(
                            pokeData.types[1].type.name + "1"
                          ),
                        }}
                      >
                        {getTypeImage(pokeData.types[1].type.name)}
                        <span>{pokeData.types[1].type.name}</span>
                      </button>
                    </div>
                  ) : (
                    <div className="button">
                      <button
                        className="button1"
                        style={{
                          backgroundColor: getTypeColor(
                            pokeData.types[0].type.name + "1"
                          ),
                        }}
                      >
                        {getTypeImage(pokeData.types[0].type.name)}
                        <span>{pokeData.types[0].type.name}</span>
                      </button>
                    </div>
                  )}
                </p>

                <img
                  src={pokeData.sprites.other.dream_world.front_default}
                  alt={pokeData.name}
                  className="pokemon-img"
                />
              </div>
            ))}
          </div>
        )}
        {error && <p>Error: {error}</p>}
      </div>
    </header>
  );
}

export default App;
