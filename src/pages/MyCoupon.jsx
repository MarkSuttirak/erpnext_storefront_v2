import { Fragment, useRef, useState } from 'react'
import TitleHeader from '../components/TitleHeader'
import { useFrappeGetDocList } from 'frappe-react-sdk';
import { Sale04 } from '@untitled-ui/icons-react';
import DesktopSidebar from '../components/desktop/DesktopSidebar';
import CouponSheet from '../components/CouponSheet';

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

  return (
    <>
      <TitleHeader title="คูปองของฉัน" link="/my-account" />
      <main className='p-5 lg:pt-10 main-margintop max-w-[1200px] mx-auto box-content lg:flex'>
        <DesktopSidebar />
        <div className='w-full'>
          <h2 className='header-title'>คูปองของฉัน</h2>
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
                <CouponSheet key={c.name} proTitle={c.coupon_name} date={c.valid_upto} used={c.used} image={c.coupon_image} type={c.coupon_type} link={`/my-coupon-details/${c.name}`}/>
              )}
            </div>
          )}

          {currentSec === 2 && (
            <div className='flex flex-col lg:grid lg:grid-cols-2 lg:gap-x-[30px] lg:gap-y-5'>
              {(usedCoupon ?? []).map((c) => 
                <CouponSheet key={c.name} proTitle={c.coupon_name} date={c.valid_upto} used={c.used} image={c.coupon_image} type={c.coupon_type} link={`/my-coupon-details/${c.name}`}/>
              )}
              {/* <CouponSheet proTitle={c.coupon_name} code={c.coupon_code} desc={c.description} date={c.valid_upto} used={c.used}/> */}
            </div>
          )}
        </div>
      </main>
    </>
  )
}

export default MyCoupon