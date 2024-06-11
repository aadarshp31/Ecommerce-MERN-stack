import React, { useCallback, useEffect, useState } from 'react'
import Base from '../core/Base'
import HorizontalCard from '../core/HorizontalCard'
import { searchProducts } from '../core/helper/coreapicalls'
import { useLocation } from 'react-router-dom'
import FilterVertical from '../common/FilterVertical'
import queryString from 'query-string'

const ProductsSearchPage = () => {
  const [products, setProducts] = useState([])
  const location = useLocation();
  const query = queryString.parse(location.search);

  useEffect(() => {
    if(!location.search){
      return;
    }
    
    searchProducts(queryString.stringify(query)).then((products) => {
      setProducts(products);
    })
  }, [location])

  return (
    <Base title="Products Search Page" description="Welcome to the Ecommerce Store">
      <div className='d-flex justify-start'>
        {useCallback(<FilterVertical />)}
        <div className='d-flex flex-column align-items-center w-100'>
          {products.map((product, index) => (<HorizontalCard product={product} key={index} />))}
        </div>
      </div>
    </Base>
  )
}

export default ProductsSearchPage