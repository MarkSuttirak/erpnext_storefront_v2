import { ArrowLeft, SearchMd, XClose } from "@untitled-ui/icons-react"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import youmaylike1 from '../img/youmaylike1.svg';
import youmaylike2 from '../img/youmaylike2.svg';
import youmaylike3 from '../img/youmaylike3.svg';
import youmaylike4 from '../img/youmaylike4.svg';
import ProductCard from "../components/ProductCard";
import { SfIconArrowForward } from "@storefront-ui/react";
import { useProducts } from "../hooks/useProducts";

export default function SearchPage(){
  const latestSearches = ['เสื้อ', 'กางเกง', 'รองเท้า']

  const navigate = useNavigate()

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
    <div className="relative z-[1001] bg-white">
      <header className='py-[9px] px-[14px] border-b border-b-[#F2F2F2] text-md font-bold bg-white fixed w-full top-0 z-[1001]'>
        <div className="desktop-sec flex gap-x-2 items-center relative lg:hidden">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft />
          </button>
          <SearchMd className="absolute right-[12px]" viewBox="0 0 24 24" width='22' height='22'/>
          <input type="search" className="p-[7px] pr-10 bg-[#E6E6E6] h-[34px] rounded-[9px] font-medium w-full text-[13px] outline-none" placeholder='พิมพ์ชื่อสินค้า แบรนด์ ลักษณะสินค้า' />
        </div>
        <div className="desktop-sec gap-x-2 items-center relative hidden lg:flex">
          <SearchMd className="absolute left-[12px]" viewBox="0 0 24 24" width='22' height='22'/>
          <input type="search" className="p-[7px] pl-12 bg-[#E6E6E6] h-[34px] rounded-[9px] font-medium w-full text-[13px] outline-none" placeholder='ค้นหา' />
          <button onClick={() => navigate(-1)}>
            <XClose />
          </button>
        </div>
      </header>
      <main className="mt-[49px] desktop-sec">
        <section className="py-5 px-5 box-content">
          <div className="flex justify-between items-center">
            <h2 className="header-title">การค้นหาล่าสุด</h2>
            <div className={`text-[#00B14F] text-xs`} style={haveLatestSearches ? showClearSearch : hideClearSearch} onClick={() => {
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

        <section className="pt-5 pb-[30px] px-5 box-content">
          <h2 className="header-title">หรือคุณต้องการสิ่งนี้</h2>

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
          <div className='mt-[22px] px-5 box-content'>
            <Link to='/viewed-products'>
              <h2 className='header-title flex items-center mb-[14px] leading-6'>
                สินค้าที่ดูล่าสุด
                <SfIconArrowForward className="w-[18px] text-black ml-2"/>
              </h2>
            </Link>
            <div className="flex overflow-x-auto gap-x-[14px] mx-auto">
              {(products ?? []).map((product) => (
                <ProductCard
                  key={product.item_code}
                  desc={product.item_group}
                  title={product.item_name}
                  productId={product.name}
                  itemCode={product.item_code}
                  price={product.formatted_price}
                  thumbnail={product.website_image ? `${import.meta.env.VITE_ERP_URL}${product.website_image}` : "https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/sneakers.png"}/>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}