import React, { useState, Fragment } from 'react'
import { SfButton, SfDrawer, useTrapFocus, SfIconAdd, SfIconRemove } from '@storefront-ui/react'
import { useCart } from '../../hooks/useCart'
import { useProducts } from '../../hooks/useProducts'
import { Link, useNavigate } from 'react-router-dom'
import { Dialog, Transition } from '@headlessui/react'
import { XClose } from '@untitled-ui/icons-react'

export default function AddedToCartModal({isModalOpen, setIsModalOpen}){
  const { cart, cartCount, addToCart, removeFromCart, getTotal, isOpen, setIsOpen } = useCart()
  const { getByItemCode } = useProducts()
  const navigate = useNavigate()

  function generateOptions(amount = 1) {
    const options = []
    for (let i = 1; i <= amount; i++) {
      options.push(<option key={i} value={i}>{i}</option>)
    }

    return options
  }

  return (
    <div className='w-full max-w-[1200px] relative flex justify-end'>
      <Transition
        show={isModalOpen}
        as={Fragment}
        enter="transform ease-out duration-300 transition"
        enterFrom="-translate-y-5 opacity-0"
        enterTo="translate-y-0 opacity-100"
        leave="transition ease-in duration-100"
        leaveFrom="translate-y-0 opacity-100"
        leaveTo="-translate-y-5 opacity-0"
      >
        <div onClose={() => setIsModalOpen(false)} className="py-6 px-8 max-w-[500px] w-full fixed top-[92px] bg-white hidden lg:block rounded-b-[10px] z-[499]" style={{boxShadow:"0px 24px 30px 0px rgba(35, 35, 35, 0.08)"}}>
          <div className='flex justify-between items-center'>
            <h2 className="header-title">เพิ่มในตะกร้าแล้ว</h2>
            <XClose onClick={() => setIsModalOpen(false)} className='cursor-pointer'/>
          </div>
          <main>
            <ul role="list" className="divide-y divide-gray-200 overflow-y-auto">
              {
                Object.entries(cart).map(([itemCode, qty]) => {
                  const product = getByItemCode(itemCode)
                  return (
                    <li key={itemCode} className="flex py-[30px]">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img src={`${import.meta.env.VITE_ERP_URL}${product?.website_image}`} alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." className="h-full w-full object-cover object-center" />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>{product?.item_name}</h3>
                            <p className="ml-4">{product?.formatted_price}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">{product?.item_group}</p>
                        </div>

                        <div className='flex gap-x-10 mt-4'>
                          <div className='flex flex-col gap-y-[10px]'>
                            <h2 className='text-[#A2A2A2] text-xs'>ไซส์</h2>
                            <select className='outline-none text-xs text-[#111111] w-10'>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                            </select>
                          </div>
                          <div className='flex flex-col gap-y-[10px]'>
                            <h2 className='text-[#A2A2A2] text-xs'>ปริมาณ</h2>
                            <select className='outline-none text-xs text-[#111111] w-10' onChange={(e) => addToCart(itemCode, e.target.value)}>
                              {generateOptions(15)}
                            </select>
                          </div>
                        </div>
                      </div>
                    </li>
                  )
                })
              }
            </ul>
          </main>
          <footer className='flex gap-x-3'>
            <Link to='/cart' className="bg-white border border-[#111111] text-center w-full rounded-lg text-[#111111] p-3">
              ดูตะกร้า
            </Link>
            <Link to='/checkout' className="w-full bg-[#111111] border border-[#111111] rounded-lg text-center text-white p-3">
              เช็คเอาท์
            </Link>
          </footer>
        </div>
      </Transition>
    </div>
  )
}