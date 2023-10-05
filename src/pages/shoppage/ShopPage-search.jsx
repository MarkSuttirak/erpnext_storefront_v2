import { ShoppingBag01, ArrowLeft } from "@untitled-ui/icons-react"
import searchIcon from '../../img/search-md-black.svg'
import { Link } from "react-router-dom"
import { useState } from "react"
import youmaylike1 from '../../img/youmaylike1.svg';
import youmaylike2 from '../../img/youmaylike2.svg';
import youmaylike3 from '../../img/youmaylike3.svg';
import youmaylike4 from '../../img/youmaylike4.svg';
import ProductCard from "../../components/ProductCard";
import { SfIconArrowForward } from "@storefront-ui/react";
import { useProducts } from "../../hooks/useProducts";

const ShopPageSearch = () => {
  const latestSearches = ['เสื้อ', 'กางเกง', 'รองเท้า']

  const { products } = useProducts()

  const youmaylike = [
    {
      image:youmaylike1,
      title:'ไอเท็มใหม่ล่าสุดทันทุกเทรน'
    },
    {
      image:youmaylike2,
      title:'อุปกรณ์เดินทางป่าแคมปิ้ง'
    },
    {
      image:youmaylike3,
      title:'เสื้อผ้าออกงานอออกอีเว้นท์'
    },
    {
      image:youmaylike4,
      title:'ของตกแต่งสุดพิเศษ'
    }
  ]

  const [haveLatestSearches, setHaveLatestSearches] = useState(true);

  const hideClearSearch = {
    visibility: "hidden",
    opacity: "0",
    transition: "all 200ms"
  }

  const showClearSearch = {
    visibility: "visible",
    opacity: "1",
    transition: "all 200ms"
  }

  return (
    <>
      <header className='py-[7px] px-[18px] border-b border-b-[#F2F2F2] text-md font-bold bg-white flex gap-x-2 items-center fixed w-full top-0 z-[999]'>
        <Link to='/shop'>
          <ArrowLeft />
        </Link>
        <img src={searchIcon} className="absolute right-[24px]"/>
        <input type="search" className="p-[7px] pr-10 bg-[#E6E6E6] h-[34px] rounded-[9px] font-medium w-full text-[13px]" placeholder='พิมพ์ชื่อสินค้า แบรนด์ ลักษณะสินค้า' />
      </header>
      <main className="mt-[49px]">
        <section className="py-5 px-5">
          <div className="flex justify-between items-center">
            <h2 className="text-sm text-[#333333] font-bold">การค้นหาล่าสุด</h2>
            <div className={`text-[#5B6CFF] text-xs`} style={haveLatestSearches ? showClearSearch : hideClearSearch} onClick={() => {
              setAccordionActiveOne(false)
            }}>เคลียร์การค้นหา</div>
          </div>
          <div className="flex gap-x-2 mt-4">
            {latestSearches.map((search) => 
              <span className="inline-flex px-[14px] py-[4px] bg-[#F1F1F1] text-[#696969] rounded-[4px] text-[10px]">{search}</span>
            )}
          </div>
        </section>

        <hr className="border-[#E3E3E3]"/>

        <section className="pt-5 pb-[30px] px-5">
          <h2 className="text-sm text-[#333333] font-bold">หรือคุณต้องการสิ่งนี้</h2>

          <div className="grid grid-cols-2 gap-x-3 gap-y-[14px] mt-4">
            {youmaylike.map((list) => 
              <div className="flex basis-1/2 gap-x-3 items-center">
                <img src={list.image} />
                <p className="text-xs text-[#111111]">{list.title}</p>
              </div>
            )}
          </div>
        </section>

        <hr className="border-[#E3E3E3]"/>

        <section>
          <div className='mt-[22px]'>
            <Link to='/shop/viewed'>
              <h2 className='text-sm text-[#3D3D3D] font-bold flex items-center px-5 mb-[14px] leading-6'>
                สินค้าที่ดูล่าสุด
                <SfIconArrowForward className="w-[18px] text-black ml-2"/>
              </h2>
            </Link>

            <div className="flex overflow-x-auto gap-x-[14px] mx-auto px-5">
              {(products ?? []).map((product) => (
                <ProductCard
                  key={product.item_code}
                  title={product.name}
                  productId={product.name}
                  itemCode={product.item_code}
                  price={product.formatted_price}
                  thumbnail={product.website_image ? product.website_image : "https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/sneakers.png"} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default ShopPageSearch