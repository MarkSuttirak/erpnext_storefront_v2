import { useState } from "react"
import chevronDropdown from '../img/chevron-right.svg'

const districts = ['สวนหลวง','บางกะปิ','สาทร','ลาดกระบัง','บางนา','พระโขนง','วัฒนา','ห้วยขวาง','พระนคร'];
const provinces = ['กรุงเทพมหานคร','ปทุมธานี','สมุทรปราการ']
const taxRequestType = ['บุคคลธรรมดา','นิติบุคคล']

export default function TaxInvoiceRequest(){
  const [isTaxRequestChecked, setIsTaxRequestChecked] = useState(false)

  return (
    <>
      <label htmlFor='tax-request' className='flex items-center gap-x-[14px] my-6'>
        <input type='checkbox' name='tax-request' id='tax-request' className='product-type-input' onClick={(e) => {e.target.checked ? setIsTaxRequestChecked(true) : setIsTaxRequestChecked(false)}}/>
        <span className='product-type-checkbox'/>
        ต้องการใบกำกับภาษี
      </label>
      
      {isTaxRequestChecked && (
        <form className='flex flex-col gap-y-5 w-full'>
          <div className='flex flex-col w-full'>
            <label htmlFor='tax-request-type' className='text-[#333333] text-sm font-bold'>ประเภทใบกำกับภาษี</label>
            <select name="tax-request-type" id='tax-request-type' className='form-input mt-[11px] appearance-none' placeholder="-- Select --" style={{backgroundImage:"url(" + chevronDropdown + ")",backgroundPosition:"right 0.5rem center",backgroundRepeat:"no-repeat"}}>
              {taxRequestType.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className='flex flex-col'>
            <label htmlFor='name' className='text-[#333333] text-sm font-bold'>ชื่อ - นามสกุล</label>
            <input className='form-input mt-[11px]' name='first_name' id='name'/>
          </div>

          <div className='flex flex-col'>
            <label htmlFor='email' className='text-[#333333] text-sm font-bold'>
              อีเมล
              <span className="text-[#8A8A8A] text-xs font-normal inline-block ml-[10px]">(สำหรับส่งข้อมูล)</span>
            </label>
            <input className='form-input mt-[11px]' name='email' type='email' id='email'/>
          </div>

          <div className='flex flex-col'>
            <label htmlFor='tax-number' className='text-[#333333] text-sm font-bold'>หมายเลขประจำตัวผู้เสียภาษี</label>
            <input className='form-input mt-[11px]' name='tax-number' id='tax-number'/>
          </div>

          <div className='flex flex-col'>
            <label htmlFor='address' className='text-[#333333] text-sm font-bold'>ที่อยู่ (ห้องเลขที่, ตึก, ถนน)</label>
            <input className='form-input mt-[11px]' name='address' id='address'/>
          </div>

          <div className='lg:flex lg:gap-x-3'>
            <div className='flex flex-col w-full'>
              <label htmlFor='state'>จังหวัด</label>
              <select name="state" id='state' className='form-input mt-[11px] appearance-none' style={{backgroundImage:"url(" + chevronDropdown + ")",backgroundPosition:"right 0.5rem center",backgroundRepeat:"no-repeat"}}>
                {provinces.map((province) => (
                  <option key={province} value={province}>{province}</option>
                ))}
              </select>
            </div>
            <div className='flex flex-col w-full'>
              <label htmlFor='city'>เมือง / เขต</label>
              <select name="city" id='city' className='form-input mt-[11px] appearance-none' style={{backgroundImage:"url(" + chevronDropdown + ")",backgroundPosition:"right 0.5rem center",backgroundRepeat:"no-repeat"}}>
                {districts.map((district) => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
            </div>
          </div>

          <div className='lg:flex lg:gap-x-3'>
            <div className='flex flex-col w-full'>
              <label htmlFor='pincode'>รหัสไปรษณีย์</label>
              <input name="pincode" id='pincode' className='form-input mt-[11px]'/>
            </div>
            <div className='flex flex-col w-full'>
              <label htmlFor='phone'>เบอร์โทรศัพท์</label>
              <input className='form-input mt-[11px]' id='phone' name='phone' type='tel'/>
            </div>
          </div>
        </form>
      )}
    </>
  )
}