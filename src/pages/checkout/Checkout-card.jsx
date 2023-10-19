import { useState } from "react";

export default function CheckoutCard(){
  const tooltipHide = {
    visibility:"hidden",
    opacity:"0",
    transform:"translateY(9px)",
    transition:"all 300ms"
  }

  const tooltipShow = {
    visibility:"visible",
    opacity:"1",
    transform:"translateY(6px)",
    filter:"drop-shadow(0 12px 16px #10182814)",
    transition:"all 300ms",
  }

  const handleClickBack = () => {
    setCurrentPage('checkout')
  }

  const [showTooltipCVV, setShowTooltipCVV] = useState(tooltipHide);
  const [modified, setModified] = useState(false)

  return (
    <>
      <header className='p-[14px] border-b border-b-[#F2F2F2] flex gap-x-[7px] text-md font-bold bg-white'>
        <button onClick={handleClickBack} type="button">
          <ArrowLeft />
        </button>
        เพิ่มบัตรเครดิตการ์ด
      </header>
      <main className='p-5'>
        <form action="#" className='flex flex-col gap-y-5'>
          <div className='flex flex-col'>
            <label htmlFor='card-number'>หมายเลขบัตร</label>
            <input className='border border-[#E3E3E3] rounded-[8px] outline-none py-2 px-3 mt-[11px]' id='card-number' name='card-number' type='text' placeholder='0-000-000-00-0-0'/>
          </div>

          <div className='flex flex-col'>
            <label htmlFor='card-name'>ชื่อที่แสดงบนบัตร</label>
            <input className='border border-[#E3E3E3] rounded-[8px] outline-none py-2 px-3 mt-[11px]' id='card-name' name='card-name' type='text'/>
          </div>

          <div className='flex gap-x-[11px]' style={{width:"calc(100% - 11px)"}}>
            <div className='flex flex-col w-1/2'>
              <label htmlFor='expiry-date'>วันหมดอายุ</label>
              <input className='border border-[#E3E3E3] rounded-[8px] outline-none py-2 px-3 mt-[11px]' id='expiry-date' name='expiry-date' type='text' placeholder='12/25'/>
            </div>
            <div className='flex flex-col w-1/2'>
              <label htmlFor='cvv'>CVV</label>
              <input className='border border-[#E3E3E3] rounded-[8px] outline-none py-2 px-3 mt-[11px]' id='cvv' name='cvv' type='text'/>
              <div className='absolute right-[31px] translate-y-[47px]' onMouseEnter={() => setShowTooltipCVV(tooltipShow)} onMouseLeave={() => setShowTooltipCVV(tooltipHide)}>
                <HelpCircle color="#333333" viewBox='0 0 24 24' width='18' height='18'/>
              </div>
              <div className='absolute right-[11px]' style={showTooltipCVV}>
                <div className='bg-[#8A8A8A] px-3 py-2 rounded-[12px] text-white right-[18px] z-[9]'>
                  <p className='text-xs'>เลข 3 ตัว หลังบัตรของคุณ</p>
                </div>
                <div className='w-[12px] h-[12px] inline-block bg-[#8A8A8A] z-[6] rounded-[1px] rotate-45 relative bottom-[12px] left-[127px]'/>
              </div>
            </div>
          </div>
        </form>
      </main>
      <footer className='p-5 absolute bottom-0 w-full'>
        <button onClick={clickToSelectPayment} type='button' className={`block mt-[14px] w-1/2 text-white rounded-[9px] p-3 text-center w-full bg-[#111111] border border-[#111111]`}>บันทึกข้อมูลบัตร</button>
      </footer>
    </>
  )
}