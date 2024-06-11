import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import qsUtil from 'query-string'
import _ from 'lodash';

const FilterVertical = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [limit, setLimit] = useState(8)
  const [sortBy, setSortBy] = useState("")
  const [order, setOrder] = useState("")
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(5000)

  useEffect(() => {
    const query = qsUtil.parse(location.search);

    if (query.limit) {
      setLimit(query.limit);
    }

    if (query.sortBy) {
      setSortBy(query.sortBy);
    }

    if (query.minPrice) {
      setMinPrice(query.minPrice);
    }

    if (query.maxPrice) {
      setMaxPrice(query.maxPrice);
    }

  }, [location]);

  const debounceMinPrice = _.debounce(() => {
    const query = qsUtil.parse(location.search);


    query.minPrice = document.getElementById("minPrice").value;
    query.maxPrice = document.getElementById("maxPrice").value;

    if (query.minPrice === "") {
      delete query.maxPrice;
    }

    if (query.maxPrice === "") {
      delete query.maxPrice;
    }

    navigate(`/products/search?${qsUtil.stringify(query)}`);
  }, 400, { trailing: true });

  const debounceMaxPrice = _.debounce(() => {
    const query = qsUtil.parse(location.search);

    query.minPrice = document.getElementById("minPrice").value;
    query.maxPrice = document.getElementById("maxPrice").value;

    if (query.minPrice === "") {
      delete query.maxPrice;
    }

    if (query.maxPrice === "") {
      delete query.maxPrice;
    }

    navigate(`/products/search?${qsUtil.stringify(query)}`);
  }, 400, { trailing: true });

  const minPriceDebounceSearch = useCallback(debounceMinPrice, []);
  const maxPriceDebounceSearch = useCallback(debounceMaxPrice, []);

  async function handleChange(e, field) {
    const query = qsUtil.parse(location.search);

    switch (field) {
      case "limit":
        setLimit(e.target.value);
        query.limit = e.target.value;
        navigate(`/products/search?${qsUtil.stringify(query)}`);
        break;
      case "sortBy":
        setSortBy(e.target.value);
        query.sortBy = e.target.value;

        if (query.sortBy === "") {
          delete query.sortBy;
        }

        navigate(`/products/search?${qsUtil.stringify(query)}`);
        break;
      case "ascDesc":
        query.ascDesc = e.target.value;

        if (query.ascDesc === "") {
          delete query.ascDesc;
        }

        navigate(`/products/search?${qsUtil.stringify(query)}`);
        setOrder(e.target.value);
        break;
      case "minPrice":
        setMinPrice(e.target.value);
        minPriceDebounceSearch();
        break;
      case "maxPrice":
        setMaxPrice(e.target.value);
        maxPriceDebounceSearch();
        break;
      default:
        break;
    }
  }

  return (
    <div className='w-25 mr-3'>
      <div className="card bg-light mb-3">
        <h5 className="card-header">Filter/Sort</h5>
        <div className="card-body">
          <div className="w-100 m-2">
            <label className="mr-sm-2 w-100 text-left" htmlFor="inlineFormCustomSelect">
              Limit
            </label>
            <select
              className="custom-select mr-sm-2"
              id="inlineFormCustomSelect"
              value={limit}
              onChange={(e) => handleChange(e, "limit")}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="500">500</option>
            </select>
          </div>
          <div className="w-100 m-2">
            <label className="mr-sm-2 w-100 text-left" htmlFor="inlineFormCustomSelect">
              Sort By
            </label>
            <select
              className="custom-select mr-sm-2"
              id="inlineFormCustomSelect"
              value={sortBy}
              onChange={(e) => handleChange(e, "sortBy")}
            >
              <option value="">None</option>
              <option value="price">Price</option>
              <option value="rating">Rating</option>
              <option value="name">Name</option>
            </select>
          </div>
          <div className="w-100 m-2">
            <label className="mr-sm-2 w-100 text-left" htmlFor="inlineFormCustomSelect">
              Order
            </label>
            <select
              className="custom-select mr-sm-2"
              id="inlineFormCustomSelect"
              value={order}
              onChange={(e) => handleChange(e, "ascDesc")}
            >
              <option value="">None</option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
          <div className="w-100 m-2 input-group d-flex flex-column">
            <label className="mr-sm-2 w-100 text-left" htmlFor="inlineFormCustomInput">
              Min Price
              <span> {minPrice}</span>
            </label>
            {/* {{minPrice}} */}
            <input
              className="form-control mr-sm-2 w-100"
              id="minPrice"
              value={minPrice}
              onChange={(e) => handleChange(e, "minPrice")}
              type="range"
              min={0}
              max={2000}
              step={100}
            >
            </input>
          </div>
          <div className="w-100 m-2 input-group d-flex flex-column">
            <label className="mr-sm-2 w-100 text-left" htmlFor="inlineFormCustomInput">
              Max Price
              <span> {maxPrice}</span>
            </label>
            {/* {{maxPrice}} */}
            <input
              className="form-control mr-sm-2 w-100"
              id="maxPrice"
              value={maxPrice}
              onChange={(e) => handleChange(e, "maxPrice")}
              type="range"
              min={500}
              max={5000}
              step={500}
            >
            </input>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterVertical