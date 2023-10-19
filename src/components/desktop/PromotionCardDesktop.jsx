import { Link } from "react-router-dom";
import { SfIconCalendarToday } from "@storefront-ui/react";

export default function PromotionCardDesktop({title, image, date, link, ratio}){
  return (
    <Link to={link} className="w-full">
      <div className='pro-card-desktop' style={{aspectRatio:ratio}}>
        <img width='100%' src={`${import.meta.env.VITE_ERP_URL}${image}`} />
        <div className='pro-card-desktop-info'>
          <h1 className='text-white'>{title}</h1>
          <p className='text-white'><SfIconCalendarToday className="w-[11px] mr-[6px]"/>{date}</p>
        </div>
      </div>
    </Link>
  )
}