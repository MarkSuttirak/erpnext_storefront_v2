import { Fragment, useRef, useState } from 'react'
import TitleHeader from '../components/TitleHeader'
import { useFrappeGetDocList } from 'frappe-react-sdk';

const MyCoupon = () => {
  const [currentSec, setCurrentSec] = useState(1)

  const { data:canUseCoupon } = useFrappeGetDocList('Coupon Code', {
    fields: ['name', 'coupon_name', 'used', 'valid_upto', 'coupon_code', 'description'],
    filters: [['used', '=', '0']]
  })

  const { data:usedCoupon } = useFrappeGetDocList('Coupon Code', {
    fields: ['name', 'coupon_name', 'used', 'valid_upto', 'coupon_code', 'description'],
    filters: [['used', '=', '1']]
  })

  const CouponSheet = ({proTitle, code, desc, date, used}) => {
    return (
      <>
        <div className='border border-[#D6D6D6] rounded-[8px] flex bg-[#FBFBFB] relative'>
          <div className='p-6 m-auto w-[30%]'>
            <h2 className='text-[23px] text-[#01A449] text-center font-bold'>{proTitle}</h2>
          </div>
          <div className='flex flex-col align-between my-6 px-6 border-l-[2px] border-l-[#6666633] border-l-dashed w-[70%]'>
            <div>
              <h2 className='text-md text-[#333333] font-bold'>โค้ด: {code}</h2>
              <div dangerouslySetInnerHTML={{__html:desc}} className='text-[#424242] text-xs font-medium'/>
            </div>
            <div className='flex justify-between mt-6'>
              <p className='text-[#989898] text-xs'>ใช้ได้ถึง {date}</p>
              <p className={`text-xs font-bold ${used === 1 ? "text-[#D10000]" : "text-[#5B6CFFCF]"}`}>{used === 1 ? "ใช้แล้ว" : "ใช้ส่วนลด"}</p>
            </div>
          </div>
        </div>
      </>
    )
  }
  return (
    <>
      <TitleHeader title="คูปองของฉัน" link="/my-account" />
      <main className='p-5 mt-[53px]'>
        <div className='block w-[90%] m-auto'>
          <button className='my-2 w-1/2' onClick={() => setCurrentSec(1)}>
            <span className='p-4 inline-block'>คูปองที่ใช้ได้</span>
            {currentSec === 1 && (
              <div className="w-full h-[2px] bg-black border-anim"></div>
            )}
          </button>
          <button className='my-2 w-1/2' onClick={() => setCurrentSec(2)}>
            <span className='p-4 inline-block'>คูปองที่ใช้ไปแล้ว</span>
            {currentSec === 2 && (
              <div className="w-full h-[2px] bg-black border-anim"></div>
            )}
          </button>
        </div>

        {currentSec === 1 && (
          <div className='flex flex-col gap-y-5 mt-6'>
            {(canUseCoupon ?? []).map((c) => 
              <CouponSheet proTitle={c.coupon_name} code={c.coupon_code} desc={c.description} date={c.valid_upto} used={c.used}/>
            )}
          </div>
        )}

        {currentSec === 2 && (
          <div className='flex flex-col gap-y-5 mt-6'>
            {(usedCoupon ?? []).map((c) => 
              <CouponSheet proTitle={c.coupon_name} code={c.coupon_code} desc={c.description} date={c.valid_upto} used={c.used}/>
            )}
          </div>
        )}
      </main>
    </>
  )
}

export default MyCoupon