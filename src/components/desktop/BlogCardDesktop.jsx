import { Link } from "react-router-dom";
import { Calendar } from "@untitled-ui/icons-react";

export default function BlogCardDesktop({title, image, date, link, category, ratio}){
  return (
    <Link to={link}>
      <img src={`${import.meta.env.VITE_ERP_URL}${image}`} className={`rounded-md object-cover w-full`} style={{aspectRatio:ratio}}/>

      <div className='mt-6'>
        <h2 className="text-[#8A8A8A] text-sm mb-1">{category}</h2>
        <h1 className={`text-[#333333] font-bold text-[20px]`}>{title}</h1>
        <p className='text-[#8A8A8A] text-sm flex items-center gap-x-1 mt-4'><Calendar viewBox="0 0 24 24" width='13' height='13'/>{date}</p>
      </div>
    </Link>
  )
}