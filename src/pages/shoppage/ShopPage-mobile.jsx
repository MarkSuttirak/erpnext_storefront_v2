import { useCart } from '../../hooks/useCart';
import { useProducts } from '../../hooks/useProducts'
import { useState } from "react";
import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag01 } from '@untitled-ui/icons-react';
import ProductCard from '../../components/ProductCard';
import searchIcon from '../../img/search-md-black.svg'

const ShopPageMobile = ({setCurrentPage}) => {
  const { products } = useProducts()
  const { cartCount, setIsOpen } = useCart()

  const handleClickToSearch = () => {
    setCurrentPage('search')
  }

  const handleClickToType = () => {
    setCurrentPage('type')
  }

  const handleClickToFilter = () => {
    setCurrentPage('filter')
  }

  return (
    <div>
      <header className={`p-[14px] border-b border-b-[#F2F2F2] text-md font-bold bg-white flex justify-between items-center`}>
        <div className="flex items-center gap-x-[7px]">
          <Link to='/categories'>
            <ArrowLeft />
          </Link>
          ไอเท็มใหม่
        </div>

        <div className="flex items-center">
          <button onClick={handleClickToSearch} className="px-2">
            <img src={searchIcon} />
          </button>
          <button className="px-2" onClick={() => setIsOpen(true)}>
            <ShoppingBag01 viewBox='0 0 24 24' width="22" height="22"/>
          </button>
        </div>
      </header>
      <header className='bg-black text-white text-center py-[10px]'>
        12.12 โปรโมชั่นทั้งเว็บไซต์
      </header>
      <main>
        <div className="border-b border-b-[#F2F2F2] flex">
          <button onClick={handleClickToFilter} className='block p-4 w-1/2 border-r border-r-[#F2F2F2] text-center'>ประเภทสินค้า</button>
          <button onClick={handleClickToType} className='block p-4 w-1/2 text-center'>ลักษณะสินค้า</button>
        </div>

        <section className="p-5 grid gap-y-[14px]">
          {(products ?? []).map((product) => (
            <ProductCard
              key={product.item_code}
              desc={product.item_group}
              title={product.item_name}
              productId={product.name}
              itemCode={product.item_code}
              price={product.formatted_price}
              thumbnail={product.website_image ? `${import.meta.env.VITE_ERP_URL}${product.website_image}` : "https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/sneakers.png"}
            />
          ))}
        </section>
      </main>
    </div>
  )
}

export default ShopPageMobile