import { useParams } from 'react-router-dom'
import { useFrappeGetDoc } from 'frappe-react-sdk'
import TitleHeader from '../components/TitleHeader';
import CouponDesc from '../components/coupon/CouponDesc'
import Breadcrumbs from '../components/Breadcrumbs';

export default function MyCouponDetails(){
  const { id } = useParams()
  const { data } = useFrappeGetDoc('Coupon Code', id, {
    fields: ['name', 'coupon_name', 'used', 'valid_upto', 'coupon_code', 'description', 'coupon_type', 'coupon_image', 'condition'],
  })

  const pages = [
    {
      name: 'คูปองของฉัน',
      href: '/my-coupon'
    },
    {
      name: data?.coupon_name,
      href: ''
    }
  ]

  return (
    <>
      <TitleHeader title="ข้อมูลคูปอง" link="/my-coupon"/>
      <main className='main-margintop p-5 desktop-sec'>
        <Breadcrumbs pages={pages}/>
        <div className='lg:mt-[42px]'>
          <CouponDesc proTitle={data?.coupon_name} code={data?.coupon_code} desc={data?.description} date={data?.valid_upto} condition={data?.condition}/>
        </div>
      </main>
    </>
  )
}