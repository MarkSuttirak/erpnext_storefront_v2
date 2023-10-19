import { ArrowLeft, MarkerPin01, AlertTriangle, Download01 } from '@untitled-ui/icons-react'
import { Link } from 'react-router-dom'
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import silverCard from '../img/silvercard.svg'
import coin from '../img/coin.svg'
import coupon from '../img/coupon.svg'
import TitleHeader from '../components/TitleHeader'
import QRCode from "react-qr-code";
import Barcode from 'react-barcode';
import { useUser } from '../hooks/useUser';
import { useFrappeGetDocCount } from 'frappe-react-sdk';
import NavHeader from '../components/NavHeader'
import DesktopSidebar from '../components/desktop/DesktopSidebar'

export default function MyID(){
  const [bronzeLevel, setBronzeLevel] = useState(false);
  const [silverLevel, setSilverLevel] = useState(true);

  const [currentPage, setCurrentPage] = useState(1)

  const { user } = useUser()
  const { data:couponNum } = useFrappeGetDocCount('Coupon Code')

  return (
    <>
      <TitleHeader title="ID ของฉัน" link="/my-account" />

      {/* header for desktop version */}
      <div className='hidden lg:block'>
        <NavHeader />
      </div>

      <main className='p-5 lg:pt-10 main-margintop lg:flex desktop-sec'>
        <DesktopSidebar />
        <div className='inline-block w-full'>
          <div className='hidden lg:flex flex-col w-full pb-3 border-b border-b-[#F2F2F2]'>
            <div className='bg-white rounded-[6px] items-center lg:flex lg:justify-between'>
              <div className='flex justify-between p-5 lg:w-1/2 lg:px-0'>
                <div className='flex items-center gap-x-[14px]'>
                  <img src={silverLevel ? silverCard : ""} />
                  <div className='text-[#333333] font-bold'>ระดับ : {silverLevel ? "Silver" : ""}</div>
                </div>
              </div>

              <div className='p-5 lg:w-1/2 lg:px-0'>
                <div className='flex'>
                  <div className='basis-1/3 flex gap-x-1 text-[13px] justify-center'>
                    Wallet
                  </div>
                  <div className='basis-1/3 flex gap-x-1 text-[13px] justify-center'>
                    Coins
                  </div>
                  <div className='basis-1/3 flex gap-x-1 text-[13px] justify-center'>
                    <Link to="/my-coupon">Coupon</Link>
                  </div>
                </div>

                <div className='flex'>
                  <div className='basis-1/3 flex gap-x-1 text-[13px] justify-center'>
                    <span className='text-[#1BB040]'>฿ </span>850
                  </div>
                  <div className='basis-1/3 flex gap-x-1 text-[13px] justify-center'>
                    {user?.loyalty_points} <span className='text-[#FFA800]'>coins</span>
                  </div>
                  <div className='basis-1/3 flex gap-x-1 text-[13px] justify-center'>
                    {couponNum} <span className='text-[#BC0000]'>codes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='lg:max-w-[400px] mx-auto lg:my-8'>
            <button className={`p-4 my-2 w-1/2 border-r border-r-[#F2F2F2] ${currentPage === 1 ? 'text-[#66BC89]' : 'text-[#1C1C1C]'}`} onClick={() => setCurrentPage(1)}>QR Code</button>
            <button className={`p-4 my-2 w-1/2 ${currentPage === 2 ? 'text-[#66BC89]' : 'text-[#1C1C1C]'}`} onClick={() => setCurrentPage(2)}>Barcode</button>
          </div>

          <div className='flex flex-col justify-center'>
            {currentPage === 1 && (
              <QRCode size={200} value="my-name" style={{margin:"auto"}}/>
            )}

            {currentPage === 2 && (
              <div className='flex justify-center'>
                <Barcode value='my-name'/>
              </div>
            )}

            <div className='flex items-center gap-x-[14px] mt-10 justify-center'>
              <div className='flex items-center gap-x-2 lg:hidden'>
                <img src={silverLevel ? silverCard : ""} />
                <div className='text-[#333333] font-bold'>ระดับ : {silverLevel ? "Silver Member" : ""}</div>
              </div>
              <button className='hidden lg:flex gap-x-2 items-center px-10 py-4 border border-[#111111] text-[#111111] rounded-lg'>
                <Download01 />
                บันทึกรูปภาพ
              </button>
            </div>
          </div>

          <div className='p-5 border border-[#E8E8E8] rounded-[6px] mt-7 lg:hidden' style={{filter:"drop-shadow(0 4px 20px #6363630D)"}}>
            <h2 className='mb-[6px] text-[#333333] text-sm'>ยอดของคุณ</h2>
            <div className='flex'>
              <div className='basis-1/3 flex gap-x-1 text-[13px]'>
                <span className='text-[#1BB040]'>฿ </span>
                850
              </div>
              <div className='basis-1/3 flex gap-x-1 text-[13px]'>
                <img src={coin}/>
                {user ? user.loyalty_points : '...'}
              </div>
              <div className='basis-1/3 flex gap-x-1 text-[13px]'>
                <img src={coupon}/>
                {couponNum ? couponNum : '...'}
              </div>
            </div>

            <div className='flex mt-[2px]'>
              <div className='basis-1/3 inter text-xs text-[#4C4B4F]'>
                <Link to="/my-account">Wallet</Link>
              </div>
              <div className='basis-1/3 inter text-xs text-[#4C4B4F]'>
                {user?.loyalty_points === 1 ? "Coin" : "Coins"}
              </div>
              <div className='basis-1/3 inter text-xs text-[#4C4B4F]'>
                Coupon
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}