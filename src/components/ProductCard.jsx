import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

export default function ProductCard({title, thumbnail, desc, price, productId, itemCode, isGift, category}){
  return (
    <Link to={`/products/${productId}`}>
      <div className="rounded-md min-w-[152px] lg:min-w-[200px]">
        <div className="relative">
          <div className="block">
            <img
              src={thumbnail}
              alt={title}
              className="object-cover h-auto rounded-md aspect-square"
              width='400'
              height='400'
            />
          </div>
        </div>
        <div className="py-4 flex flex-col">
          <p className="block font-normal text-sm text-[#8A8A8A]">
            {desc}
          </p>
          <h2 href="#" variant="secondary" className="no-underline text-[#111111] pt-[6px] pb-2 lg:pt-1 lg:pb-4 text-[13px] lg:text-base font-bold">
            {title} {isGift && <span className="text-primary-600">- Gift</span>}
          </h2>
          <span className="block text-sm lg:text-xl inter font-medium">{price}</span>
        </div>
      </div>
    </Link>
  )
}

ProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  productId: PropTypes.string.isRequired
};