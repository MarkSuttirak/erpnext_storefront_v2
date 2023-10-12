import { Link } from "react-router-dom";
import { SfIconCalendarToday } from "@storefront-ui/react";

const PromotionCardDesktop = ({title, image, date, link}) => {
  return (
    <Link to={link}>
      <div className='relative w-full max-h-[400px] rounded-[10px] overflow-hidden pro-card-desktop'>
        <img width='100%' src={`${import.meta.env.VITE_ERP_URL}${image}`} />
        <div className='absolute p-6 w-full rounded-b-[10px] pro-card-desktop-info' style={{background:"linear-gradient(103deg, rgba(35, 35, 35, 0.42) 41.01%, rgba(0, 0, 0, 0.25) 113.14%)",backdropFilter: "blur(8px)"}}>
          <h1 className='text-white'>{title}</h1>
          <p className='text-white'><SfIconCalendarToday className="w-[11px] mr-[6px]"/>{date}</p>
        </div>
      </div>
    </Link>
  )
}

export default PromotionCardDesktop;