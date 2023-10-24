import FooterMenu from "../../components/FooterMenu"
import { ShoppingBag01, ChevronRight, SearchMd } from "@untitled-ui/icons-react";
import { Link } from 'react-router-dom'
import { useFrappeGetDocList } from "frappe-react-sdk";
import { useState } from "react";

export default function CategoryPage(){
  const { data:dataItemCate } = useFrappeGetDocList('Item Category', {
    fields: ['name', 'item_category']
  })

  const [selectedCate, setSelectedCate] = useState('');

  const { data:dataItemSubcateAll } = useFrappeGetDocList('Item Subcategory', {
    fields: ['name', 'subcategory'],
  })

  const { data:dataItemSubcate } = useFrappeGetDocList('Item Subcategory', {
    fields: ['name', 'subcategory'],
    filters: [['parent_category', '=', selectedCate]],
  })

  return (
    <>
      <header className='py-[9px] px-[14px] border-b border-b-[#F2F2F2] text-md font-bold bg-white flex gap-x-2 items-center'>
        <Link to='/search' className="bg-[#E6E6E6] font-medium w-full text-[13px] px-2 py-[7px] rounded-[9px] flex items-center gap-x-2 text-[#8A8A8A]">
          <SearchMd viewBox='0 0 24 24' width='22' height='22' color='#000000'/>
          พิมพ์ชื่อสินค้า แบรนด์ ลักษณะสินค้า
        </Link>
        <Link to='/cart'>
          <ShoppingBag01 viewBox='0 0 24 24' width="22" height="22"/>
        </Link>
      </header>
      <header className='bg-black text-white text-center py-[10px]'>
        สมาชิกใหม่รับ ของขวัญฟรี กดรับเลย !! 🎁
      </header>
      <main>
        <nav className="border-b border-b-[#F2F2F2] overflow-auto">
          <ul className="flex">
            <li className="px-10 py-5" onClick={() => setSelectedCate('')}>ALL</li>
            {(dataItemCate ?? []).map((d) => 
              <li className="px-10 py-5 cursor-pointer" key={d.name} onClick={() => setSelectedCate(d.name)}>{d.item_category}</li>
            )}
          </ul>
        </nav>
        <div className="flex relative">
          <div className="flex flex-col grow">
            {(selectedCate === "" ? dataItemSubcateAll : dataItemSubcate)?.map((cate) => {
              return (
                <Link to='/shop' className='flex justify-between items-center px-5 py-[17px] w-full border-b border-b-[#E3E3E3]'>
                  <div className='flex gap-x-[10px]'>
                    {cate.subcategory}
                  </div>
                  <div>
                    <ChevronRight />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </main>
      <FooterMenu active={1}/>
    </>
  )
}