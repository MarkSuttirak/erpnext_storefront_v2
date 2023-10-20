import { Link } from "react-router-dom";
import { ArrowLeft, ShoppingBag01, ChevronRight, PhoneCall01 } from "@untitled-ui/icons-react";
import { useFrappeGetDocList } from 'frappe-react-sdk'

export default function StoreLocation(){
  const { data } = useFrappeGetDocList('Store Location', {
    fields: ['name', 'store_name', 'location', 'store_image', 'opening_time_monday', 'closing_time_monday', 'opening_time_tuesday', 'closing_time_tuesday', 'opening_time_wednesday', 'closing_time_wednesday', 'opening_time_thursday', 'closing_time_thursday', 'opening_time_friday', 'closing_time_friday', 'opening_time_saturday', 'closing_time_saturday', 'opening_time_sunday', 'closing_time_sunday', 'contact_phone', 'map', 'store_location']
  })

  return (
    <>
      <header className={`header-mobile justify-between items-center lg:hidden`}>
        <div className="flex items-center gap-x-[7px]">
          <Link to='/my-account'>
            <ArrowLeft />
          </Link>
          หน้าร้านของเรา
        </div>

        <div className="flex items-center">
          <button className="px-2" onClick={() => navigate('/cart')}>
            <ShoppingBag01 viewBox='0 0 24 24' width="22" height="22"/>
          </button>
        </div>
      </header>
      <main className="main-margintop desktop-sec lg:py-10 lg:px-5 mb-[40px]">
        <div className="text-center pt-5">
          <h2 className="header-title">Store Location</h2>
          <p className="text-[#8A8A8A] text-xs mt-2">มาช้อปปิ้งหรือมารับสินค้าที่ร้านสาขาใกล้คุณ !</p>
        </div>

        <section className="relative grid lg:grid-cols-2">
          {(data ?? []).map((d) => (
            <>
              <Link to={`/store-location-details/${d.name}`} className={`font-bold text-sm flex flex-col border-b border-b-[#E3E3E3] lg:border-b-0`}>
                <div className="p-5 lg:0 relative">
                  <h3 className="text-[#F2F2F2] text-sm font-bold absolute text-end px-[10px] py-[6px] max-w-[520px] lg:max-w-[1200px] mx-auto" style={{width:"calc(100% - 40px)"}}>Now open</h3>
                  <img src={`${import.meta.env.VITE_ERP_URL}${d.store_image}`} className="rounded-[8px] w-full aspect-[3/2] object-cover"/>
                </div>

                <div className="p-5 pt-0 flex justify-between lg:flex-col lg:justify-start">
                  <h2 className="text-sm text-[#333333] font-bold lg:text-[22px]">{d.store_name}</h2>
                  <p className="text-[#8A8A8A] text-sm hidden lg:block mt-1 font-normal">{d.location}<br/>เบอร์ติดต่อ : {d.contact_phone}</p>
                  <ChevronRight className="lg:hidden"/>
                </div>
              </Link>
            </>
          ))}
        </section>
      </main>
    </>
  )
}