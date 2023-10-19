import { Link, useParams } from "react-router-dom"
import { ArrowLeft, CreditCard02, ChevronRight, MarkerPin01, ShoppingBag01, AnnotationDots, SlashCircle01, ArrowDown } from "@untitled-ui/icons-react"
import { useFrappeGetDoc, useFrappeGetDocList } from "frappe-react-sdk"
import { useEffect, useState } from 'react'
import DesktopSidebar from "../../components/desktop/DesktopSidebar";
import promptPay from '../../img/promptpay.svg'
import Notification from "../../components/Notification";
import OrderSummary from "../../components/OrderSummary";
import newItem from "../../img/new-item.png"
import Divider from "../../components/Divider";
import { useMediaQuery } from "react-responsive";

export default function MyOrderDetails(){
  const { id } = useParams()

  const isDesktop = useMediaQuery({ minWidth: 1024 })

  const { data, isLoading, error } = useFrappeGetDoc('Sales Invoice', id, {
    fields: ['name', 'address', 'status', 'due_date', 'customer_address', 'items']
  })
  const StatusColor = ({color}) => {
    return (
      <div className='h-3 w-3 rounded-full' style={{backgroundColor:color}} />
    )
  }

  const OrderTitle = ({icon, title}) => {
    return (
      <div className="flex gap-x-[7px] items-center font-bold text-sm lg:text-base flex">
        {icon}
        {title}
      </div>
    )
  }

  const AddressInfo = ({name, address}) => {
    return (
      <div className='border border-[#111111] lg:bg-white lg:border-0 p-5 lg:p-0 rounded-[7px] flex justify-between text-[#8A8A8A]'>
        <div className='flex flex-col gap-y-2'>
          <div className="text-[#333333] text-base">{name}</div>
          <div className='text-[#8A8A8A] text-[13px]'>{address}</div>
        </div>
        <button className="text-[#333333] font-bold">แก้ไข</button>
      </div>
    )
  }

  return (
    <>
      <header className='header-mobile justify-between items-center lg:hidden'>
        <div className="flex gap-x-[7px]">
          <Link to="/my-order">
            <ArrowLeft />
          </Link>
          รายละเอียดคำสั่งซื้อ
        </div>
        <div className="flex items-center">
          <button className="px-2" onClick={() => setIsOpen(true)}>
            <ShoppingBag01 viewBox='0 0 24 24' width="22" height="22"/>
          </button>
        </div>
      </header>
        {/* {data && ( */}
          <main className="main-margintop desktop-sec lg:px-5 lg:py-10 lg:flex">
            <DesktopSidebar />
            <div className="p-5 w-full">
              <h2 className="header-title hidden lg:block mb-[23px]">รายละเอียดคำสั่งซื้อ</h2>
              <div className="text-xs flex items-center gap-x-[6px] font-bold lg:text-base">
                <StatusColor color="#EAB600"/>
                รอการชำระเงิน
              </div>

              <div className="mt-[17px] flex flex-col gap-y-3 lg:gap-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xs text-[#424242] lg:text-base">คำสั่งซื้อ</h2>
                  <p className="text-xs text-[#00B14F] lg:text-base text-right">SHO7705236569</p>
                </div>
                <div className="flex justify-between items-center">
                  <h2 className="text-xs text-[#424242] lg:text-base">วันที่</h2>
                  <p className="text-xs text-[#111111] lg:text-base text-right">24-07-23</p>
                </div>
                <div className="flex justify-between items-center">
                  <h2 className="text-xs text-[#424242] lg:text-base">จัดส่งภายใน</h2>
                  <p className="text-xs text-[#111111] lg:text-base text-right">3 - 4 วันทำการ<br/>Standard Delivery</p>
                </div>
                <div className="flex justify-between items-center">
                  <h2 className="text-xs text-[#424242] lg:text-base">การชำระเงิน</h2>
                  <p className="text-xs text-[#111111] lg:text-base text-right">โอนเงินผ่านธนาคาร</p>
                </div>
                <div className="flex justify-between items-center">
                  <h2 className="text-xs text-[#424242] lg:text-base">รวมการสั่งซื้อ</h2>
                  <p className="text-xs text-[#111111] lg:text-base text-right">฿ 5,200</p>
                </div>
              </div>

              <Divider size={isDesktop ? 40 : 30} color="#F2F2F2"/>

              <section className="mt-5">

                <div className="lg:flex justify-between">
                  <OrderTitle title="ช่องทางการชำระเงิน" icon={<CreditCard02 />}/>
                  <button className="hidden lg:block text-[#00B14F]">เปลี่ยนช่องทางการชำระเงิน</button>
                </div>
                <div className="mt-5">
                  <button className="px-4 py-5 border border-[#F2F2F2] rounded-[7px] flex justify-between items-center w-full lg:w-[354px]">
                    <div className='flex gap-x-[10px] items-center'>
                      <img src={promptPay} />
                      <p className="font-bold text-sm text-[#333333]">QR พร้อมเพย์</p>
                    </div>
                    <p className="text-[#00B14F] text-sm font-bold">ชำระเงิน</p>
                  </button>
                </div>

                <Notification type="success" className='mt-5 lg:w-[354px]'>
                  <p className="text-[13px]">กรุณาชำระเงินด้วย QR พร้อมเพย์ ภายใน 25-07-23 เวลา 10:30 มิฉะนั้น ระบบจะยกเลิกออเดอร์อัตโนมัติ</p>
                </Notification>

                <div className="flex justify-center mt-[30px] lg:hidden">
                  <button className="text-[#00B14F] text-sm">เปลี่ยนช่องทางการชำระเงิน</button>
                </div>
              </section>

              <Divider size={isDesktop ? 40 : 30} color="#F2F2F2"/>

              <section className="mt-[31px]">
                <OrderTitle title="ที่อยู่ในการจัดส่ง" icon={<MarkerPin01 />}/>
                <div className="mt-[17px]">
                  <AddressInfo name={`Markus Linmann`} address={`Frankfurt am Main, Deutschland`}/>
                </div>
              </section>

              <Divider size={isDesktop ? 40 : 30} color="#F2F2F2"/>

              <section className="mt-[31px]">
                <OrderTitle title="Order Summary" icon={<ShoppingBag01 />}/>
                <div className="mt-[17px]">
                  <OrderSummary name="Nike Air Force 1 '07" price="$4499.00" image={newItem} desc="Women’s Pullover Training Hoodie"/>

                  <div className="w-full flex flex-col justify-center mt-[31px]">
                    <button className="flex gap-x-2 items-center justify-center text-[15px] font-bold mb-10 text-[#1BB040]">
                      <ArrowDown viewBox="0 0 24 24" width="13" height="13"/>
                      สินค้าอื่นๆในตะกร้า
                      <span className="inline-block px-1 py-[2px] bg-[#F4F4F4] text-[#8A8A8A] rounded-[5px] text-[10px] text-center">10</span>
                    </button>
                  </div>
                </div>
              </section>

              <section className="mt-[31px]">
                <OrderTitle title="รวมการสั่งซื้อ" icon={<ShoppingBag01 />}/>
                <div className="mt-[17px] flex flex-col gap-y-3 lg:gap-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xs text-[#424242] lg:text-base">ยอดรวม</h2>
                    <p className="text-xs text-[#111111] lg:text-base">฿ 5,200</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <h2 className="text-xs text-[#424242] lg:text-base">การจัดส่งสินค้า</h2>
                    <p className="text-xs text-[#111111] lg:text-base">ฟรี</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <h2 className="text-xs text-[#424242] lg:text-base">ทั้งหมด</h2>
                    <p className="text-xs text-[#111111] lg:text-base">฿ 5,200</p>
                  </div>
                </div>
              </section>

              <section className="flex items-center gap-x-[30px] mt-[30px] pt-[18px] border-t border-t-[#E3E3E3] justify-center">
                <button className="text-[#1BB040] text-xs lg:text-sm flex items-center gap-x-[6px]">
                  <AnnotationDots viewBox="0 0 24 24" width="13" height="13"/>
                  ติดต่อเรา
                </button>
                <button className="text-[#1BB040] text-xs lg:text-sm flex items-center gap-x-[6px]">
                  <SlashCircle01 viewBox="0 0 24 24" width="13" height="13"/>
                  ยกเลิกการสั่งซื้อ
                </button>
              </section>
            </div>
          </main>
        {/* )} */}
    </>
  )
}