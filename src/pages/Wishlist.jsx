import { useCart } from '../hooks/useCart';
import { ShoppingBag01, ChevronRight, ArrowLeft } from "@untitled-ui/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useFrappeGetCall, useFrappePostCall } from 'frappe-react-sdk';
import { useProducts } from '../hooks/useProducts'
import WishlistProducts from '../components/WishlistProducts';

export default function Wishlist(){
  const { getByItemCode, products } = useProducts()

  const { call, isCompleted, result } = useFrappePostCall('headless_e_commerce.api.place_order');
  const { cart, cartCount, setIsOpen } = useCart()

  const [currentSec, setCurrentSec] = useState(1)

  return (
    <>
      <header className="border-b p-[14px] border-b-[#F2F2F2] text-md font-bold bg-white flex justify-between items-center lg:hidden">
        <div className="flex items-center gap-x-[7px]">
          <Link to='/my-account'>
            <ArrowLeft />
          </Link>
          รายการสินค้าที่ถูกใจ
        </div>

        <div className="flex items-center">
          <button className="px-2" onClick={() => setIsOpen(true)}>
            <ShoppingBag01 viewBox='0 0 24 24' width="22" height="22"/>
          </button>
        </div>
      </header>
      <main className='lg:mt-[92px] lg:px-5 lg:pt-10 desktop-sec'>
        <h2 className='header-title hidden lg:flex justify-center mb-10'>รายการสินค้าที่ถูกใจ</h2>
        <nav className="border-b border-b-[#F2F2F2]">
          <ul className="flex">
            <li className="h-[50px] basis-1/3 flex items-center justify-center gap-x-1 relative" onClick={() => setCurrentSec(1)}>
              <span className='text-[#111111] font-bold text-[15px]'>ทั้งหมด</span>
              <span className='inter text-[#8A8A8A] text-xs mt-[2px]'>(2)</span>

              <div className={`absolute h-[2px] ${currentSec === 1 ? "w-full border-anim" : ""} left-0 bg-black bottom-0`}></div>
            </li>
            <li className="h-[50px] basis-1/3 flex items-center justify-center gap-x-1 relative" onClick={() => setCurrentSec(2)}>
              <span className='text-[#111111] font-bold text-[15px]'>มีสินค้า</span>
              <span className='inter text-[#8A8A8A] text-xs mt-[2px]'>(1)</span>

              <div className={`absolute h-[2px] ${currentSec === 2 ? "w-full border-anim" : ""} left-0 bg-black bottom-0`}></div>
            </li>
            <li className="h-[50px] basis-1/3 flex items-center justify-center gap-x-1 relative" onClick={() => setCurrentSec(3)}>
              <span className='text-[#111111] font-bold text-[15px]'>สินค้าหมด</span>
              <span className='inter text-[#8A8A8A] text-xs mt-[2px]'>(1)</span>

              <div className={`absolute h-[2px] ${currentSec === 3 ? "w-full border-anim" : ""} left-0 bg-black bottom-0`}></div>
            </li>
          </ul>
        </nav>

        {currentSec === 1 && (
        <section>
          <ul role="list" className="grid lg:grid-cols-3 gap-6">
            {(products ?? []).map((product) => (
              <WishlistProducts 
                key={product.item_name} 
                image={product.website_image ? `${import.meta.env.VITE_ERP_URL}${product.website_image}` : "https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/sneakers.png"} 
                name={product.item_name} 
                price={product.formatted_price} 
                desc={product.item_group}/>
            ))}
            {/* {
              Object.entries(cart).map(([itemCode, qty]) => {
                return (
                  <WishlistProducts key={itemCode} image={product?.website_image} name={product?.name} price={product?.formatted_price} desc='Salmon'/>
                )
              })
            } */}
          </ul>
        </section>
        )}
      </main>
    </>
  )
}