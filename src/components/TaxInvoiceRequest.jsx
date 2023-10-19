import { useState } from "react"

export default function TaxInvoiceRequest(){
  const [isTaxRequestChecked, setIsTaxRequestChecked] = useState(false)

  return (
    <>

      <form className='flex flex-col gap-y-5 w-full'>
        <div className='flex flex-col'>
          <label htmlFor='name' className='text-[#333333] text-sm font-bold'>ชื่อ - นามสกุล</label>
          <input className='form-input mt-[11px]' name='first_name' id='name'/>
        </div>

        <div className='flex flex-col'>
          <label htmlFor='email' className='text-[#333333] text-sm font-bold'>
            อีเมล
            <span className="text-[#8A8A8A] text-xs inline-block ml-[10px]">(สำหรับส่งข้อมูล)</span>
          </label>
          <input className='form-input mt-[11px]' name='email' type='email' id='email'/>
        </div>

        <div className='flex flex-col'>
          <label htmlFor='phone' className='text-[#333333] text-sm font-bold'>เบอร์โทรศัพท์</label>
          <input className='form-input mt-[11px]' name='phone' id='phone'/>
        </div>

        <div className='flex flex-col'>
          <label htmlFor='birth_date' className='text-[#333333] text-sm font-bold'>วัน/เดือน/ปีเกิด</label>
          <input className='form-input mt-[11px]' name='phone' id='phone'/>
        </div>
      </form>
    </>
  )
}