import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import suggestionsList from '../data/suggestions';

const SearchBar = ({ initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const suggestionsRef = useRef(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    handleSearch(value);
  };

  const handleSearch = (query) => {
    const filteredSuggestions = suggestionsList.filter(suggestion =>
      suggestion.toLowerCase().includes(query.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
    setActiveSuggestion(0);
  };

  const handleSearchSubmit = () => {
    navigate(`/search?q=${query}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (suggestions.length > 0) {
        setQuery(suggestions[activeSuggestion]);
        setSuggestions([]);
      }
      handleSearchSubmit();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSuggestion(prev => {
        const newIndex = prev === 0 ? suggestions.length - 1 : prev - 1;
        setQuery(suggestions[newIndex]);
        return newIndex;
      });
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveSuggestion(prev => {
        const newIndex = prev === suggestions.length - 1 ? 0 : prev + 1;
        setQuery(suggestions[newIndex]);
        return newIndex;
      });
    }
  };

  const handleSuggestionClick = (index) => {
    setQuery(suggestions[index]);
    setSuggestions([]);
    handleSearchSubmit();
  };

  const handleBlur = () => {
    setSuggestions([]);
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest('.search-bar') && !event.target.closest('.suggestions')) {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    if (suggestionsRef.current && suggestionsRef.current.children[activeSuggestion]) {
      suggestionsRef.current.children[activeSuggestion].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [activeSuggestion]);

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="search-bar relative m-auto mt-1 mb-1 h-6 w-4/5 max-w-96 flex justify-center overflow-visible z-10 md:-mt-6 md:-top-9">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        onBlur={handleBlur}
        className="absolute to h-12 w-full p-4 border border-neutral-500 rounded-full shadow-2xl focus:outline-none caret-yellow-500"
        placeholder="Buscar..."
        style={{ backgroundColor: 'var(--clr-bg)' }}
      />
      <button onClick={handleSearchSubmit} className="absolute right-0 h-12 p-4 ml-2 flex justify-center items-center hover:bg-yellow-500 rounded-tr-3xl rounded-br-3xl">
        <MagnifyingGlassIcon className="w-7" />
      </button>
      {suggestions.length > 0 && (
        <ul ref={suggestionsRef} className="mt-14  h-44 w-full border border-neutral-500 rounded-3xl overflow-hidden z-10 suggestions" style={{ backgroundColor: "var(--clr-bg)" }}>
          {suggestions.map((suggestion, index) => (
            <li key={index} className={`p-2 pl-4 hover:bg-neutral-600 ${index === activeSuggestion ? 'bg-neutral-700' : ''}`} onMouseDown={() => handleSuggestionClick(index)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
