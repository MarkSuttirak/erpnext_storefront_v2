import { Link } from "react-router-dom"

const CouponSheet = ({proTitle, date, used, image, type, link}) => {
  return (
    <Link to={link}>
      <div className='border-b border-b-[#E3E3E3] flex relative lg:border lg:border-[#E3E3E3] lg:rounded-lg w-full'>
        <div className='p-[18px] m-auto max-w-[140px] min-w-[140px] shrink-[4] flex justify-center items-center'>
          {image ? <img src={`${import.meta.env.VITE_ERP_URL}${image}`} className='rounded-[4px] h-[90%] object-cover'/> : <Sale04 color={`${used === 1 ? '#424242' : '#005626'}`}/>}
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
    </Link>
  )
}

export default CouponSheet