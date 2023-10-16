import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { SfButton, SfRating, SfCounter, SfLink, SfIconShoppingCart, SfIconFavorite } from '@storefront-ui/react';
import { useCart } from '../hooks/useCart';

const ProductCard = ({
    title,
    thumbnail,
    desc,
    price,
    productId,
    itemCode,
    isGift
}) => {
    const { addToCart } = useCart()
    return (
        <Link to={`/products/${productId}`}>
            <div className="rounded-md">
                <div className="relative">
                    <SfLink href="#" className="block">
                        <img
                            src={thumbnail}
                            alt={title}
                            className="object-cover h-auto rounded-md aspect-square"
                            width="400"
                            height="400"
                        />
                    </SfLink>
                </div>
                <div className="py-4 flex flex-col">
                    <p className="block font-normal inter text-sm text-[#111111]">
                        {desc}
                    </p>
                    <SfLink href="#" variant="secondary" className="no-underline text-[#625C5C] pt-[6px] pb-[8px] lg:pt-[13px] pb-[16px] text-xs lg:text-base">
                        {title} {isGift && <span className="text-primary-600">- Gift</span>}
                    </SfLink>
                    <span className="block pb-2 text-sm lg:text-xl">{price}</span>
                </div>
            </div>
        </Link>
    )
}

export default ProductCard

ProductCard.propTypes = {
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    productId: PropTypes.string.isRequired
};
