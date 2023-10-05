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
            <div className="rounded-md hover:shadow-lg">
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
                    <SfButton
                        type="button"
                        variant="tertiary"
                        size="sm"
                        square
                        className="absolute bottom-0 right-0 mr-2 mb-2 bg-white ring-1 ring-inset ring-neutral-200 !rounded-full"
                        aria-label="Add to wishlist"
                    >
                        <SfIconFavorite size="sm" />
                    </SfButton>
                </div>
                <div className="py-4 border-t border-neutral-200">
                    <SfLink href="#" variant="secondary" className="no-underline">
                        {title} {isGift && <span className="text-primary-600">- Gift</span>}
                    </SfLink>
                    <div className="flex items-center pt-1">
                        <SfRating size="xs" value={5} max={5} />

                        <SfLink href="#" variant="secondary" className="pl-1 no-underline">
                            <SfCounter size="xs">{123}</SfCounter>
                        </SfLink>
                    </div>
                    <p className="block py-2 font-normal typography-text-sm text-neutral-700 max-h-20 overflow-hidden text-ellipsis">
                        <div dangerouslySetInnerHTML={{ __html: desc }} />
                    </p>
                    <span className="block pb-2 font-bold typography-text-lg">{price}</span>
                    <SfButton type="button" size="sm" slotPrefix={<SfIconShoppingCart size="sm" />} onClick={(e) => {
                        e.preventDefault();
                        addToCart(itemCode)
                    }}>
                        Add to cart
                    </SfButton>
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
