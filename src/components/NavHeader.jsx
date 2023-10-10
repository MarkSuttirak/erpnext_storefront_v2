import {
    SfButton,
    SfIconShoppingCart,
    SfIconFavorite,
    SfIconPerson,
    SfIconMenu,
    SfBadge,
} from '@storefront-ui/react';
import brandLogo from '../img/logo.svg'
import { useFrappeAuth } from 'frappe-react-sdk';
import { useCart } from '../hooks/useCart';
import { useNavigate } from 'react-router-dom';
import { Fragment, useState, useRef, useEffect } from 'react'
import { ShoppingBag01, MessageCircle01, ChevronDown } from "@untitled-ui/icons-react";
import { useFrappeGetDocList } from 'frappe-react-sdk';

const NavHeader = () => {
    const navigate = useNavigate();
    const { cartCount, setIsOpen } = useCart()
    const { currentUser } = useFrappeAuth()

    const { data:dataIcon } = useFrappeGetDocList('Brand Icon', {
      fields: ['name', 'brand_icon']
    })

    const actionItems = [
      {
        icon: (<MessageCircle01 />),
        label: '',
        ariaLabel: 'Message',
        role: 'button',
        onClick: () => null
      },
      {
        icon: (<ShoppingBag01 viewBox='0 0 24 24' width="22" height="22"/>),
        label: '',
        ariaLabel: 'Cart',
        role: 'button',
        onClick: () => setIsOpen(true)
      },
    ];

    return (
      <header className="flex lg:flex-col justify-center w-full z-[999] fixed top-0 lg:bg-white">
          <div className='hidden lg:flex bg-[#F2F2F2] justify-between px-6 py-2'>
            <div className='max-w-[1200px] mx-auto w-full flex justify-between'>
              <p className='text-[#424242] text-sm'>12.12 โปรโมชั่นทั้งเว็บไซต์</p>
              <div className='flex gap-x-2'>
                <button className='text-[#424242] text-sm'>หน้าร้านของเรา</button>
                <button className='text-[#424242] text-sm'>ติดต่อร้านค้า</button>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap lg:flex-nowrap items-center flex-row h-full w-full bg-[#FFFFFF94] lg:bg-white py-2 px-4 mx-5 my-3 lg:m-0 rounded-[9px]" style={{backdropFilter:"blur(3px)"}}>
            <div className='max-w-[1200px] mx-auto flex items-center w-full'>
              <button className='hidden lg:flex flex-1 items-center gap-x-[6px]'>
                หมวดหมู่
                <ChevronDown />
              </button>
              <picture>
                <a
                  href="/"
                  aria-label="SF Homepage"
                  className="lg:flex-1 lg:justify-center flex focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm shrink-0"
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
          </div>
      </header>
    )
}

export default NavHeader
