import React from 'react'
import { Link, useSearchParams } from 'react-router-dom';
import TitleHeader from '../components/TitleHeader';
import success from '../img/success.svg'
import { Edit05, Copy01, Maximize01, ArrowUpRight, FileCheck02 } from '@untitled-ui/icons-react';

export default function BankInfoPage(){
  const [searchParams] = useSearchParams();
  return (
    <>
      <TitleHeader link='/' title='ใบเสร็จยืนยันคำสั่งซื้อ'/>
      <main className='p-5 main-margintop max-w-[660px] mx-auto px-5 lg:py-10'>
        <section className='text-center mt-5'>
          <div className='h-[45px] w-[45px] bg-[#00B14F] flex items-center justify-center rounded-full mx-auto'>
            <FileCheck02 color='#FFFFFF' viewBox='0 0 22 22' width='24' height='24'/>
          </div>
          {/* <img src={success} className='m-auto'/> */}
          <p className='mt-8 text-[#424242] text-sm lg:text-base'>เราได้ส่งข้อความไลน์ และอีเมล<br/> ยืนยันพร้อมรายละเอียดการสั่งซื้อสินค้า<br/> ของคุณไปที่ <strong>jintapa01@mail.com</strong></p>

          <p className='mt-8 text-xs text-[#474747] lg:text-base'>คุณสามารถไปที่ <Link to='/my-order' className='text-[#00B14F]'>คำสั่งซื้อของฉัน</Link> เพื่อติดตามสถานะ<br/> คำสั่งซื้อของคุณ หรือแจ้งโอนเงินทีหลังได้</p>
        </section>

        <hr className='my-[35px] border-[#E3E3E3]'/>

        <section>
          <h2>ข้อมูลการสั่งซื้อ</h2>
          <div className='flex flex-col gap-y-[14px] mt-[27px]'>
            <div className='flex'>
              <h3 className='text-[#010101] w-[40%] text-xs lg:text-base'>คำสั่งซื้อ</h3>
              <p className='text-[#00B14F] w-[60%] text-xs lg:text-base lg:text-right'>{searchParams.get("order_id")}</p>
            </div>
            <div className='flex'>
              <h3 className='text-[#010101] w-[40%] text-xs lg:text-base'>จัดส่งภายใน</h3>
              <p className='text-[#010101] w-[60%] text-xs lg:text-base lg:text-right'>3 - 4 วันทำการ<br/> Standard Delivery</p>
            </div>
            <div className='flex'>
              <h3 className='text-[#010101] w-[40%] text-xs lg:text-base'>ที่อยู่ในการจัดส่ง</h3>
              <p className='text-[#010101] w-[60%] text-xs lg:text-base lg:text-right'>999/99 พระราม 9 ถนมพระราม9 ห้วยขวาง กรุงเทพมหานคร 12050 ประเทศไทย</p>
            </div>
            <div className='flex'>
              <h3 className='text-[#010101] w-[40%] text-xs lg:text-base'>การชำระเงิน</h3>
              <p className='text-[#010101] w-[60%] text-xs lg:text-base lg:text-right'>บัตรเครดิต</p>
            </div>
            <div className='flex'>
              <h3 className='text-[#010101] w-[40%] text-xs lg:text-base'>รวมการสั่งซื้อ</h3>
              <p className='text-[#010101] w-[60%] text-xs lg:text-base lg:text-right'>฿ {searchParams.get("amount")}</p>
            </div>
          </div>
        </section>

        <Link to='/my-order' className={`text-white rounded-[9px] p-3 w-full bg-[#111111] font-bold flex items-center justify-center mt-8`}>
          ไปที่ คำสั่งซื้อของฉัน
        </Link>
      </main>
    </>
  )
}