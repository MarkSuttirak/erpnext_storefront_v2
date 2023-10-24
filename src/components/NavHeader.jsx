import { SfButton, SfBadge } from '@storefront-ui/react';
import brandLogo from '../img/newicon.svg'
import { useFrappeAuth } from 'frappe-react-sdk';
import { useCart } from '../hooks/useCart';
import { useNavigate } from 'react-router-dom';
import { Fragment, useState, useRef, useEffect } from 'react'
import { ShoppingBag01, MessageCircle01, ChevronDown, Heart } from "@untitled-ui/icons-react";
import { useFrappeGetDocList } from 'frappe-react-sdk';

export default function NavHeader(){
  const navigate = useNavigate();
  const { cartCount, setIsOpen } = useCart()

  const { data:dataIcon } = useFrappeGetDocList('Brand Icon', {
    fields: ['name', 'brand_icon']
  })

  const actionItems = [
    {
      icon: (<Heart />),
      label: '',
      ariaLabel: 'Wishlist',
      role: 'button',
      onClick: () => navigate('/wishlist')
    },
    {
      icon: (<ShoppingBag01 viewBox='0 0 24 24' width="22" height="22"/>),
      label: '',
      ariaLabel: 'Cart',
      role: 'button',
      onClick: () => navigate('/cart')
    },
  ];

  return (
    <header className="flex justify-center w-full z-[999] fixed top-0 lg:hidden">
      <div className="flex flex-wrap items-center flex-row h-full w-full bg-[#FFFFFF94] py-[1px] px-4 mx-5 my-3 rounded-[9px]" style={{backdropFilter:"blur(3px)"}}>
        <picture>
          <a
            href="/"
            aria-label="SF Homepage"
            className="flex focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm shrink-0"
          >
            <source srcSet={brandLogo} media="(min-width: 768px)" />
            <img
              src={brandLogo}
              alt="Sf Logo"
              className="w-[100px]"
            />
          </a>
        </picture>

        <nav className="flex-1 flex justify-end lg:order-last lg:ml-4">
          <div className="flex flex-row flex-nowrap">
            {actionItems.map((actionItem) => (
              <SfButton
                key={actionItem.ariaLabel}
                className="relative ml-1 rounded-[99px] hover:bg-white"
                aria-label={actionItem.ariaLabel}
                variant="tertiary"
                square
                slotPrefix={actionItem.icon}
                onClick={actionItem.onClick}
              >
                {actionItem.ariaLabel === 'Cart' && (
                  <SfBadge content={cartCount} />
                )}
                {actionItem.role === 'login' && (
                  <p className="hidden xl:inline-flex whitespace-nowrap">{actionItem.label}</p>
                )}
              </SfButton>
            ))}
          </div>
        </nav>
      </div>
    </header>
  )
}