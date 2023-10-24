import { Fragment, useRef, useState } from 'react'
import TitleHeader from '../components/TitleHeader'
import { useFrappeGetDocList } from 'frappe-react-sdk';
import { Sale04 } from '@untitled-ui/icons-react';
import DesktopSidebar from '../components/desktop/DesktopSidebar';
import CouponSheet from '../components/coupon/CouponSheet';
import TabButton from '../components/TabButton';

export default function MyCoupon(){
  const [currentSec, setCurrentSec] = useState(1)

  const { data:canUseCoupon } = useFrappeGetDocList('Coupon Code', {
    fields: ['name', 'coupon_name', 'used', 'valid_upto', 'coupon_code', 'description', 'coupon_type', 'coupon_image'],
    filters: [['used', '=', '0']]
  })

  const { data:usedCoupon } = useFrappeGetDocList('Coupon Code', {
    fields: ['name', 'coupon_name', 'used', 'valid_upto', 'coupon_code', 'description', 'coupon_type', 'coupon_image'],
    filters: [['used', '=', '1']]
  })

  const titleSec = [
    {
      title:'คูปองที่ใช้ได้',
      id:1
    },
    {
      title:'คูปองที่ใช้ไปแล้ว',
      id:2
    }
  ]

  return (
    <>
      <TitleHeader title="คูปองของฉัน" link="/my-account" />
      <main className='p-5 lg:pt-10 main-margintop desktop-sec lg:flex'>
        <DesktopSidebar />
        <div className='w-full'>
          <h2 className='header-title hidden lg:block'>คูปองของฉัน</h2>
          <div className='block m-auto lg:my-[30px]'>
            {titleSec.map((t) => (
              <TabButton key={t.id} title={t.title} isActive={currentSec === t.id} onClick={() => setCurrentSec(t.id)} totalTabs={titleSec.length}/>
            ))}
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
            </div>
          )}
        </div>
      </main>
    </>
  )
}