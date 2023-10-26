import { ShoppingBag01 } from "@untitled-ui/icons-react"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../hooks/useCart";
import { useFrappePostCall } from "frappe-react-sdk";
import { useProducts } from "../hooks/useProducts";

export default function CheckoutDetails(){
  const [informationAlert, setInformationAlert] = useState(false);
  const [positiveAlert, setPositiveAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  const [delivery, setDelivery] = useState(59)
  const [discount, setDiscount] = useState(99)

  const { cart, cartCount, getTotal, resetCart } = useCart();
  const navigate = useNavigate();

  const { getByItemCode } = useProducts()
  const total = getTotal() + delivery - discount

  return (
    <div className='lg:w-[480px] lg:min-w-[480px]'>
      <div className="flex justify-between items-end py-4 lg:hidden">
        <p className="typography-headline-4 font-bold typography-headline-3 gap-x-2 flex">
          <ShoppingBag01 />
          Order Summary
        </p>
        <p className="typography-text-base font-medium">(Items: {cartCount})</p>
      </div>
      <div className="rounded-md lg:border lg:border-[#E3E3E3] lg:px-8 lg:pt-6 lg:flex lg:flex-col-reverse">
        <ul role="list" className="divide-y divide-gray-200">
          {
            Object.entries(cart).map(([itemCode, qty]) => {
              const product = getByItemCode(itemCode)
              return (
                <li key={itemCode} className="flex gap-y-6 py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img src={`${import.meta.env.VITE_ERP_URL}${product?.website_image}`} alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." className="h-full w-full object-cover object-center" />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div className="flex justify-between">
                      <div className="flex flex-col text-base font-medium text-gray-900">
                        <p className="text-sm text-gray-500">{product?.item_group}</p>
                        <h3 className="text-[#111111] text-[13px] font-bold">{product?.item_name}</h3>
                      </div>
                      <p className="ml-4 price">{product?.formatted_price}</p>
                    </div>
                    <div className='flex gap-x-10 mt-[15px]'>
                      <div className='flex flex-col gap-y-[10px]'>
                        <h2 className='text-[#A2A2A2] text-xs'>ไซส์</h2>
                        <p className="text-xs text-[#111111]">38</p>
                      </div>
                      <div className='flex flex-col gap-y-[10px]'>
                        <h2 className='text-[#A2A2A2] text-xs'>ปริมาณ</h2>
                        <p className="text-xs text-[#111111]">{cart[itemCode]}</p>
                      </div>
                    </div>
                  </div>
                </li>
              )
            })
          }
        </ul>
        <div className="pt-6 lg:pt-0 border-t lg:border-b lg:pb-6 lg:border-t-0 border-neutral-200">
          <h2 className='header-title mb-[10px]'>รายละเอียดการชำระเงิน</h2>
          <div className="flex flex-col gap-y-4 justify-between typography-text-base">
            <div className="flex justify-between items-center text-[#424242]">
              <h2 className='font-bold'>ยอดรวม</h2>
              <p className="price">฿ {getTotal()}</p>
            </div>
            {discount && (
              <div className="flex justify-between items-center">
                <h2 className='font-bold'>โค้ดส่วนลด</h2>
                <p className="price">-฿ {discount}</p>
              </div>
            )}
            <div className="flex justify-between items-center">
              <h2 className='font-bold'>ค่าจัดส่ง</h2>
              <p className="price">-฿ {delivery}</p>
            </div>
            <div className="flex justify-between items-center">
              <h2 className='font-bold'>ทั้งหมด</h2>
              <p className="price">฿ {total}</p>
            </div>
            <div className="flex justify-between items-center">
              <h2>Points ที่คุณจะได้รับ</h2>
              <p className="price">149</p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 mx-2 mt-2 sm:mr-6">
        {positiveAlert && (
          <div
            role="alert"
            className="flex items-start md:items-center shadow-md max-w-[600px] bg-positive-100 pr-2 pl-4 mb-2 ring-1 ring-positive-200 typography-text-sm md:typography-text-base py-1 rounded-md"
          >
            <SfIconCheckCircle className="mr-2 my-2 text-positive-700" />
            <p className="py-2 mr-2">Your promo code has been added.</p>
            <button
              type="button"
              className="p-1.5 md:p-2 ml-auto rounded-md text-positive-700 hover:bg-positive-200 active:bg-positive-300 hover:text-positive-800 active:text-positive-900"
              aria-label="Close positive alert"
              onClick={() => setPositiveAlert(false)}
            >
              <SfIconClose className="hidden md:block" />
              <SfIconClose size="sm" className="md:hidden block" />
            </button>
          </div>
        )}
        {informationAlert && (
          <div
            role="alert"
            className="flex items-start md:items-center shadow-md max-w-[600px] bg-positive-100 pr-2 pl-4 mb-2 ring-1 ring-positive-200 typography-text-sm md:typography-text-base py-1 rounded-md"
          >
            <SfIconCheckCircle className="mr-2 my-2 text-positive-700" />
            <p className="py-2 mr-2">Your promo code has been removed.</p>
            <button
              type="button"
              className="p-1.5 md:p-2 ml-auto rounded-md text-positive-700 hover:bg-positive-200 active:bg-positive-300 hover:text-positive-800 active:text-positive-900"
              aria-label="Close positive alert"
              onClick={() => setInformationAlert(false)}
            >
              <SfIconClose className="hidden md:block" />
              <SfIconClose size="sm" className="md:hidden block" />
            </button>
          </div>
        )}
        {errorAlert && (
          <div
            role="alert"
            className="flex items-start md:items-center max-w-[600px] shadow-md bg-negative-100 pr-2 pl-4 ring-1 ring-negative-300 typography-text-sm md:typography-text-base py-1 rounded-md"
          >
            <p className="py-2 mr-2">This promo code is not valid.</p>
            <button
              type="button"
              className="p-1.5 md:p-2 ml-auto rounded-md text-negative-700 hover:bg-negative-200 active:bg-negative-300 hover:text-negative-800 active:text-negative-900"
              aria-label="Close error alert"
              onClick={() => setErrorAlert(false)}
            >
              <SfIconClose className="hidden md:block" />
              <SfIconClose size="sm" className="md:hidden block" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}