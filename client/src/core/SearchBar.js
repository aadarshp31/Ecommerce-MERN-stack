import React, { useCallback, useState } from 'react'
import _ from 'lodash'

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const debounce = _.debounce(async (text) => {
    if (text.length < 3) return;
    fetch(`${process.env.REACT_APP_BACKEND}/products/search?name=${text}`).then(res => res.json()).then((results) => {
      setSearchResults(results.products);
    })
  }, 400, { leading: true });

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

  return (
    <div id='search-bar' className='w-50 position-relative'>
      <input className="p-2 border border-1 rounded-pill w-100" type="search" name="search" placeholder="Search products here..." value={searchText} onChange={handleChange}></input>
      <span id='search-results' className="card position-absolute w-100" style={{visibility: searchText.length > 0 && searchResults.length > 0 ? 'visible' : 'hidden'}}>
        <ul className="list-group list-group-flush">
          {searchText.length > 0 && searchResults.length > 0 && searchResults.map((item, index) => <li key={index} className="list-group-item">{item.name}</li>)}
        </ul>
      </span>
    </div>
  )
}

export default SearchBar;