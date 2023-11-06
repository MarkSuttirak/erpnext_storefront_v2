import { ChevronRight, Gift01, CreditCard02, AnnotationQuestion, AnnotationDots } from "@untitled-ui/icons-react";
import TitleHeader from "../../components/TitleHeader";
import silverFront from '../../img/silver-front.png'
import { Link } from "react-router-dom";
import { useState } from "react";
import coin from '../../img/coin2.svg'
import couponImage1 from '../../img/couponImage1.png';
import couponImage2 from '../../img/couponImage2.png';
import ProductCard from '../../components/ProductCard'
import { useProducts } from '../../hooks/useProducts'
import { SfIconArrowForward } from "@storefront-ui/react";
import { useUser } from '../../hooks/useUser';

export default function MemberLevel(){
  const [level, setLevel] = useState('Silver')
  const { user } = useUser()
  const { products } = useProducts()

  const helpMenu = [
    {
      icon: <Gift01 />,
      title: 'วิธีแลกของรางวัล',
      link: '/how-to-collect-rewards'
    },
    {
      icon: <CreditCard02 />,
      title: 'เงื่อนไขระดับของสมาชิก',
      link: '/member-conditions'
    },
    {
      icon: <AnnotationQuestion />,
      title: 'คำถามที่พบบ่อย',
      link: '#'
    },
    {
      icon: <AnnotationDots />,
      title: 'ติดต่อเรา',
      link: '#'
    }
  ]

  const AccountMenu = ({icon, title, link}) => {
    return (
      <Link to={link} className='flex justify-between items-center px-5 py-[17px] w-full'>
        <div className='flex gap-x-[10px] text-sm text-[#111111] items-center'>
          {icon}
          {title}
        </div>
        <div>
          <ChevronRight />
        </div>
      </Link>
    )
  }

  return (
    <>
      <TitleHeader link="/rewards" title="ระดับสมาชิก"/>
      <header className='relative mt-[53px]' style={{background:`url(${silverFront})`,height:"200px",backgroundRepeat:"no-repeat",backgroundSize:"cover"}}>
        <Link to='/member-privileges' className="flex justify-end px-[18px] py-3 gap-x-[9px] bg-[#57575780] w-full text-[13px] text-white items-center">
          สิทธิพิเศษจากระดับสมาชิก
          <ChevronRight viewBox="0 0 24 24" width='18' height='18' />
        </Link>
      </header>
      <main className='px-5 relative top-[-40px]'>
        <div className='bg-white rounded-[6px] items-center' style={{filter:"drop-shadow(0 4px 20px #6363630D"}}>
          <div className='py-5 px-6 w-full flex justify-between items-center'>
            <div className="flex flex-col">
              <h2 className="text-[18px] font-bold">ระดับ: {level}</h2>
              <p className="text-[#424242] text-xs">อีก 23 คะแนนเลื่อนเป็น Gold</p>
            </div>
            <div className="flex flex-col text-end">
              <p className="text-[#333333] text-xs font-bold flex items-center gap-x-[5px]">
                <img src={coin} />
                คะแนน
              </p>
              <h1 className="text-[22px] text-[#333333] font-bold leading-[22px]">{user?.loyalty_points}</h1>
            </div>
          </div>

          <hr style={{borderColor:"#F2F2F2"}}/>

          <div className='inline-block w-full'>
            <Link to='/reward-history'>
              <button className='py-4 text-center my-2 w-1/2 border-r border-r-[#F2F2F2] text-[#333333] text-[15px] font-bold'>คะแนนใกล้หมดอายุ</button>
            </Link>
            <Link to='/member-level'>
              <button className='py-4 text-center my-2 w-1/2 text-[#333333] text-[15px] font-bold'>ประวัติการใช้งานคะแนน</button>
            </Link>
          </div>
        </div>
      </main>

      <main>
        <section>
          <h2 className="px-5 text-[#333333] text-sm font-bold">รางวัลเพื่อคุณ</h2>

          <div className="flex items-center gap-x-[10px] px-5 py-[18px] border-b border-b-[#E3E3E3]">
            <div>
              <img src={couponImage1} />
            </div>
            <div>
              <p className="text-[#00B14F] bg-[#E9F6ED] px-[10px] py-1 inline-block text-[10px] rounded-[200px]">พิเศษสำหรับคุณ</p>
              <h2 className="text-xs font-bold mt-[6px]">ส่วนลด 5 % สินค้าที่ร่วมรายการ</h2>
              <p className="mt-[9px] text-[#00000061] text-[10px]">ใช้ได้จนถึง 30 ส.ค. 2023</p>
            </div>
          </div>
          <div className="flex items-center gap-x-[10px] px-5 py-[18px] border-b border-b-[#E3E3E3]">
            <div>
              <img src={couponImage2} />
            </div>
            <div>
              <p className="text-[#00B14F] bg-[#E9F6ED] px-[10px] py-1 inline-block text-[10px] rounded-[200px]">โค้ดลับ</p>
              <h2 className="text-xs font-bold mt-[6px]">แลกของรางวัลกระติกน้ำเก็บความเย็น</h2>
              <p className="mt-[9px] text-[#00000061] text-[10px]">ใช้ได้จนถึง 30 ส.ค. 2023</p>
            </div>
          </div>
        </section>

        <div className='mt-[22px]'>
          <h2 className='text-[#3D3D3D] font-bold flex items-center px-5 mb-[14px] leading-6'>
            แลกคะแนน
            <SfIconArrowForward className="w-[18px] text-black ml-2"/>
          </h2>

          <div className="flex overflow-x-auto gap-x-[14px] mx-auto px-5">
            {(products ?? []).map((product) => (
              <ProductCard
                key={product.item_code}
                title={product.name}
                productId={product.name}
                itemCode={product.item_code}
                price={product.formatted_price}
                thumbnail={product.website_image ? product.website_image : "https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/sneakers.png"} />
            ))}
          </div>
        </div>
      </main>
      <footer className="bg-[#F2F2F6] p-5">
        <h2 className='mt-[30px] mb-[10px] font-bold text-[#333333]'>ความช่วยเหลือ</h2>
        <div className='flex flex-col bg-white rounded-[6px] items-center gap-y-[10px]' style={{filter:"drop-shadow(0 4px 20px #6363630D"}}>
          {helpMenu.map((menu) => 
            <AccountMenu icon={menu.icon} title={menu.title} link={menu.link} />
          )}
        </div>
      </footer>
    </>
  )
}