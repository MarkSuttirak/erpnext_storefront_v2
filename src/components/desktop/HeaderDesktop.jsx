import { SfButton, SfBadge } from '@storefront-ui/react';
import brandLogo from '../../img/newicon.svg'
import { useFrappeAuth } from 'frappe-react-sdk';
import { useCart } from '../../hooks/useCart';
import { useNavigate, Link } from 'react-router-dom';
import { Fragment, useState, useRef, useEffect } from 'react'
import { ShoppingBag01, MessageCircle01, ChevronDown, Heart, SearchMd } from "@untitled-ui/icons-react";
import { useFrappeGetDocList } from 'frappe-react-sdk';
import Dropdown from '../Dropdown';

export default function HeaderDesktop(){
  const navigate = useNavigate();
  const { cartCount, setIsOpen } = useCart()

  const { data:dataIcon } = useFrappeGetDocList('Brand Icon', {
    fields: ['name', 'brand_icon']
  })

  const { data:dataItemCate } = useFrappeGetDocList('Item Category', {
    fields: ['name', 'item_category']
  })

  const titleTest = dataItemCate?.map((d) => {
    return {
      link:'/',
      title: d.item_category
    }
  })

  const { currentUser } = useFrappeAuth()

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
    <header className="hidden lg:flex lg:flex-col justify-center w-full z-[999] fixed top-0 bg-white">
      <div className='flex bg-[#F2F2F2] justify-between px-6 py-2'>
        <div className='max-w-[1200px] mx-auto w-full flex justify-between'>
          <p className='text-[#424242] text-sm'>12.12 โปรโมชั่นทั้งเว็บไซต์</p>
          <div className='flex gap-x-2'>
            <Link to='/store-location' className='text-[#424242] text-sm'>หน้าร้านของเรา</Link>
            <div className='border-l border-l-[#424242] w-[1px] h-full' />
            <Link className='text-[#424242] text-sm'>ติดต่อร้านค้า</Link>
            <div className='border-l border-l-[#424242] w-[1px] h-full' />
            {currentUser ? (
              <Link to="/my-account" className='text-[#424242] text-sm'>{currentUser}</Link>
            ) : (
              <Link to="/login" className='text-[#424242] text-sm'>ลงชื่อเข้าใช้</Link>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap lg:flex-nowrap items-center flex-row h-full w-full py-2 px-4">
        <div className='max-w-[1200px] mx-auto flex items-center w-full'>
          <div className='flex flex-1 items-center gap-x-[6px]'>
            <Dropdown title='หมวดหมู่' menus={titleTest ?? []}/>
          </div>
          <picture>
            <a
              href="/"
              aria-label="SF Homepage"
              className="flex-1 justify-center flex focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm shrink-0"
            >
              <source srcSet={brandLogo} media="(min-width: 768px)" />
              <img
                src={brandLogo}
                alt="Sf Logo"
                className="w-[100px]"
              />
            </a>
          </picture>

          <nav className="flex-1 flex justify-end order-last lg:ml-4">
            <div className="relative mt-1 rounded-md">
              <Link to='/search' className='flex items-center gap-x-3 bg-[#F4F4F4] text-[#8A8A8A] rounded-md px-3 h-9 w-[200px] text-sm'>
                <SearchMd color='#424242'/>
                ค้นหา
              </Link>
            </div>
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