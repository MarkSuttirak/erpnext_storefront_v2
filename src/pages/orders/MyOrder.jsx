import React, { useState, useRef } from "react"
import { ArrowLeft } from "@untitled-ui/icons-react"
import { useFrappeGetDocList, useFrappeGetCall } from "frappe-react-sdk"
import { Link, useParams } from "react-router-dom"
import { getToken, removeToken, setToken } from '../../utils/helper';
import testImg from '../../img/test-img.png'
import Orders from "../../components/Orders";
import DesktopSidebar from "../../components/desktop/DesktopSidebar";
import TabButton from "../../components/TabButton";

export default function MyOrder(){
  const { id } = useParams();
  const [myorderlist, setmyorderlist] = useState()
  const [currentSec, setCurrentSec] = useState(1)

  const mockOrders = [
    {
      name:"Computer",
      posting_date:"12. Juli 2023",
      status:"รอการชำระเงิน",
      delivery_within:"3 - 4 วันทำการ Standard Delivery",
      payment_method:"โอนเงินผ่านธนาคาร",
      total:"€60",
      image:testImg
    },
    {
      name:"Salat",
      posting_date:"12. August 2023",
      status:"รอการชำระเงิน",
      delivery_within:"3 - 4 วันทำการ Standard Delivery",
      payment_method:"โอนเงินผ่านธนาคาร",
      total:"€5",
      image:testImg
    },
    {
      name:"Handy",
      posting_date:"25. August 2023",
      status:"ยกเลิก",
      delivery_within:"3 - 4 วันทำการ Standard Delivery",
      payment_method:"โอนเงินผ่านธนาคาร",
      total:"€150",
      image:testImg
    },
    {
      name:"Sandwich",
      posting_date:"10. August 2023",
      status:"รับที่สาขา",
      delivery_within:"3 - 4 วันทำการ Standard Delivery",
      payment_method:"โอนเงินผ่านธนาคาร",
      total:"€3",
      image:''
    },
  ]

  const { data, isLoading, error } = useFrappeGetDocList('Sales Invoice', {
    fields: ['name', 'posting_date', 'status', 'total'],
    limit: 1000,
    orderBy: {
      field: 'posting_date',
      order: 'desc'
    }
  })

  const { myorders } = useFrappeGetCall('honda_api.api_calls.getuser.getorders', {}, 'user-profile', {
    isOnline: () => getToken(),
    onSuccess: (data) => {
      setmyorderlist(data.message)
    }
  })

  const orderFilters = [
    {
      title:'ทั้งหมด',
      id:1
    },
    {
      title:'รอการชำระเงิน',
      id:2,
    },
    {
      title:'รับที่สาขา',
      id:3
    },
    {
      title:'สำเร็จ',
      id:4
    },
    {
      title:'ยกเลิก',
      id:5
    }
  ]

  return (
    <>
      <header className='header-mobile gap-x-[7px] lg:hidden'>
        <Link to="/my-account">
          <ArrowLeft />
        </Link>
        คำสั่งซื้อของฉัน
      </header>
      <main className="px-5 lg:py-10 flex flex-col lg:flex-row gap-y-[18px] main-margintop desktop-sec">
        <DesktopSidebar />
        <section className="lg:hidden">
          {mockOrders.map((d) => 
            <Orders name={d.name} posting_date={d.posting_date} delivery_within={d.delivery_within} total={d.total} status={d.status} image={d.image}/>
          )}
        </section>
        <section className="w-full hidden lg:block">
          <h2 className="header-title mb-4">คำสั่งซื้อของฉัน</h2>
          {orderFilters.map((o) => 
            <TabButton key={o.id} title={o.title} isActive={currentSec === o.id} onClick={() => setCurrentSec(o.id)} totalTabs={orderFilters.length}/>
          )}
          
          {currentSec === 1 && (
            <>
              {mockOrders.map((d) => 
                <Orders name={d.name} posting_date={d.posting_date} delivery_within={d.delivery_within} total={d.total} status={d.status} image={d.image}/>
              )}
            </>
          )}

          {currentSec === 2 && (
            <>
              {mockOrders.filter((m) => m.status === "รอการชำระเงิน").map((d) => 
                <Orders name={d.name} posting_date={d.posting_date} delivery_within={d.delivery_within} total={d.total} status={d.status} image={d.image}/>
              )}
            </>
          )}

          {currentSec === 3 && (
            <>
              {mockOrders.filter((m) => m.status === "รับที่สาขา").map((d) => 
                <Orders name={d.name} posting_date={d.posting_date} delivery_within={d.delivery_within} total={d.total} status={d.status} image={d.image}/>
              )}
            </>
          )}

          {currentSec === 4 && (
            <>
              {mockOrders.filter((m) => m.status === "สำเร็จ").map((d) => 
                <Orders name={d.name} posting_date={d.posting_date} delivery_within={d.delivery_within} total={d.total} status={d.status} image={d.image}/>
              )}
            </>
          )}

          {currentSec === 5 && (
            <>
              {mockOrders.filter((m) => m.status === "ยกเลิก").map((d) => 
                <Orders name={d.name} posting_date={d.posting_date} delivery_within={d.delivery_within} total={d.total} status={d.status} image={d.image}/>
              )}
            </>
          )}
        </section>
      </main>
    </>
  )
}