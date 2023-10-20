import { Ticket02 } from "@untitled-ui/icons-react"
import { Link } from "react-router-dom"

export default function CouponSheet({proTitle, date, used, image, type, link}){
  return (
    <Link to={link}>
      <div className='border-b border-b-[#E3E3E3] flex relative lg:border lg:border-[#E3E3E3] lg:rounded-lg w-full h-full'>
        <div className='p-[18px] m-auto flex justify-center items-center'>
          {image ? <img src={`${import.meta.env.VITE_ERP_URL}${image}`} className='w-[65px] rounded-[4px] aspect-square object-cover'/> : <div className="w-[65px] h-[65px] flex items-center justify-center"><Ticket02 color={`${used === 1 ? '#424242' : '#000000'}`}/></div>}
        </div>
        <div className='flex flex-col align-between my-6 pr-6 grow-[2]'>
          <div>
            <p className={`px-[10px] py-1 text-[10px] mb-[6px] inline-block rounded-[99px] font-bold ${used === 1 ? 'bg-[#F0F0F0] text-[#8A8A8A]' : 'bg-[#E9F6ED] text-[#00B14F]'}`}>{type}</p>
            <h2 className='text-md text-[#333333] font-bold'>{proTitle}</h2>
          </div>
          <div className='flex justify-between mt-[9px]'>
            <p className='text-[#989898] text-xs'>ใช้ได้ถึง {date}</p>
            <p className={`text-xs font-bold ${used === 1 ? "text-[#8A8A8A]" : "text-[#00B14F]"}`}>ดูรายละเอียด</p>
          </div>
        </div>
      </div>
    </Link>
  )
}