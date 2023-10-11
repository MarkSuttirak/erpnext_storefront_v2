import { Fragment, useRef, useState } from 'react'
import TitleHeader from '../components/TitleHeader'
import { useFrappeGetDocList } from 'frappe-react-sdk';
import { Sale04 } from '@untitled-ui/icons-react';
import DesktopSidebar from '../components/DesktopSidebar';

const MyCoupon = () => {
  const [currentSec, setCurrentSec] = useState(1)

  const { data:canUseCoupon } = useFrappeGetDocList('Coupon Code', {
    fields: ['name', 'coupon_name', 'used', 'valid_upto', 'coupon_code', 'description', 'coupon_type', 'coupon_image'],
    filters: [['used', '=', '0']]
  })

  const { data:usedCoupon } = useFrappeGetDocList('Coupon Code', {
    fields: ['name', 'coupon_name', 'used', 'valid_upto', 'coupon_code', 'description', 'coupon_type', 'coupon_image'],
    filters: [['used', '=', '1']]
  })

  const CouponSheet = ({proTitle, date, used, image, type}) => {
    return (
      <>
        <div className='border-b border-b-[#E3E3E3] flex relative lg:border lg:border-[#E3E3E3] lg:rounded-lg w-full'>
          <div className='p-[18px] m-auto max-w-[140px] min-w-[140px] shrink-[4] flex justify-center'>
            {image ? <img src={`${import.meta.env.VITE_ERP_URL}${image}`} className='rounded-[4px]'/> : <Sale04 color={`${used === 1 ? '#424242' : '#005626'}`}/>}
          </div>
          <div className='flex flex-col align-between my-6 pr-6 grow-[2]'>
            <div>
              <p className={`px-[10px] py-1 text-[10px] mb-[6px] inline-block rounded-[99px] font-bold ${used === 1 ? 'bg-[#F0F0F0] text-[#8A8A8A]' : 'bg-[#E9F6ED] text-[#00B14F]'}`}>{type}</p>
              <h2 className='text-md text-[#333333] font-bold'>{proTitle}</h2>
            </div>
            <div className='flex justify-between mt-[9px]'>
              <p className='text-[#989898] text-xs'>ใช้ได้ถึง {date}</p>
              <p className={`text-xs font-bold ${used === 1 ? "text-[#8A8A8A]" : "text-[#00B14F]"}`}>ใช้เลย</p>
            </div>
          </div>
        </div>
      </>
    )
  }
  return (
    <>
      {/* header for mobile version */}
      <div className='lg:hidden'>
        <TitleHeader title="คูปองของฉัน" link="/my-account" />
      </div>
      <main className='p-5 lg:pt-10 main-margintop lg:max-w-[1200px] mx-auto lg:flex'>
        <DesktopSidebar />
        <div className='w-full'>
          <h2 className='text-[#333333] text-[22px] font-bold'>คูปองของฉัน</h2>
          <div className='block m-auto lg:my-[30px]'>
            <button className='w-1/2' onClick={() => setCurrentSec(1)}>
              <span className='p-4 inline-block'>คูปองที่ใช้ได้</span>
              {currentSec === 1 && (
                <div className="w-full h-[2px] bg-black border-anim"></div>
              )}
            </button>
            <button className='w-1/2' onClick={() => setCurrentSec(2)}>
              <span className='p-4 inline-block'>คูปองที่ใช้ไปแล้ว</span>
              {currentSec === 2 && (
                <div className="w-full h-[2px] bg-black border-anim"></div>
              )}
            </button>
          </div>

          {currentSec === 1 && (
            <div className='flex flex-col lg:grid lg:grid-cols-2 lg:gap-x-[30px] lg:gap-y-5'>
              {(canUseCoupon ?? []).map((c) => 
                <CouponSheet proTitle={c.coupon_name} date={c.valid_upto} used={c.used} image={c.coupon_image} type={c.coupon_type}/>
              )}
              {/* <CouponSheet proTitle='ลด 25%' code='PAY25TH' desc='เมื่อช้อป 1,499.00 ลดถึง 950' date='14 July 2023' used={false}/>
              <CouponSheet proTitle='ลด 25%' code='PAY25TH' desc='เมื่อช้อป 1,499.00 ลดถึง 950' date='14 July 2023' used={false}/>
              <CouponSheet proTitle='ลด 25%' code='PAY25TH' desc='เมื่อช้อป 1,499.00 ลดถึง 950' date='14 July 2023' used={false}/> */}
            </div>
          )}

          {currentSec === 2 && (
            <div className='flex flex-col lg:grid lg:grid-cols-2 lg:gap-x-[30px] lg:gap-y-5'>
              {(usedCoupon ?? []).map((c) => 
                <CouponSheet proTitle={c.coupon_name} date={c.valid_upto} used={c.used} image={c.coupon_image} type={c.coupon_type}/>
              )}
              {/* <CouponSheet proTitle={c.coupon_name} code={c.coupon_code} desc={c.description} date={c.valid_upto} used={c.used}/> */}
              <CouponSheet proTitle='ลด 25%' date='14 July 2023' used={1} image='' type='Test'/>
              <CouponSheet proTitle='ลด 25%' date='14 July 2023' used={1} image='' type='Test'/>
            </div>
          )}
        </div>
      </main>
    </>
  )
}

export default MyCoupon