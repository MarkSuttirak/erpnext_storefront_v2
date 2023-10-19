import { ArrowLeft } from '@untitled-ui/icons-react'
import { Link } from 'react-router-dom'

export default function TitleHeader({link, title, icon}){
  return (
    <header className='p-[14px] border-b border-b-[#F2F2F2] flex justify-between text-md font-bold fixed w-full bg-white top-0 z-[999] lg:hidden'>
      <div className='flex gap-x-[7px]'>
        <Link to={link}>
          <ArrowLeft />
        </Link>
        {title}
      </div>
      <div className={`${icon ? 'visible' : 'invisible'}`}>
        {icon}
      </div>
    </header>
  )
}