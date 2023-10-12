import { useParams } from 'react-router-dom'
import brandLogo from '../img/logo.svg'
import { useFrappeGetDoc } from 'frappe-react-sdk'
import { ArrowRight } from '@untitled-ui/icons-react'

const MyCouponDetails = () => {
  const { id } = useParams()
  const { data } = useFrappeGetDoc('Coupon Code', id, {
    fields: ['name', 'coupon_name', 'used', 'valid_upto', 'coupon_code', 'description', 'coupon_type', 'coupon_image', 'condition'],
  })

  const CouponSheet = ({proTitle, code, desc, date, condition}) => {
    return (
      <div className='border border-[#D6D6D6] bg-[#FBFBFB] relative rounded-[12px]'>
        <div className='p-6 flex justify-between'>
          <img src={brandLogo} />
          <h2 className='text-md text-[#333333] font-bold'>โค้ด: {code}</h2>
        </div>
        <div className='flex flex-col align-between mb-6 px-6'>
          <div className='flex flex-col'>
            <h2 className='text-[21px] font-bold'>{proTitle}</h2>
            <p className='text-[#424242] text-xs font-medium'>{condition}</p>
          </div>

          <button className='flex items-center gap-x-[5px] text-[#424242] text-center mt-20'>ข้อตกลงและเงื่อนไขอื่นๆ <ArrowRight width='18'/></button>
          <div className='flex justify-between mt-6'>
            <p className='text-[#989898] text-xs'>ใช้ได้ถึง {date}</p>
          </div>
        </div>

        <div className='absolute w-[20px] h-[40px] border border-[#D6D6D6] bg-white rounded-r-[99px] left-[-1px] border-l-0 top-[35%]'></div>
        <div className='absolute w-[20px] h-[40px] border border-[#D6D6D6] bg-white rounded-l-[99px] right-[-1px] border-r-0 top-[35%]'></div>
      </div>
    )
  }

  return (
    <CouponSheet proTitle={data?.coupon_name} code={data?.coupon_code} desc={data?.description} date={data?.valid_upto} condition={data?.condition}/>
  )
}

export default MyCouponDetails