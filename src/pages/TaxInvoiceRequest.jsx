import { Link } from "react-router-dom";
import { ShoppingBag01, ArrowLeft } from "@untitled-ui/icons-react";

const TaxInvoiceRequest = () => {
  return (
    <>
      <header className={`p-[14px] border-b border-b-[#F2F2F2] text-md font-bold bg-white flex justify-between items-center fixed w-full top-0 z-[999]`}>
        <div className="flex items-center gap-x-[7px]">
          <Link to='/shop/search'>
            <ArrowLeft />
          </Link>
          ขอใบกำกับภาษี
        </div>

        <div className="flex items-center">
          <button className="px-2" onClick={() => setIsOpen(true)}>
            <ShoppingBag01 viewBox='0 0 24 24' width="22" height="22"/>
          </button>
        </div>
      </header>
      <main className="p-5">
        <form className='flex flex-col gap-y-5 mt-[53px]'>
          <div className='flex flex-col'>
            <label htmlFor='name'>ชื่อ</label>
            <input className='border border-[#E3E3E3] rounded-[8px] outline-none py-2 px-3 mt-[11px]' name='first_name' id='name'/>
          </div>

          <div className='flex flex-col'>
            <label htmlFor='surname'>นามสกุล</label>
            <input className='border border-[#E3E3E3] rounded-[8px] outline-none py-2 px-3 mt-[11px]' name='last_name' id='surname'/>
          </div>

          <div className='flex flex-col'>
            <label htmlFor='email'>
              อีเมล
              <span className="text-[#8A8A8A] text-xs inline-block ml-[10px]">(สำหรับส่งข้อมูล)</span>
            </label>
            <input className='border border-[#E3E3E3] rounded-[8px] outline-none py-2 px-3 mt-[11px]' name='email' type='email' id='email'/>
          </div>

          <div className='flex flex-col'>
            <label htmlFor='phone'>เบอร์โทรศัพท์</label>
            <input className='border border-[#E3E3E3] rounded-[8px] outline-none py-2 px-3 mt-[11px]' name='phone' id='phone'/>
          </div>

          <div className='flex flex-col'>
            <label htmlFor='birth_date'>วัน/เดือน/ปีเกิด</label>
            <input
              className='border border-[#E3E3E3] rounded-[8px] outline-none py-2 px-3 mt-[11px]'
              type='date'
              name='birth_date'
            />
          </div>
          <footer className="w-full">
            <button type="submit" className={`block mt-5 w-1/2 text-white rounded-[9px] p-3 w-full flex items-center justify-center gap-x-4 inter bg-[#111111]`} style={{ fontFamily: "Eventpop" }}>
              ส่งคำขอ
            </button>
          </footer>
        </form>
      </main>
    </>
  )
}

export default TaxInvoiceRequest;