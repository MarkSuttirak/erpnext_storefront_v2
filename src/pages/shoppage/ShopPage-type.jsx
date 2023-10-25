import React, { useCallback, useEffect, useRef, useState } from 'react'
import Accordion from '../../components/Accordion'
import { Link } from 'react-router-dom'
import TitleHeaderShop from '../../components/TitleHeaderShop'
import { useFrappeGetDocList } from 'frappe-react-sdk'

export default function ShopPageType({min, max, onChange, setCurrentPage, selectedCate}){
  const [accordionActiveOne, setAccordionActiveOne] = useState(false);
  const [accordionActiveTwo, setAccordionActiveTwo] = useState(false);
  const [accordionActiveThree, setAccordionActiveThree] = useState(false);

  const { data:dataItemSubcateAll } = useFrappeGetDocList('Item Subcategory', {
    fields: ['name', 'subcategory'],
  })

  const { data:dataItemSubcate } = useFrappeGetDocList('Item Subcategory', {
    fields: ['name', 'subcategory'],
    filters: [['parent_category', '=', selectedCate]],
  })

  const sizeRef = useRef(null);

  const handleClickToShop = () => {
    setCurrentPage('shop')
  }

  const productSizes = [36, 37, 38, 39, 40, 41]

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

  const priceFilters = ['฿ 0 - ฿ 200','฿ 200 - ฿ 800','฿ 800 - ฿ 1000','฿ 1000 - ฿ 5000']

  const itemLists = [
    {
      title:(
        <div className='flex justify-between w-full pr-[14px] items-center'>
          <h2>ประเภทสินค้า</h2>
          <div className={`text-[#5B6CFF] text-xs`} style={accordionActiveOne ? showClearSearch : hideClearSearch} onClick={() => {
            setAccordionActiveOne(false)
          }}>เคลียร์การค้นหา</div>
        </div>
      ),
      content:(
        <div className='flex flex-col gap-y-[30px] w-full'>
          {(dataItemSubcateAll ?? []).map((type) => 
            <label htmlFor={type.name} className='flex items-center gap-x-[14px] text-xs'>
              <input type='checkbox' name='product-type' id={type.name} className='product-type-input' onClick={(e) => {e.target.checked ? setAccordionActiveOne(true) : setAccordionActiveOne(false)}}/>
              <span className='product-type-checkbox'/>
              {type.name}
            </label>
          )}
        </div>
      )
    },
    {
      title:(
        <div className='flex justify-between w-full pr-[14px] items-center'>
          <h2>ไซส์</h2>
          <div className={`text-[#5B6CFF] text-xs`} style={accordionActiveTwo ? showClearSearch : hideClearSearch} onClick={() => {
            setAccordionActiveTwo(false);
          }}>เคลียร์การค้นหา</div>
        </div>
      ),
      content:(
        <div className='flex gap-x-4 gap-y-3 flex-wrap'>
          {productSizes.map((size) => 
            <label htmlFor={size} className='size-btn'>
              <input type="checkbox" name="size" id={size} className='size-input' ref={sizeRef} onClick={(e) => {e.target.checked ? setAccordionActiveTwo(true) : setAccordionActiveTwo(false)}}/>
              <span className='size-text'>{size}</span>
            </label>
          )}
        </div>
      )
    },
    {
      title:(
        <div className='flex justify-between w-full pr-[14px] items-center'>
          <h2>ราคา</h2>
          <div className={`text-[#5B6CFF] text-xs`} style={accordionActiveThree ? showClearSearch : hideClearSearch} onClick={() => {
            setAccordionActiveThree(false);
          }}>เคลียร์การค้นหา</div>
        </div>
      ),
      content:(
        <div className='flex flex-col gap-y-[30px] w-full'>
          {priceFilters.map((price) => 
            <label htmlFor={price} className='flex items-center gap-x-[14px] text-xs'>
              <input type='checkbox' name='price-filter' id={price} className='product-type-input' onClick={(e) => {e.target.checked ? setAccordionActiveThree(true) : setAccordionActiveThree(false)}}/>
              <span className='product-type-checkbox'/>
              {price}
            </label>
          )}
        </div>
      )
    }
  ]
  return (
    <>
      {/* Mobile version */}
      <div className='lg:hidden'>
        <TitleHeaderShop onClick={handleClickToShop} title="ประเภทสินค้า" />
        <main className='mt-[53px]'>
          <Accordion items={itemLists}/>
        </main>
        <footer className='flex p-5 gap-x-3 absolute bottom-0 w-full'>
          <button className='w-1/2 bg-white border border-[#111111] text-[#111111] rounded-[9px] p-3 text-center'>เคลียร์การค้นหา</button>
          <button className='w-1/2 bg-[#111111] border border-[#111111] text-white rounded-[9px] p-3 text-center'>ค้นหาสินค้า</button>
        </footer>
      </div>

      {/* Desktop version */}
      <div className='hidden lg:block w-[300px]'>
        <Accordion items={itemLists}/>
      </div>
    </>
  )
}