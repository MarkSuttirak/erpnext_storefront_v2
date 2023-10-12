import FooterMenu from "../../components/FooterMenu"
import searchIcon from '../../img/search-md-black.svg'
import { useCart } from '../../hooks/useCart';
import { ShoppingBag01, ChevronRight, ArrowLeft } from "@untitled-ui/icons-react";
import { Link } from "react-router-dom";
import newItem from '../../img/new-item.png'
import ProductCard from "../../components/ProductCard";
import { useProducts } from '../../hooks/useProducts'
import { useState } from "react";
import ShopFilterDesktop from "../../components/desktop/ShopFilterDesktop";

const ShopPage = () => {
  const { products } = useProducts()
  const { cartCount, setIsOpen } = useCart()

  return (
    <>
      <header className={`p-[14px] border-b border-b-[#F2F2F2] text-md font-bold bg-white flex justify-between items-center`}>
        <div className="flex items-center gap-x-[7px]">
          <Link to='/categories'>
            <ArrowLeft />
          </Link>
          ไอเท็มใหม่
        </div>

        <div className="flex items-center">
          <Link to='/shop/search' className="px-2">
            <img src={searchIcon} />
          </Link>
          <button className="px-2" onClick={() => setIsOpen(true)}>
            <ShoppingBag01 viewBox='0 0 24 24' width="22" height="22"/>
          </button>
        </div>
      </header>
      <header className='bg-black text-white text-center py-[10px] lg:hidden'>
        สมาชิกใหม่รับ ของขวัญฟรี กดรับเลย !! 🎁
      </header>
      <main className="lg:mt-[92px] lg:px-5">
        <div className="p-5 lg:hidden">
          <img src={newItem} width="100%"/>
        </div>

        <h2 className="header-title">สินค้าออกใหม่</h2>

        <div className="lg:flex mt-12">
          <ShopFilterDesktop />

          <div className="w-full">
            <div className="border-b border-b-[#F2F2F2] flex lg:hidden">
              <Link to='/shop/filter' className='block p-4 w-1/2 border-r border-r-[#F2F2F2] text-center'>ประเภทสินค้า</Link>
              <Link to='/shop/type' className='block p-4 w-1/2 text-center'>ลักษณะสินค้า</Link>
            </div>

            <section className="p-5 grid lg:grid-cols-3 grid-cols-2 justify-between gap-[14px]">
              {(products ?? []).map((product) => (
                <ProductCard
                  key={product.item_code}
                  title={product.item_name}
                  productId={product.name}
                  itemCode={product.item_code}
                  price={product.formatted_price}
                  thumbnail={product.website_image ? `${import.meta.env.VITE_ERP_URL}${product.website_image}` : "https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/sneakers.png"} 
                />
              ))}
            </section>
          </div>
        </div>
      </main>
    </>
  )
}

export default ShopPage