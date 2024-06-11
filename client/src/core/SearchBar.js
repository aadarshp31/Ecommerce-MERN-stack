import React, { useCallback, useEffect, useState } from 'react'
import _ from 'lodash'
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';

const SearchBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  
  const debounce = _.debounce(async (text) => {
    if (text.length < 3) return;
    const query = queryString.stringify({name: text, limit: 7});
    fetch(`${process.env.REACT_APP_BACKEND}/products/search?${query}`).then(res => res.json()).then((results) => {
      setSearchResults(results.products);
    })
  }, 400, { leading: true });
  
  
  useEffect(() => {
    const query = queryString.parse(location.search);
    setSearchText(query.name ? query.name :  "");
  }, [])
  
  const debouncedSearch = useCallback(debounce, []);
  
  async function getSearchResult(text) {
    try {
      return await debouncedSearch(text);
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  
  async function handleChange(e) {
    const text = e.target.value.toLowerCase();
    setSearchText(text);
    getSearchResult(text.trim());
  }
  
  function handleSubmit(e){
    if(e.code === "Enter" || e.key === "Enter"){
      
      if(searchText.length === 0){
        return;
      }

      setSearchResults([]);
      const query = queryString.stringify({...queryString.parse(location.search), name: searchText});
      navigate(`/products/search?${query}`);
    }
  }

  function handleSelection(itemTitle){
      if(itemTitle) {
        setSearchText(itemTitle);
      }

      setSearchResults([]);
      const query = queryString.stringify({...queryString.parse(location.search), name: itemTitle});
      navigate(`/products/search?${query}`);
  }

  return (
    <div id='search-bar' className='w-50 position-relative'>
      <input className="p-2 border border-1 rounded-pill w-100" type="search" name="search" placeholder="Search products here..." value={searchText} onChange={handleChange} onKeyDown={handleSubmit}></input>
      <span id='search-results' className="card position-absolute w-100" style={{visibility: searchText.length > 0 && searchResults.length > 0 ? 'visible' : 'hidden'}}>
        <ul className="list-group list-group-flush">
          {searchText.length > 0 && searchResults.length > 0 && searchResults.map((item, index) => <li key={index} className="list-group-item" style={{cursor: "pointer"}} onClick={(e) => handleSelection(item.title)}>{item.title}</li>)}
        </ul>
      </span>
    </div>
  )
}

export default SearchBar;