import React from 'react'
import TitleHeader from "../../components/TitleHeader"
import TitleHeaderShop from '../../components/TitleHeaderShop'
import { useFrappeGetDocList } from 'frappe-react-sdk'

export default function ShopPageFilter({setCurrentPage}){
  const { data:dataItemCate, isLoading } = useFrappeGetDocList('Item Category', {
    fields: ['name', 'item_category']
  })

  const FilterRadio = ({key, text}) => {
    return (
      <label htmlFor={key} className='flex py-5 lg:py-[7px] w-full items-center gap-x-[14px] font-bold text-sm'>
        <input type="radio" id={key} name="shop-filter" className='shop-filter-check'/>
        <span className='shop-filter-radios lg:hidden' />
        {text}
      </label>
    )
  }

  const handleClickToShop = () => {
    setCurrentPage('shop')
  }

  return (
    <>
      <div className='lg:hidden'>
        <TitleHeaderShop onClick={handleClickToShop} title="ประเภทสินค้า" />
        <main className="p-5 mt-[53px]">
          <FilterRadio key="" text="All" />
          {(dataItemCate ?? []).map((list) => 
            <FilterRadio key={list.name} text={list.item_category} />
          )}
        </main>
        <footer className='p-5'>
          <button onClick={() => setOpenSuccess(true)} className={`block mt-[14px] w-1/2 text-white rounded-[9px] p-3 text-center w-full bg-[#111111] border border-[#111111]`}>ค้นหา</button>
        </footer>
      </div>

      <div className="hidden lg:block w-[300px]">
        {(dataItemCate ?? []).map((list) => 
          <FilterRadio key={list.name} text={list.item_category} />
        )}
        {isLoading && (
          <h2>Loading...</h2>
        )}
      </div>
    </>
  )
}