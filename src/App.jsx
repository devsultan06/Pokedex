/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
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
import Aos from "aos";
import "aos/dist/aos.css";

function App() {
  const options = [
    { value: "Lowest Number First", label: "Lowest Number First" },
    { value: "Highest Number First", label: "Highest Number First" },
    { value: "A-Z", label: "A-Z" },
    { value: "Z-A", label: "Z-A" },
  ];

  const [selectedValue, setSelectedValue] = useState("Lowest Number First");
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [searchType, setSearchType] = useState("name"); // Type of search: name, type, or id
  const [limit, setLimit] = useState(0); // Default limit
  const [inputLimit, setInputLimit] = useState(0); // Input field state
  const [pokemon, setPokemon] = useState([]);
  const [pokemonData, setPokemonData] = useState([]);
  const [filteredPokemonData, setFilteredPokemonData] = useState([]); // State for filtered Pokémon data
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Filter Pokémon data based on search query and search type
    const lowercasedQuery = query.toLowerCase();
    let newFilteredPokemonData = pokemonData;

    if (searchType === "name") {
      newFilteredPokemonData = pokemonData.filter((pokeData) =>
        pokeData.name.toLowerCase().includes(lowercasedQuery)
      );
    } 

    setFilteredPokemonData(newFilteredPokemonData);
  };

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
    handleSearchChange({ target: { value: searchQuery } }); // Reapply filter on search type change
  };

  const handleLimitChange = (event) => {
    setInputLimit(event.target.value);
  };

  const handleSetLimit = () => {
    setLimit(Number(inputLimit)); // Set the limit state to the input value
  };

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        } else {
          return response.json();
        }
      })
      .then((allPokemon) => {
        setPokemon(allPokemon.results);
        const pokemonDataPromises = allPokemon.results.map((pokemon) => {
          return fetch(pokemon.url).then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            } else {
              return response.json();
            }
          });
        });
        Promise.all(pokemonDataPromises).then((pokemonData) => {
          setPokemonData(pokemonData);
          // Update filteredPokemonData after fetching new data
          setFilteredPokemonData(pokemonData);
        });
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [limit]);

  // Sort filteredPokemonData based on selectedValue
  const sortedPokemonData = [...filteredPokemonData];
  if (selectedValue === "Highest Number First") {
    sortedPokemonData.sort((a, b) => b.id - a.id);
  } else if (selectedValue === "Lowest Number First") {
    sortedPokemonData.sort((a, b) => a.id - b.id);
  } else if (selectedValue === "A-Z") {
    sortedPokemonData.sort((a, b) => a.name.localeCompare(b.name));
  } else if (selectedValue === "Z-A") {
    sortedPokemonData.sort((a, b) => b.name.localeCompare(a.name));
  }

  const getTypeColor = (typeName) => {
    switch (typeName) {
      case "normal":
        return "#b6b6b6";
      case "fire":
        return "#ed6f70";
      case "water":
        return "#009acc";
      case "electric":
        return "#EFCE4A";
      case "grass":
        return "#20b911";
      case "ice":
        return "#45B5FA";
      case "fighting":
        return "#C22E28";
      case "poison":
        return "#9C27B0";
      case "ground":
        return "#C6C6B1";
      case "flying":
        return "#A98FF3";
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
      default:
        return null;
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
          <input
            type="text"
            placeholder="Pokémon name, number or type"
            value={searchQuery}
            onChange={handleSearchChange}
          />
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
            <IoFilter />
            Filters
          </button>
        </div>
      </div>

      <div
        className="limit-input"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "20px 0",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <label htmlFor="limit">Number of Pokémon to display:</label>
        <input
          type="number"
          id="limit"
          value={inputLimit}
          onChange={handleLimitChange}
          min="1"
        />
        <button onClick={handleSetLimit}>Set Limit</button>
      </div>

      <div>
        {limit <= 0 ? (
          <p
            style={{
              textAlign: "center",
              color: "#555",
              fontSize: "18px",
              margin: "20px 0",
              backgroundColor: "#f0f0f0",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            Please enter a valid number of Pokémon to display and click "Set
            Limit".
          </p>
        ) : sortedPokemonData.length > 0 ? (
          <div className="characters">
            {sortedPokemonData.map((pokeData, index) => (
              <div
                key={index}
                className="character"
                data-aos="zoom-in"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="2000"
                style={{
                  backgroundColor: getTypeColor(pokeData.types[0].type.name),
                }}
              >
                <a>
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
        ) : (
          <p
            style={{
              textAlign: "center",
              color: "#555",
              fontSize: "18px",
              margin: "20px 0",
              backgroundColor: "#f0f0f0",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            No Pokémon found. Please try a different search.
          </p>
        )}
      </div>
    </header>
  );
}

export default App;
