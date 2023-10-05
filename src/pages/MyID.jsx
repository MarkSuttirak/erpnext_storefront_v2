import { ArrowLeft, MarkerPin01, AlertTriangle } from '@untitled-ui/icons-react'
import { Link } from 'react-router-dom'
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import silverCard from '../img/silvercard.svg'
import coin from '../img/coin.svg'
import coupon from '../img/coupon.svg'
import TitleHeader from '../components/TitleHeader'
import QRCode from "react-qr-code";
import Barcode from 'react-barcode';

const MyID = () => {
  const [bronzeLevel, setBronzeLevel] = useState(false);
  const [silverLevel, setSilverLevel] = useState(true);

  const [currentPage, setCurrentPage] = useState(1)

  return (
    <>
      <TitleHeader title="ID ของฉัน" link="/my-account" />
      <main className='p-5 mt-[53px]'>
        <div className='inline-block w-full'>
          <button className='p-4 my-2 w-1/2 border-r border-r-[#F2F2F2]' onClick={() => setCurrentPage(1)}>QR Code</button>
          <button className='p-4 my-2 w-1/2' onClick={() => setCurrentPage(2)}>Barcode</button>

          <div className='flex flex-col justify-center'>
            {currentPage === 1 && (
              <QRCode size={200} value="my-name" style={{border:"4px solid #00000029",borderRadius:"24px",padding:"10px",margin:"auto"}}/>
            )}

            {currentPage === 2 && (
              <div className='flex justify-center'>
                <Barcode value='my-name'/>
              </div>
            )}

            <div className='flex items-center gap-x-[14px] mt-6 justify-center'>
              <img src={silverLevel ? silverCard : ""} />
              <div className='text-[#333333] font-bold'>ระดับ : {silverLevel ? "Silver Member" : ""}</div>
            </div>
          </div>

          <div className='p-5 border border-[#E8E8E8] rounded-[6px] mt-7' style={{filter:"drop-shadow(0 4px 20px #6363630D)"}}>
            <h2 className='mb-[6px] text-[#333333] text-sm'>ยอดของคุณ</h2>
            <div className='flex'>
              <div className='basis-1/3 flex gap-x-1 text-[13px]'>
                <span className='text-[#1BB040]'>฿ </span>
                850
              </div>
              <div className='basis-1/3 flex gap-x-1 text-[13px]'>
                <img src={coin}/>
                230
              </div>
              <div className='basis-1/3 flex gap-x-1 text-[13px]'>
                <img src={coupon}/>
                8
              </div>
            </div>

            <div className='flex mt-[2px]'>
              <div className='basis-1/3 inter text-xs text-[#4C4B4F]'>
                <Link to="/my-account">Wallet</Link>
              </div>
              <div className='basis-1/3 inter text-xs text-[#4C4B4F]'>
                Coins
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
  
export default MyID