import React, { useState } from 'react'
import TitleHeaderShop from '../../components/TitleHeaderShop'
import { useFrappeGetDocList } from 'frappe-react-sdk'

export default function ShopPageFilter({setCurrentPage}){
  const [selectedCate, setSelectedCate] = useState('')
  const { data:dataItemCate, isLoading } = useFrappeGetDocList('Item Category', {
    fields: ['name', 'item_category'],
  })

  const FilterRadio = ({id, text, onChange}) => {
    return (
      <label htmlFor={id} className={`flex py-5 lg:py-[7px] w-full items-center gap-x-[14px] font-bold text-sm ${id === selectedCate ? 'text-[#111111]' : 'text-[#8A8A8A]'}`}>
        <input type="radio" id={id} name="shop-filter" className='shop-filter-check' onChange={() => onChange(id)}/>
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
          <FilterRadio key="" text="All" onChange={setSelectedCate}/>
          {(dataItemCate ?? []).map((list) => 
            <FilterRadio key={list.name} text={list.item_category} id={list.name} onChange={setSelectedCate}/>
          )}
        </main>
        <footer className='p-5'>
          <button onClick={() => setOpenSuccess(true)} className={`block mt-[14px] w-1/2 text-white rounded-[9px] p-3 text-center w-full bg-[#111111] border border-[#111111]`}>ค้นหา</button>
        </footer>
      </div>

      <div className="hidden lg:block w-[300px]">
        <FilterRadio key="" text="All" onChange={setSelectedCate}/>
        {(dataItemCate ?? []).map((list) => 
          <FilterRadio key={list.name} text={list.item_category} id={list.name} onChange={setSelectedCate}/>
        )}
        {isLoading && (
          <h2>Loading...</h2>
        )}
      </div>
    </>
  )
}