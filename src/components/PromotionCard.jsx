import { Link } from "react-router-dom";
import { Calendar } from "@untitled-ui/icons-react";

export default function PromotionCard({title, image, date, link}){
  return (
    <Link to={link} className="min-w-[180px] max-w-[180px]">
      <img src={`${import.meta.env.VITE_ERP_URL}${image}`} className='rounded-md'/>
      <h2 className='mt-4 text-[#1C1C1C] text-sm font-bold'>{title}</h2>

      <p className='text-[#8A8A8A] mt-[10px] text-xs flex items-center gap-x-1'>
        <Calendar viewBox="0 0 24 24" width='13' height='13'/>
        {date}
      </p>
    </Link>
  )
}