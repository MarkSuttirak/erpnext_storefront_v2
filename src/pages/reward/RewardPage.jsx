import FooterMenu from "../../components/FooterMenu"
import { useFrappeAuth, useFrappeGetDoc } from 'frappe-react-sdk';
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "@untitled-ui/icons-react";
import silverCard from '../../img/silvercard-reward.svg'
import silverCardDesktop from '../../img/silvercard.svg'
import qrcode from '../../img/qrcode.svg'
import coin from '../../img/coin2.svg'
import transferPoints from '../../img/transfer-point.svg'
import redeemPoints from '../../img/redeem-points.svg'
import myTickets from '../../img/my-tickets.svg'
import { useProducts } from "../../hooks/useProducts";
import { SfIconArrowForward } from "@storefront-ui/react";
import ProductCard from "../../components/ProductCard";
import NavHeader from "../../components/NavHeader";
import { useUser } from '../../hooks/useUser';
import DesktopSidebar from "../../components/desktop/DesktopSidebar";

export default function RewardPage(){
  const [bronzeLevel, setBronzeLevel] = useState(false);
  const [silverLevel, setSilverLevel] = useState(true);

  const { currentUser, updateCurrentUser } = useFrappeAuth();
  const { user } = useUser()

  const { data, isLoading, error } = useFrappeGetDoc('User', currentUser, {
    filters: ['name', 'full_name', 'user_image']
  })

  const { products } = useProducts()

  useEffect(() => {
    updateCurrentUser()
  }, [updateCurrentUser])

  return (
    <>
      <NavHeader />
      <header className="px-5 pb-[60px] bg-[#BBE5BB] w-full pt-20 lg:hidden">
        {data && (
          <div className='flex items-center'>
            <img src={`${import.meta.env.VITE_ERP_URL}${data.user_image}`} width="64" className='rounded-[99px]'/>
            <div className='ml-3 flex flex-col'>
              <span className='font-bold'>{data.full_name}</span>
              <Link className='flex items-center gap-x-1' to='/edit-profile'>
                แก้ไขโปรไฟล์ของฉัน
                <ChevronRight color="#333333" />
              </Link>
            </div>
          </div>
        )}
        {isLoading || error && (
          <div className='flex items-center'>
            <svg className="h-[64px] w-[64px] bg-white text-gray-300 rounded-[99px]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <div className='ml-3 flex flex-col'>
              <span className='font-bold'>Loading...</span>
              <Link className='flex items-center gap-x-1'>
                แก้ไขโปรไฟล์ของฉัน
                <ChevronRight color="#333333" />
              </Link>
            </div>
          </div>
        )}

        <div className="mt-4 flex justify-between items-end">
          <div>
            <img src={silverCard} />
          </div>
          <div className="text-white text-right">
            <h2 className="flex gap-x-[5px] items-center justify-end">
              <img src={coin} />
              คอยน์
            </h2>
            <h1 className="text-[39px]">{user?.loyalty_points}</h1>
            <h3 className="text-[10px]">หมดอายุ 31 ม.ค. 2024</h3>
          </div>
        </div>
      </header>
      <main className='lg:px-5 relative top-[-40px] pb-[100px] lg:top-10 lg:flex desktop-sec lg:mt-[92px]'>
        <DesktopSidebar />
        <div className='bg-white rounded-[6px] items-center lg:hidden mx-5' style={{filter:"drop-shadow(0 4px 20px #6363630D"}}>
          <div className='py-5 px-2 w-full flex'>
            <Link to="/wishlist" className='basis-1/3 text-sm flex flex-col items-center text-center text-[#333333] justify-end'>
              <img src={redeemPoints} className="mb-1"/>
              แลกคะแนน
            </Link>
            <Link to="/my-order" className='basis-1/3 text-sm flex flex-col items-center text-center text-[#333333] justify-end'>
              <img src={transferPoints} className="mb-1"/>
              โอนคะแนน
            </Link>
            <Link to="/my-coupon" className='basis-1/3 text-sm flex flex-col items-center text-center text-[#333333] justify-end'>
              <img src={myTickets} className="mb-1"/>
              คูปองของฉัน
            </Link>
          </div>
          <hr style={{borderColor:"#F2F2F2"}}/>

          <div className='inline-block w-full'>
            <Link to='/reward-history'>
              <button className='py-4 text-center my-2 w-1/2 border-r border-r-[#F2F2F2] text-[#333333] text-[15px] font-bold'>ประวัติการใช้งานคะแนน</button>
            </Link>
            <Link to='/member-level'>
              <button className='py-4 text-center my-2 w-1/2 text-[#333333] text-[15px] font-bold'>ระดับสมาชิก</button>
            </Link>
          </div>
        </div>
        <section className="flex flex-col w-full mt-5 lg:mt-0">
          <div className='bg-white rounded-[6px] items-center lg:flex lg:justify-between profile-head hidden'>
            <div className='flex justify-between p-5 lg:w-1/2 lg:py-8 lg:px-0'>
              <div className='flex items-center gap-x-[14px]'>
                <img src={silverLevel ? silverCardDesktop : ""} />
                <div className='text-[#333333] font-bold'>ระดับ : {silverLevel ? "Silver" : ""}</div>
              </div>
            </div>
            <div className="text-right">
              <h2 className="flex gap-x-[5px] items-center justify-end text-xs">
                <img src={coin} />
                คอยน์
              </h2>
              <h1 className="text-[22px] font-semibold">{user?.loyalty_points}</h1>
            </div>
          </div>

          <hr style={{borderColor:"#F2F2F2"}} className="hidden lg:block"/>

          <div className="mb-[100px] lg:pt-8">
            <div>
              <h2 className='text-[#3D3D3D] font-bold flex items-center mb-[14px] leading-6 px-5 lg:px-0'>
                คูปองส่วนลดออนไลน์
                <SfIconArrowForward className="w-[18px] text-black ml-2"/>
              </h2>

              <div className="flex lg:grid lg:grid-cols-3 overflow-x-auto gap-x-[14px] mx-auto px-5 lg:px-0">
                {(products ?? []).map((product) => (
                  <ProductCard
                    key={product.item_code}
                    title={product.item_name}
                    productId={product.name}
                    desc={product.item_group}
                    itemCode={product.item_code}
                    price={product.formatted_price}
                    thumbnail={product.website_image ? `${import.meta.env.VITE_ERP_URL}${product.website_image}` : "https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/sneakers.png"}
                  />
                ))}
              </div>
            </div>
            <div>
              <h2 className='text-[#3D3D3D] font-bold flex items-center mb-[14px] leading-6 px-5 lg:px-0'>
                แลกคะแนน
                <SfIconArrowForward className="w-[18px] text-black ml-2"/>
              </h2>

              <div className="flex lg:grid lg:grid-cols-3 overflow-x-auto gap-x-[14px] mx-auto px-5 lg:px-0">
                {(products ?? []).map((product) => (
                  <ProductCard
                    key={product.item_code}
                    title={product.item_name}
                    productId={product.name}
                    desc={product.item_group}
                    itemCode={product.item_code}
                    price={product.formatted_price}
                    thumbnail={product.website_image ? `${import.meta.env.VITE_ERP_URL}${product.website_image}` : "https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/sneakers.png"}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterMenu active={2}/>
    </>
  )
}