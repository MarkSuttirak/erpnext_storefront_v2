import { useState } from "react"
import brandLogo from '../../img/logo.svg'
import { ArrowLeft, ArrowRight, Calendar, Download01, InfoCircle } from '@untitled-ui/icons-react'
import QRCode from "react-qr-code";
import Barcode from 'react-barcode';

export default function CouponDesc({proTitle, code, desc, date, condition, image}){
  const [currentPage, setCurrentPage] = useState(1)
  const [showDesc, setShowDesc] = useState(false)

  const QRCodeOrBarcode = () => {
    return (
      <>
        <div className='lg:mt-8'>
          <button className={`p-4 my-2 w-1/2 border-r border-r-[#F2F2F2] ${currentPage === 1 ? 'text-[#66BC89]' : 'text-[#1C1C1C]'}`} onClick={() => setCurrentPage(1)}>QR Code</button>
          <button className={`p-4 my-2 w-1/2 ${currentPage === 2 ? 'text-[#66BC89]' : 'text-[#1C1C1C]'}`} onClick={() => setCurrentPage(2)}>Barcode</button>
        </div>

        <div className='flex flex-col justify-center'>
          {currentPage === 1 && (
            <QRCode size={200} value="my-name" className="m-auto p-[10px]"/>
          )}

          {currentPage === 2 && (
            <div className='flex justify-center'>
              <Barcode value='my-name'/>
            </div>
          )}

          <div className='flex items-center gap-x-[14px] px-8 py-[18px] justify-between lg:hidden'>
            <Download01 />
            <p className='text-[#989898] text-xs'>ใช้ได้ถึง {date}</p>
            <InfoCircle />
          </div>

          <div className='hidden lg:flex px-8 py-[18px] justify-center'>
            <button className='flex gap-x-2 items-center px-10 py-4 border border-[#111111] text-[#111111] rounded-lg'>
              <Download01 />
              บันทึกรูปภาพ
            </button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      {/* Mobile */}
      <div className='relative rounded-[12px] lg:hidden' style={{boxShadow:"0px 2px 11px rgba(0, 0, 0, 0.16)"}}>
        <div className='p-6 flex justify-between'>
          <img src={brandLogo} />
          <h2 className='text-md text-[#333333] font-bold'>โค้ด: {code}</h2>
        </div>
        {!showDesc ? (
          <>
            <div className='flex flex-col align-between mb-6 px-6'>
              <div className='flex flex-col'>
                <h2 className='text-[21px] font-bold'>{proTitle}</h2>
                <div className='text-[#424242] text-xs font-medium px-6' dangerouslySetInnerHTML={{__html:desc}}/>
              </div>

              <button className='flex items-center gap-x-[5px] text-sm text-[#424242] justify-center mt-20' onClick={() => setShowDesc(true)}>ข้อตกลงและเงื่อนไขอื่นๆ <ArrowRight viewBox='0 0 24 24' width='18'/></button>
            </div>

            <hr className='border-t-[3px] border-dashed border-[#66666633] w-[80%] mx-auto'/>

            <QRCodeOrBarcode />
          </>
        ) : (
          <>
            <div className='text-[#424242] text-xs font-medium' dangerouslySetInnerHTML={{__html:condition}}/>

            <div className='flex items-center gap-x-[14px] px-8 py-[18px] justify-center'>
              <button className='flex items-center gap-x-[5px] text-sm text-[#424242] justify-center mt-20' onClick={() => setShowDesc(false)}><ArrowLeft viewBox='0 0 24 24' width='18'/> กลับไปยังโค้ด</button>
            </div>
          </>
        )}
      </div>

      {/* Desktop */}
      <div className="hidden lg:flex w-full">
        <section className="w-[400px] flex flex-col gap-y-3">
          {image ? <img src={image} className="rounded-lg"/> : <div className="bg-[#DBDBDB] w-full h-[300px] rounded-lg"/>}

          <div className='flex flex-col relative'>
            <input className='border border-[#E3E3E3] rounded-[8px] outline-none py-2 px-3' value={code} name='phone' type='tel' />

            <button className="absolute top-[3px] right-[4px] bg-black text-white px-3 py-[6px] rounded-[6px]">คัดลอก</button>
          </div>

          <QRCodeOrBarcode />
        </section>

        <section className="pl-[60px]">
          <h2 className="header-title">{proTitle}</h2>
          <div className="flex items-center gap-x-3 mt-[18px]">
            <Calendar color='#8A8A8A' viewBox='0 0 24 24' width='18'/>
            <p className="text-[18px] font-medium text-[#8A8A8A]">หมดเขต {date}</p>
          </div>

          <article className="mt-[30px]">
            <h2 className="header-title">รายละเอียด</h2>
            <div className="text-[#8A8A8A] pl-5 text-[20px] mt-4" dangerouslySetInnerHTML={{__html:desc}}/>

            <hr className='border-t-[1px] my-[30px] border-[#66666633] mx-auto'/>

            <h2 className="header-title">เงื่อนไข</h2>
            <div className="text-[#8A8A8A] pl-5 text-[20px] mt-4" dangerouslySetInnerHTML={{__html:condition}}/>
          </article>
        </section>
      </div>
    </>
  )
}