import { ShoppingBag02 } from "@untitled-ui/icons-react"
import { Link } from "react-router-dom"

export default function Orders({name, posting_date, delivery_within, payment_method, status, total, image}){
  const StatusColor = ({color}) => {
    return (
      <div className='h-3 w-3 rounded-full' style={{backgroundColor:color}} />
    )
  }

  return (
    <Link to={`/my-order-details/${name}`}>
      <section className="py-[18px] border-b border-b-[#E3E3E3] lg:border lg:border-[#E3E3E3] lg:rounded-lg lg:px-4 lg:mt-5">
        <div className="flex mb-[14px]">
          <p className={`text-xs flex items-center gap-x-[6px] font-bold`}>
            <StatusColor color={`${status === "รอการชำระเงิน" ? "#EAB600" : status === "ยกเลิก" ? "#989898" : "#000000"}`}/>
            {status} {/* Entwurf = Draft */}
          </p>
        </div>
        <div className="flex gap-x-[14px]">
          <div className="lg:w-[90px]">
            {image ? <img src={image} className="h-full object-cover rounded-md"/> : <div className='w-full h-full bg-[#EFEFEF] flex items-center justify-center rounded-md'><ShoppingBag02 /></div>}
          </div>
          <div className="flex w-full flex-col gap-y-3">
            <div className="flex">
              <h2 className="text-order-title">คำสั่งซื้อ</h2>
              <p className="text-order-name">{name}</p>
            </div>
            <div className="flex">
              <h2 className="text-order-title">วันที่</h2>
              <p className="text-order-desc">{posting_date}</p>
            </div>
            <div className="flex">
              <h2 className="text-order-title">จัดส่งภายใน</h2>
              <p className="text-order-desc">{delivery_within}</p>
            </div>
            <div className="flex">
              <h2 className="text-order-title">การชำระเงิน</h2>
              <p className="text-order-desc">{payment_method}</p>
            </div>
            <div className="flex">
              <h2 className="text-order-title">รวมการสั่งซื้อ</h2>
              <p className="text-order-desc">{total}</p>
            </div>
            {/* <div className="w-full">
              <Link to={status === 'Draft' && `/my-order-details/${name}`} className='w-full block text-white rounded-[9px] p-3 text-center' style={{background:status === 'Draft' ? "#111111" : "#C5C5C5"}}>ดูข้อมูล</Link>
            </div> */}
          </div>
        </div>
      </section>
    </Link>
  )
}