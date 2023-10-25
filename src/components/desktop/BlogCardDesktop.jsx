import { Link } from "react-router-dom";
import { Calendar } from "@untitled-ui/icons-react";
import { useFrappeGetDocCount } from "frappe-react-sdk";

export default function BlogCardDesktop({title, image, date, link, category}){
  const { data } = useFrappeGetDocCount("Blog Post", 
    [['post_display', '=', 'storefront']]
  )

  console.log(data)
  return (
    <Link to={link} className={`${data < 2 ? 'flex gap-x-6' : null}`}>
      <img src={`${import.meta.env.VITE_ERP_URL}${image}`} className={`rounded-md aspect-[16/9] object-cover ${data < 2 ? 'w-[60%]' : 'w-full'}`}/>

      <div className='mt-6'>
        <h2 className="text-[#8A8A8A] text-sm mb-2">{category}</h2>
        <h1 className={`text-[#333333] font-bold ${data < 2 ? 'text-[24px]' : 'text-[20px]'}`}>{title}</h1>
        <p className='text-[#8A8A8A] text-sm flex items-center gap-x-1 mt-4'><Calendar viewBox="0 0 24 24" width='13' height='13'/>{date}</p>
      </div>
    </Link>
  )
}