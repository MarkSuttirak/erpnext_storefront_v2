import { Link } from "react-router-dom"
import { Home02, Grid01, Award03, User02 } from "@untitled-ui/icons-react"

export default function FooterMenu({active}){
  const Menu = ({icon, title, link, current}) => {
    return (
      <Link to={link} className={`h-[82px] flex flex-col justify-center w-full text-center items-center ${current === active ? "text-[#1BB040]" : "text-[#BBBBBB]"} text-xs gap-y-[10px]`}>
        {icon}
        {title}
      </Link>
    )
  }

  const menuLists = [
    {
      icon:(<Home02 />),
      title:"หน้าหลัก",
      link:"/",
      current:0
    },
    {
      icon:(<Grid01 />),
      title:"สินค้า",
      link:"/shop",
      current:1
    },
    {
      icon:(<Award03 />),
      title:"สะสมแต้ม",
      link:"/rewards",
      current:2
    },
    {
      icon:(<User02 />),
      title:"บัญชี",
      link:"/my-account",
      current:3
    }
  ]

  return (
    <footer className="lg:hidden h-[82px] fixed bottom-0 w-full flex bg-white border-t border-t-[#F1F1F1]">
      {menuLists.map((menu, index) => 
        <Menu icon={menu.icon} title={menu.title} link={menu.link} current={index}/>
      )}
    </footer>
  )
}