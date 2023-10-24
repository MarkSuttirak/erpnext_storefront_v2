import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { SfButton, SfRating, SfCounter, SfLink, SfIconShoppingCart, SfIconFavorite } from '@storefront-ui/react';
import { useCart } from '../hooks/useCart';

export default function RewardCard({title, thumbnail, desc, price, rewardId, itemCode, isGift, category}){
  return (
    <Link to={`/reward/${rewardId}`}>
      <div className="rounded-md min-w-[200px]">
        <div className="relative">
          <SfLink href="#" className="block">
            <img
              src={thumbnail}
              alt={title}
              className="object-cover h-auto rounded-md aspect-square"
              width='400'
              height='400'
            />
          </SfLink>
        </div>
        <div className="py-4 flex flex-col">
          <p className="block font-normal text-sm text-[#8A8A8A]">
            {desc}
          </p>
          <SfLink href="#" variant="secondary" className="no-underline text-[#111111] pt-[6px] pb-[8px] lg:pt-1 pb-[14px] text-xs lg:text-base">
            {title} {isGift && <span className="text-primary-600">- Gift</span>}
          </SfLink>
          <span className="block pb-2 text-sm lg:text-xl inter font-medium">{price}</span>
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