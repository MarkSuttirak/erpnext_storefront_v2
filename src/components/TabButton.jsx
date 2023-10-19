import { useState } from "react"

export default function TabButton({isActive, title, totalTabs, onClick}){
  const tabsWidth = `${100 / totalTabs}%`
  return (
    <>
      <button onClick={onClick} className="border-b border-b-[#E3E3E3]" style={{width:tabsWidth}}>
        <span className='p-4 inline-block'>{title}</span>
          {isActive && (
          <div className="w-full h-[2px] bg-black border-anim mt-[-2px]"></div>
        )}
      </button>
    </>
  )
}