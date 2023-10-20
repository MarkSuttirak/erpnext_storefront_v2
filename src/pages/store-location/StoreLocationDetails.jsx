import { useNavigate, useParams, Link } from "react-router-dom"
import { useFrappeGetDoc } from "frappe-react-sdk"
import { ArrowLeft, ShoppingBag01, PhoneCall01 } from "@untitled-ui/icons-react"
import Breadcrumbs from "../../components/Breadcrumbs"

export default function StoreLocationDetails(){
  const { navigate } = useNavigate()
  const { id } = useParams()
  const { data } = useFrappeGetDoc('Store Location', id, {
    fields: ['name', 'store_name', 'location', 'store_image', 'opening_time_monday', 'closing_time_monday', 'opening_time_tuesday', 'closing_time_tuesday', 'opening_time_wednesday', 'closing_time_wednesday', 'opening_time_thursday', 'closing_time_thursday', 'opening_time_friday', 'closing_time_friday', 'opening_time_saturday', 'closing_time_saturday', 'opening_time_sunday', 'closing_time_sunday', 'contact_phone', 'map', 'store_location']
  })

  return (
    <>
      <header className={`header-mobile justify-between items-center lg:hidden`}>
        <div className="flex items-center gap-x-[7px]">
          <Link to='/store-location'>
            <ArrowLeft />
          </Link>
          {id}
        </div>

        <div className="flex items-center">
          <button className="px-2" onClick={() => navigate('/cart')}>
            <ShoppingBag01 viewBox='0 0 24 24' width="22" height="22"/>
          </button>
        </div>
      </header>
      <main className="main-margintop desktop-sec p-5 lg:py-10">
        <Breadcrumbs pages={[{
          name:'Store Location',
          href:'/store-location'
        },{
          name:id,
          href:''
        }]} />
        <div className="max-w-[520px] lg:max-w-[1200px]">
          <h3 className="text-[#F2F2F2] text-sm font-bold absolute text-end px-[10px] py-[6px] max-w-[520px] lg:max-w-none" style={{width:"calc(100% - 40px)"}}>Now open</h3>
          <img src={`${import.meta.env.VITE_ERP_URL}${data?.store_image}`} className="rounded-[8px] w-full aspect-[3/2] object-cover"/>
        </div>

        <div className="mt-6 lg:mt-[50px]">
          <h1 className="text-base text-[#111111] lg:text-[26px] mb-6 font-bold">{id}</h1>
          <h2 className="text-[#111111] text-[15px] font-bold mb-[10px]">รายละเอียดสถานที่</h2>
          <div className="flex flex-col gap-y-[10px] ml-5">
            <p className="text-[#8A8A8A] text-xs">{data?.location}</p>
            <p className="text-[#8A8A8A] text-xs">เบอร์ติดต่อ : {data?.contact_phone}</p>
          </div>
        </div>

        <div className="mt-5">
          <h2 className="text-[#111111] text-[15px] font-bold mb-[10px]">เวลาเปิด-ปิด</h2>
          <div className="flex flex-col gap-y-[10px] ml-5">
            <p className="text-[#8A8A8A] text-xs">วันจันทร์: {data?.opening_time_monday} - {data?.closing_time_monday}</p>
            <p className="text-[#8A8A8A] text-xs">วันอังคาร: {data?.opening_time_tuesday} - {data?.closing_time_tuesday}</p>
            <p className="text-[#8A8A8A] text-xs">วันพุธ: {data?.opening_time_wednesday} - {data?.closing_time_wednesday}</p>
            <p className="text-[#8A8A8A] text-xs">วันพฤหัสบดี: {data?.opening_time_thursday} - {data?.closing_time_thursday}</p>
            <p className="text-[#8A8A8A] text-xs">วันศุกร์: {data?.opening_time_friday} - {data?.closing_time_friday}</p>
            <p className="text-[#8A8A8A] text-xs">วันเสาร์: {data?.opening_time_saturday} - {data?.closing_time_saturday}</p>
            <p className="text-[#8A8A8A] text-xs">วันอาทิตย์: {data?.opening_time_sunday} - {data?.closing_time_sunday}</p>
          </div>
        </div>

        <div className="mt-5">
          <h2 className="text-[#111111] text-[15px] font-bold mb-[10px]">สถานที่ตั้ง</h2>
          {data?.map}

          <p className="text-[#8A8A8A] text-xs ml-5">{data?.store_location}</p>
        </div>
      </main>
    </>
  )
}