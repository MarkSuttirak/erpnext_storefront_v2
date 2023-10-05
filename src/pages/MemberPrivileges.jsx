import { useState, useRef } from "react"
import TitleHeader from "../components/TitleHeader"
import bronzeMember from '../img/bronze-member.png'
import silverMember from '../img/silver-member.png'
import goldMember from '../img/gold-member.png'
import diamondMember from '../img/diamond-member.png'
import { ShoppingBag02, Star01, Mail01, ChevronRight, HeartHand, MarkerPin01, Building02, Tag03, Gift01, User02 } from "@untitled-ui/icons-react"

const MemberPrivileges = (current) => {
  const tabs = [
    {
      title: 'สมาชิก',
      type: 'bronze'
    },
    {
      title: 'ซิลเวอร์',
      type: 'silver'
    },
    {
      title: 'โกลด์',
      type: 'gold'
    },
    {
      title: 'ไดมอนด์',
      type: 'diamond'
    }
  ]

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

  const [type, setType] = useState('bronze');

  const PrivilegeList = ({icon, title, desc}) => {
    return (
      <div className="flex items-center">
        <div className="bg-[#F3F3F3] rounded-[99px] p-[10px]">
          {icon}
        </div>
        <div className="ml-3">
          <h2 className="text-[#333333] text-sm font-bold">{title}</h2>
          <p className="text-[#8A8A8A] text-xs">{desc}</p>
        </div>
      </div>
    )
  }

  const bronzePrivileges = [
    {
      icon: (<ShoppingBag02 />),
      title: "Privilege",
      desc: "สิทธิพิเศษจากทางร้านและสินค้าที่ร่วมรายการ"
    },
    {
      icon: (<Star01 />),
      title: "Point",
      desc: "สะสมคอยน์เพื่อแลกรับสิทธิประโยชน์ต่างๆ"
    },
    {
      icon: (<Mail01 />),
      title: "News",
      desc: "รับรู้ข่าวสารและโปรโมชั่นก่อนใคร"
    },
  ]

  const silverPrivileges = [
    {
      icon: (<HeartHand />),
      title: "Service",
      desc: "บริการสุดพิเศษสำหรับลูกค้าซิลเวอร์เท่านั้น"
    },
    {
      icon: (<MarkerPin01 />),
      title: "ส่วนลดจากร้านในเครือ",
      desc: "ร้านค้าในเครือมากกว่า 20 สาขา"
    },
    {
      icon: (<Building02 />),
      title: "ฟรีเครื่องดื่ม",
      desc: "แลกรับเครื่องดื่มฟรีร้านอาหารในเครือ"
    },
  ]

  const goldPrivileges = [
    {
      icon: (<Star01 />),
      title: "Point",
      desc: "รับคะแนนแบบ 2 เท่าทุกการซื้อ"
    },
    {
      icon: (<Tag03 />),
      title: "ส่วนลดพิเศษ",
      desc: "ได้รับส่วนลดพิเศษสำหรับคุณโดยเฉพาะ"
    },
    {
      icon: (<Gift01 />),
      title: "ของขวัญ",
      desc: "รับของขวัญสุดพิเศษจากเราทุกปี"
    },
  ]

  const diamondPrivileges = [
    {
      icon: (<User02 />),
      title: "Personal Assistant",
      desc: "บริการผู้ช่วยส่วนตัว ทุกความต้องการของคุณ เราให้คุณอันดับ 1"
    },
    {
      icon: (<ShoppingBag02 />),
      title: "Privilege",
      desc: "สิทธิพิเศษสำหรับร้านค้าในเครือและของขวัญสำหรับคุณ"
    },
    {
      icon: (<Gift01 />),
      title: "ของขวัญ",
      desc: "รับของขวัญสุดพิเศษจากเราทุกเทศกาลและงานประจำปี"
    },
  ]

  return (
    <>
      <TitleHeader link='/member-level' title='สิทธิพิเศษจากระดับสมาชิก' />
      <header className="mt-[53px] fixed w-full top-0 border-b border-b-[#F2F2F2]">
        <button className='w-1/4' onClick={() => setType('bronze')}>
          <span className={`p-4 inline-block text-xs ${type === 'bronze' ? "text-[#111111]" : "text-[#8A8A8A]"}`}>สมาชิก</span>
          {type === 'bronze' && (
            <div className="w-full h-[2px] bg-[#111111] border-anim"></div>
          )}
        </button>
        <button className='w-1/4' onClick={() => setType('silver')}>
          <span className={`p-4 inline-block text-xs ${type === 'silver' ? "text-[#111111]" : "text-[#8A8A8A]"}`}>ซิลเวอร์</span>
          {type === 'silver' && (
            <div className="w-full h-[2px] bg-[#111111] border-anim"></div>
          )}
        </button>
        <button className='w-1/4' onClick={() => setType('gold')}>
          <span className={`p-4 inline-block text-xs ${type === 'gold' ? "text-[#111111]" : "text-[#8A8A8A]"}`}>โกลด์</span>
          {type === 'gold' && (
            <div className="w-full h-[2px] bg-[#111111] border-anim"></div>
          )}
        </button>
        <button className='w-1/4' onClick={() => setType('diamond')}>
          <span className={`p-4 inline-block text-xs ${type === 'diamond' ? "text-[#111111]" : "text-[#8A8A8A]"}`}>ไดมอนด์</span>
          {type === 'diamond' && (
            <div className="w-full h-[2px] bg-[#111111] border-anim"></div>
          )}
        </button>
      </header>

      <main className="mt-[133px]">
        <section style={{background:"linear-gradient(180deg, #FFFFFF 50%, #D9D9D9 100%)"}}>
          <div className={`py-[80px] w-3/4 h-full mx-auto relative bottom-0`} style={{background:`url(${type == 'bronze' ? bronzeMember : type == 'silver' ? silverMember : type == 'gold' ? goldMember : diamondMember}) 0% 0% / contain no-repeat`}}>
            <div className="m-auto z-[5] w-[90%] relative">
              <h2 className="text-[18px] text-[#333333]">ระดับ : สมาชิก</h2>
              <p className="text-[#424242] text-xs">
                {type == 'bronze' ? (
                  'คะแนนตั้งแต่ 0 - 49 คะแนน'
                ) : type == 'silver' ? (
                  'คะแนนตั้งแต่ 50 - 99 คะแนน'
                ) : type == 'gold' ? (
                  'คะแนนตั้งแต่ 100 - 149 คะแนน'
                ) : (
                  'คะแนนตั้งแต่ 150 คะแนนขึ้นไป'
                )}
              </p>
            </div>
          </div>
        </section>
        <section className="px-5 pt-[30px] bg-white relative top-[-65px]">
          <h2 className="text-[#333333] font-bold">สิทธิพิเศษทุกไลฟ์สไตล์</h2>
          <div className="flex flex-col gap-y-[18px] mt-[10px]">
            {type == 'bronze' ? (
              <>
              {bronzePrivileges.map((privilege) => 
                <PrivilegeList icon={privilege.icon} title={privilege.title} desc={privilege.desc}/>
              )}
              </>
            ) : type == 'silver' ? (
              <>
              {silverPrivileges.map((privilege) => 
                <PrivilegeList icon={privilege.icon} title={privilege.title} desc={privilege.desc}/>
              )}
              </>
            ) : type == 'gold' ? (
              <>
              {goldPrivileges.map((privilege) => 
                <PrivilegeList icon={privilege.icon} title={privilege.title} desc={privilege.desc}/>
              )}
              </>
            ) : (
              <>
              {diamondPrivileges.map((privilege) => 
                <PrivilegeList icon={privilege.icon} title={privilege.title} desc={privilege.desc}/>
              )}
              </>
            )}
          </div>
        </section>
        <div className="relative top-[-40px]">
          <button onClick={handleClick} className={`p-5 w-full flex justify-between border-y border-y-[#E3E3E3] accordion-btn`}>
            คำถามที่พบบ่อย
            <ChevronRight className={`accordion-arrow-anim`}/>
          </button>
          <div ref={content} className={`accordion-detail`}>
            <div className="p-5">ได้แต่ตั้งคําถาม แต่ไม่กล้าถามเธอสักครั้ง</div>
          </div>
        </div>
      </main>
    </>
  )
}

export default MemberPrivileges