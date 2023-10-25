import { Link } from "react-router-dom";
import { Calendar } from "@untitled-ui/icons-react";

export default function PromotionCardDesktop({title, image, date, link, ratio}){
  return (
    <Link to={link} className="w-full">
      <div className='pro-card-desktop' style={{aspectRatio:ratio}}>
        <img width='100%' src={`${import.meta.env.VITE_ERP_URL}${image}`} />
        <div className='pro-card-desktop-info'>
          <h1 className='text-white'>{title}</h1>
          <p className='text-white flex items-center gap-x-1'><Calendar viewBox="0 0 24 24" width='13' height='13'/>{date}</p>
        </div>
      </div>
    </Link>
  )
}