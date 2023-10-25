import { Link } from "react-router-dom";

export default function PromotionCardDesktop({title, image, desc, link, ratio}){
  return (
    <Link to={link} className="w-full">
      <div className='pro-card-desktop' style={{aspectRatio:ratio}}>
        <img width='100%' src={`${import.meta.env.VITE_ERP_URL}${image}`} />
        <div className='pro-card-desktop-info'>
          <h1 className='text-white'>{title}</h1>
          <p className='text-white text-sm'>{desc}</p>
        </div>
      </div>
    </Link>
  )
}