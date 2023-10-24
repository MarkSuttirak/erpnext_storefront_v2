import { useProducts } from '../../hooks/useProducts'
import { useState } from "react";
import { Link } from 'react-router-dom';
import { ArrowLeft, FilterLines, SearchMd, ShoppingBag01 } from '@untitled-ui/icons-react';
import ProductCard from '../../components/ProductCard';
import { useFrappeGetDocList } from 'frappe-react-sdk';
import FooterMenu from '../../components/FooterMenu';

export default function ShopPageMobile({setCurrentPage}){
  const { products } = useProducts()

  const { data:dataItemCate } = useFrappeGetDocList('Item Category', {
    fields: ['name', 'item_category']
  })

  const [selectedCate, setSelectedCate] = useState('');

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
          <Link to='/'>
            <ArrowLeft />
          </Link>
          สินค้า
        </div>

        <div className="flex items-center gap-x-4">
          <Link to='/search'>
            <SearchMd />
          </Link>
          <Link to='/cart'>
            <ShoppingBag01 viewBox='0 0 24 24' width="22" height="22"/>
          </Link>
        </div>
      </header>
      <header className='bg-black text-white text-center py-[10px]'>
        12.12 โปรโมชั่นทั้งเว็บไซต์
      </header>
      <nav className="border-b border-b-[#F2F2F2] overflow-auto">
        <ul className="flex">
          <li className="px-10 py-5" onClick={() => setSelectedCate('')}>ALL</li>
          {(dataItemCate ?? []).map((d) => 
            <li className="px-10 py-5 cursor-pointer" key={d.name} onClick={() => setSelectedCate(d.name)}>{d.item_category}</li>
          )}
        </ul>
      </nav>
      <main className='mb-[102px]'>
        <div className="flex items-center justify-between px-5 my-[30px]">
          <button onClick={handleClickToType} className='flex items-center gap-x-[6px]'>
            แสดงตัวกรอง
            <FilterLines viewBox='0 0 24 24' width='22' height='22'/>
          </button>
          <p className='text-xs text-[#8A8A8A]'>{products.length} ชิ้น</p>
        </div>

        <section className="grid grid-cols-2 gap-x-[14px] px-5">
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
      <FooterMenu active={1}/>
    </div>
  )
}