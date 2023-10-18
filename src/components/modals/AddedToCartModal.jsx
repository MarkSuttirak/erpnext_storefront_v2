import React, { useState, Fragment } from 'react'
import { SfButton, SfDrawer, useTrapFocus, SfIconAdd, SfIconRemove } from '@storefront-ui/react'
import { useCart } from '../../hooks/useCart'
import { useProducts } from '../../hooks/useProducts'
import { Link, useNavigate } from 'react-router-dom'
import { Dialog, Transition } from '@headlessui/react'
import { XClose } from '@untitled-ui/icons-react'

const AddedToCartModal = ({isModalOpen, setIsModalOpen}) => {
  const { cart, cartCount, addToCart, removeFromCart, getTotal, isOpen, setIsOpen } = useCart()
  const { getByItemCode } = useProducts()
  const navigate = useNavigate()

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

                        <div className="flex flex-1 items-center justify-between text-sm">
                          <div className="flex items-center justify-between mt-4 sm:mt-0">
                            <div className="flex border border-neutral-300 rounded-md">
                              <SfButton
                                type="button"
                                variant="tertiary"
                                disabled={cart[itemCode] === 1}
                                square
                                className="rounded-r-none"
                                aria-controls={null}
                                aria-label="Decrease value"
                                onClick={() => addToCart(itemCode, cart[itemCode] - 1)}
                              >
                                <SfIconRemove />
                              </SfButton>
                              <input
                                type="number"
                                role="spinbutton"
                                className="appearance-none mx-2 w-8 outline-none text-center bg-transparent font-medium [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:display-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:display-none [&::-webkit-outer-spin-button]:m-0 [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none disabled:placeholder-disabled-900"
                                value={cart[itemCode]}
                                onChange={null}
                              />
                              <SfButton
                                type="button"
                                variant="tertiary"
                                square
                                className="rounded-l-none"
                                aria-controls={null}
                                aria-label="Increase value"
                                onClick={() => addToCart(itemCode)}
                              >
                                <SfIconAdd />
                              </SfButton>
                            </div>
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

export default AddedToCartModal;