import { useState, useEffect } from 'react';

const Autocomplete = ({ brandNameList = [] }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const fetchSuggestions = async (query) => {
    // Simulating API response
    
    const allItems = brandNameList.map((item) => item.name);
    if (query) {
      return allItems.filter(item =>
        item.toLowerCase().includes(query.toLowerCase())
      );
    }
    return [];
  };

  useEffect(() => {
    const getSuggestions = async () => {
      const result = await fetchSuggestions(query);
      setSuggestions(result);
    };

    if (query.length > 1) {
      getSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSelect = (item) => {
    setSelectedItem(item);
    setQuery(item);
    setSuggestions([]);
    console.log(item);
  };

  return (
    <div>
      <label htmlFor="example-text-input" className="form-label">Search Brand Name</label>
      <input
        type="text"
        value={query}
        className="form-control"
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search....."
      />
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSelect(item)}
              style={{ 
                cursor : 'pointer',
                padding: '5px',
                backgroundColor: '#fc7035',
                color : 'white',
                border: '1px solid',
                borderColor: 'wheat'
              }}

              
            >
              {item}
            </li>
          ))}
        </ul>
      )}
      {/* {selectedItem && <p>Selected Item: {selectedItem}</p>} */}
    </div>
  );
};

export default Autocomplete;
