import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";

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
    </header>
  );
}

export default App;
