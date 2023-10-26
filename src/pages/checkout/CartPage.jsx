import React, { useState } from 'react'
import { SfButton, useTrapFocus } from '@storefront-ui/react'
import { useCart } from '../../hooks/useCart'
import { useProducts } from '../../hooks/useProducts'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ChevronRight, Heart, Ticket02, Trash03 } from '@untitled-ui/icons-react';
import { Link } from 'react-router-dom'
import { useRef } from 'react';

export default function CartPage(){
  const { cart, cartCount, addToCart, removeFromCart, getTotal, isOpen, setIsOpen } = useCart()
  const drawerRef = useRef(null);
  const { getByItemCode } = useProducts()
  const navigate = useNavigate()

  const [delivery, setDelivery] = useState(59)
  const [discount, setDiscount] = useState(99)

  const total = getTotal() + delivery - discount

  useTrapFocus(drawerRef, { activeState: isOpen });

  function generateOptions(amount = 1) {
    const options = []
    for (let i = 1; i <= amount; i++) {
      options.push(<option key={i} value={i}>{i}</option>)
    }
    return options
  }

  return (
    <>
      <header className='p-[14px] border-b border-b-[#F2F2F2] flex gap-x-[7px] text-md font-bold bg-white lg:hidden'>
        <button onClick={() => navigate(-1)} type="button">
          <ArrowLeft />
        </button>
        ทั้งหมด <span className='price'>฿ {getTotal()}</span>
      </header>
      <header className='bg-black text-white text-center py-[10px] lg:hidden'>
        กดรับของขวัญฟรี 🎁
      </header>
      <main className="flex flex-col lg:flex-row lg:gap-x-6 bg-white lg:mt-[92px] lg:py-10 desktop-sec px-5">
        <div className="flex-1 overflow-y-auto">
          <h2 className='header-title hidden lg:block mb-[30px]'>ตะกร้า</h2>
          {cartCount == 0 ? (
            <h2 className='text-[#8A8A8A] my-4 lg:my-0'>ไม่มีสินค้าในตะกร้า</h2>
          ) : (
            <div className="flow-root">
              <ul role="list" className="overflow-y-auto">
                {
                  Object.entries(cart).map(([itemCode, qty]) => {
                    const product = getByItemCode(itemCode)
                    return (
                      <li key={itemCode} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                          <img src={`${import.meta.env.VITE_ERP_URL}${product?.website_image}`} alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." className="h-full w-full object-cover object-center" />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col gap-y-[15px]">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href="#">{product?.item_name}</a>
                              </h3>
                              <p className="ml-4 price">{product?.formatted_price}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">{product?.item_group}</p>
                          </div>
                          <div className='flex gap-x-10'>
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
                          <div className="flex gap-x-[30px] items-center">
                            <Heart />
                            <Trash03 onClick={() => removeFromCart(itemCode)}/>
                          </div>
                        </div>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          )}
        </div>
        <div className='lg:w-[400px] lg:px-8 lg:py-6 lg:border lg:border-[#E3E3E3] rounded-[10px]'>
          <div className='pt-[30px] lg:mt-0 flex flex-col gap-y-4 mb-10 border-t border-t-[#E3E3E3] lg:border-0 lg:pt-0'>
            <h2 className='header-title'>รายละเอียดการชำระเงิน</h2>
            <div className="flex justify-between items-center text-[#424242]">
              <h2 className='font-bold'>ยอดรวม</h2>
              <p className='price'>฿ {getTotal()}</p>
            </div>
            {discount && (
              <div className="flex justify-between items-center">
                <h2 className='font-bold'>ส่วนลด</h2>
                <p className='price'>-฿ {discount}</p>
              </div>
            )}
            <div className="flex justify-between items-center">
              <h2 className='font-bold'>ทั้งหมด</h2>
              <p className='price'>฿ {total}</p>
            </div>
            <div className="flex justify-between items-center">
              <h2>Points ที่คุณจะได้รับ</h2>
              <p className='price'>149</p>
            </div>
          </div>
          <SfButton size="lg" onClick={() => navigate('/checkout')} className="w-full" style={{backgroundColor:cartCount == 0 ? "#C5C5C5" : "black",color:"white"}} disabled={cartCount == 0}>
            ดำเนินการสั่งซื้อสินค้า
          </SfButton>
        </div>
      </main>
    </>
  )
}