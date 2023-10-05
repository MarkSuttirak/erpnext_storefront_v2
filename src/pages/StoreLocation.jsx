import { Link } from "react-router-dom";
import { ArrowLeft, ShoppingBag01, ChevronRight, PhoneCall01 } from "@untitled-ui/icons-react";
import central from '../img/central.png'
import centralrama9map from '../img/central-rama9-map.png'
import { useRef } from "react";
import { useFrappeGetDocList } from 'frappe-react-sdk'

const StoreLocation = () => {
  const { data } = useFrappeGetDocList('Store Location', {
    fields: ['name', 'store_name', 'location', 'store_image', 'opening_time_monday', 'closing_time_monday', 'opening_time_tuesday', 'closing_time_tuesday', 'opening_time_wednesday', 'closing_time_wednesday', 'opening_time_thursday', 'closing_time_thursday', 'opening_time_friday', 'closing_time_friday', 'opening_time_saturday', 'closing_time_saturday', 'opening_time_sunday', 'closing_time_sunday', 'contact_phone', 'map', 'store_location']
  })

  const Accordion = ({items}) => {
    const content = useRef(null);

    const handleClick = (event) => {
      event.currentTarget.classList.toggle("active");
      var panel = event.currentTarget.nextElementSibling;

      if (panel.style.maxHeight){
        panel.style.maxHeight = null
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    }
    return (
      <div>
        {items.map((item, index) => {
          return (<div key={index}>
            <button onClick={handleClick} className={`p-[18px] w-full flex justify-between accordion-btn`}>
              {item.title}
              <ChevronRight className={`accordion-arrow-anim`}/>
            </button>
            <div ref={content} className={`accordion-detail`}>
              <div className="px-5 pb-[30px]">{item.content}</div>
            </div>
            <hr className="border-[#E3E3E3]"/>
          </div>)
        })}
      </div>
    )
  }

  return (
    <>
      <header className={`p-[14px] border-b border-b-[#F2F2F2] text-md font-bold bg-white flex justify-between items-center fixed w-full top-0 z-[999]`}>
        <div className="flex items-center gap-x-[7px]">
          <Link to='/categories'>
            <ArrowLeft />
          </Link>
          หน้าร้านของเรา
        </div>

        <div className="flex items-center">
          <button className="px-2" onClick={() => setIsOpen(true)}>
            <ShoppingBag01 viewBox='0 0 24 24' width="22" height="22"/>
          </button>
        </div>
      </header>
      <main className="mt-[53px] mb-[40px]">
        <div className="text-center pt-5">
          <h2 className="text-[#333333] text-[20px] font-bold">Store Location</h2>
          <p className="text-[#8A8A8A] text-xs mt-2">มาช้อปปิ้งหรือมารับสินค้าที่ร้านสาขาใกล้คุณ !</p>
        </div>

        <section className="relative">
          {(data ?? []).map((d) => (
            <>
              <div className="p-5 pb-0">
                <h3 className="text-[#F2F2F2] text-sm font-bold absolute text-end px-[10px] py-[6px]" style={{width:"calc(100% - 40px)"}}>Now open</h3>
                <img src={`${import.meta.env.VITE_ERP_URL}${d.store_image}`} className="rounded-[8px]"/>
              </div>

              <Accordion items={[{
                title:(
                  <p className="text-[#333333] text-sm font-bold">{d.store_name}</p>
                ),
                content: (
                  <>
                    <p className="text-[#333333] text-xs mb-5">{d.location}</p>
                    <a href={`tel:${d.contact_phone}`} className='w-full bg-white border border-[#111111] text-[#111111] rounded-[9px] p-3 flex justify-center items-center gap-x-[10px] text-xs font-bold'>
                      <PhoneCall01 viewBox='0 0 24 24' width='18' height='18' />
                      ติดต่อสาขา
                    </a>

                    <div className="mt-5">
                      <h2 className="text-[#111111] text-[15px] font-bold mb-[10px]">เวลาเปิด-ปิด</h2>
                      <div className="flex flex-col gap-y-[10px]">
                        <div className="flex text-[#333333] text-xs">
                          <p className="w-[40%]">วันจันทร์:</p>
                          <p className="w-[60%]">{d.opening_time_monday} - {d.closing_time_monday}</p>
                        </div>
                        <div className="flex text-[#333333] text-xs">
                          <p className="w-[40%]">วันอังคาร:</p>
                          <p className="w-[60%]">{d.opening_time_tuesday} - {d.closing_time_tuesday}</p>
                        </div>
                        <div className="flex text-[#333333] text-xs">
                          <p className="w-[40%]">วันพุธ:</p>
                          <p className="w-[60%]">{d.opening_time_wednesday} - {d.closing_time_wednesday}</p>
                        </div>
                        <div className="flex text-[#333333] text-xs">
                          <p className="w-[40%]">วันพฤหัสบดี:</p>
                          <p className="w-[60%]">{d.opening_time_thursday} - {d.closing_time_thursday}</p>
                        </div>
                        <div className="flex text-[#333333] text-xs">
                          <p className="w-[40%]">วันศุกร์:</p>
                          <p className="w-[60%]">{d.opening_time_friday} - {d.closing_time_friday}</p>
                        </div>
                        <div className="flex text-[#333333] text-xs">
                          <p className="w-[40%]">วันเสาร์:</p>
                          <p className="w-[60%]">{d.opening_time_saturday} - {d.closing_time_saturday}</p>
                        </div>
                        <div className="flex text-[#333333] text-xs">
                          <p className="w-[40%]">วันอาทิตย์:</p>
                          <p className="w-[60%]">{d.opening_time_sunday} - {d.closing_time_sunday}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5">
                      <h2 className="text-[#111111] text-[15px] font-bold mb-[10px]">สถานที่ตั้ง</h2>
                      {d.map}

                      <p className="mt-[10px] text-xs text-[#333333]">{d.store_location}</p>
                    </div>
                  </>
                )
              }]}/>
            </>
          ))}
        </section>
      </main>
    </>
  )
}

export default StoreLocation;