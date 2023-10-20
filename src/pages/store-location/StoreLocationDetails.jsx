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

        <p className="text-[#333333] text-xs my-5">{data?.location}</p>
        <a href={`tel:${data?.contact_phone}`} className='w-full bg-white border border-[#111111] text-[#111111] rounded-[9px] p-3 flex justify-center items-center gap-x-[10px] text-xs font-bold'>
          <PhoneCall01 viewBox='0 0 24 24' width='18' height='18' />
          ติดต่อสาขา
        </a>

        <div className="mt-5">
          <h2 className="text-[#111111] text-[15px] font-bold mb-[10px]">เวลาเปิด-ปิด</h2>
          <div className="flex flex-col gap-y-[10px]">
            <div className="flex text-[#333333] text-xs">
              <p className="w-[40%]">วันจันทร์:</p>
              <p className="w-[60%]">{data?.opening_time_monday} - {data?.closing_time_monday}</p>
            </div>
            <div className="flex text-[#333333] text-xs">
              <p className="w-[40%]">วันอังคาร:</p>
              <p className="w-[60%]">{data?.opening_time_tuesday} - {data?.closing_time_tuesday}</p>
            </div>
            <div className="flex text-[#333333] text-xs">
              <p className="w-[40%]">วันพุธ:</p>
              <p className="w-[60%]">{data?.opening_time_wednesday} - {data?.closing_time_wednesday}</p>
            </div>
            <div className="flex text-[#333333] text-xs">
              <p className="w-[40%]">วันพฤหัสบดี:</p>
              <p className="w-[60%]">{data?.opening_time_thursday} - {data?.closing_time_thursday}</p>
            </div>
            <div className="flex text-[#333333] text-xs">
              <p className="w-[40%]">วันศุกร์:</p>
              <p className="w-[60%]">{data?.opening_time_friday} - {data?.closing_time_friday}</p>
            </div>
            <div className="flex text-[#333333] text-xs">
              <p className="w-[40%]">วันเสาร์:</p>
              <p className="w-[60%]">{data?.opening_time_saturday} - {data?.closing_time_saturday}</p>
            </div>
            <div className="flex text-[#333333] text-xs">
              <p className="w-[40%]">วันอาทิตย์:</p>
              <p className="w-[60%]">{data?.opening_time_sunday} - {data?.closing_time_sunday}</p>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <h2 className="text-[#111111] text-[15px] font-bold mb-[10px]">สถานที่ตั้ง</h2>
          {data?.map}

          <p className="mt-[10px] text-xs text-[#333333]">{data?.store_location}</p>
        </div>
      </main>
    </>
  )
}