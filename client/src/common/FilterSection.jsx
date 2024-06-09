import { useState } from "react";
import queryString from "query-string";
import { searchProducts } from "../core/helper/coreapicalls";


	

const FilterSection = () => {
    const [query, setQuery] = useState({
      sortBy: "name",
      ascDesc: "asc",
      limit: 20,
      skip: undefined,
      minPrice: undefined,
      maxPrice: undefined
    });
    
    const [showFilterSection, setShowFilterSection] = useState(false);
    
    //destructuring
    const { sortBy, ascDesc, limit, minPrice, maxPrice } = query;
    //Handle Change
    const handleChange = (fieldName) => (e) => {
    setQuery({ ...query, [fieldName]: e.target.value });
    };
    
    //Filter
    const filter = () => {
    const queryStringified = queryString.stringify(query);
    return searchProducts(queryStringified)
      .then((data) => {
        if (data.error) {
        } else {
          // setProducts(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    };

		return (
			<div className="d-flex">
				<div>
					<i className="fa fa-sliders m-1 text-dark btn btn-lg border rounded" style={{ fontSize: "1.5rem" }} onClick={() => {
						setShowFilterSection(!showFilterSection)
					}}></i>
				</div>
				{showFilterSection && (
					<div className="w-100 d-flex align-items-center flex-column justify-content-around gradient text-light p-3 rounded">
						<h3 className="align-self-start">Filter / Sort</h3>
						<div
							className="p-3 mt-2 mx-auto d-flex align-items-start justify-content-around flex-column flex-md-row w-100"
						>
							<div className="w-100 m-2">
								<label className="mr-sm-2" htmlFor="inlineFormCustomSelect">
									Sort By
								</label>
								<select
									className="custom-select mr-sm-2 bg-transparent text-light border-left-0 border-right-0 border-top-0 rounded-0"
									id="inlineFormCustomSelect"
									value={sortBy}
									onChange={handleChange("sortBy")}
								>
									<option value="price">Price</option>
									<option value="rating">Rating</option>
									<option value="name">Name</option>
								</select>
							</div>
							{query.sortBy === "price" && (<div className="w-100 m-2 input-group d-flex flex-column">
								<label className="mr-sm-2" htmlFor="inlineFormCustomInput">
									Min Price
								</label>
								{/* {{minPrice}} */}
								<input
									className="form-control mr-sm-2 bg-transparent text-light border-left-0 border-right-0 border-top-0 rounded-0 w-100"
									id="inlineFormCustomInput"
									value={query.minPrice}
									onChange={handleChange("minPrice")}
									type="number"
									min={0}
								>
								</input>
							</div>)}
							{query.sortBy === "price" && (<div className="w-100 m-2 input-group d-flex flex-column">
								<label className="mr-sm-2" htmlFor="inlineFormCustomInput">
									Max Price
								</label>
								{/* {{maxPrice}} */}
								<input
									className="form-control mr-sm-2 bg-transparent text-light border-left-0 border-right-0 border-top-0 rounded-0 w-100"
									id="inlineFormCustomInput"
									value={query.maxPrice}
									onChange={handleChange("maxPrice")}
									type="number"
									min={0}
								>
								</input>
							</div>)}
							<div className="w-100 m-2">
								<label className="mr-sm-2" htmlFor="inlineFormCustomSelect">
									Order
								</label>
								<select
									className="custom-select mr-sm-2 bg-transparent text-light border-left-0 border-right-0 border-top-0 rounded-0"
									id="inlineFormCustomSelect"
									value={ascDesc}
									onChange={handleChange("ascDesc")}
								>
									<option value="asc">Ascending</option>
									<option value="desc">Descending</option>
								</select>
							</div>
							<div className="w-100 m-2">
								<label className="mr-sm-2" htmlFor="inlineFormCustomSelect">
									Limit
								</label>
								<select
									className="custom-select mr-sm-2 bg-transparent text-light border-left-0 border-right-0 border-top-0 rounded-0"
									id="inlineFormCustomSelect"
									value={limit}
									onChange={handleChange("limit")}
								>
									<option value="10">10</option>
									<option value="20">20</option>
									<option value="50">50</option>
									<option value="100">100</option>
									<option value="500">500</option>
								</select>
							</div>
						</div>
						<div className="w-50 w-md-25">
							<button
								className="btn btn-block btn-info my-2 rounded"
								onClick={filter}
							>
								Filter
							</button>
						</div>
					</div>
				)}
			</div>
		);
	};


  export default FilterSection;