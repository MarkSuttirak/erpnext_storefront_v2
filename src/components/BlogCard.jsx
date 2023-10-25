import { Link } from "react-router-dom";
import { Calendar } from "@untitled-ui/icons-react";

export default function BlogCard({title, image, date, link, category}){
  return (
    <Link to={link} className="w-[300px]">
      <img src={`${import.meta.env.VITE_ERP_URL}${image}`} className="rounded-md min-w-[300px] aspect-[3/2] object-cover"/>
      <h2 className="text-[#8A8A8A] text-sm mb-2 mt-4">{category}</h2>
      <h1 className='whitespace-normal text-[#1C1C1C] text-sm font-bold'>{title}</h1>

      <p className='text-[#8A8A8A] mt-[5px] text-xs flex items-center gap-x-1'>
        <Calendar viewBox="0 0 24 24" width='13' height='13'/>{date}
      </p>
    </Link>
  )
}