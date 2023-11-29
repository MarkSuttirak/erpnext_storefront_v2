import { useState, useRef } from "react"
import TitleHeader from "../../components/TitleHeader"
import bronzeMember from '../../img/bronze-member.png'
import silverMember from '../../img/silver-member.png'
import goldMember from '../../img/gold-member.png'
import diamondMember from '../../img/diamond-member.png'
import { ShoppingBag02, Star01, Mail01, ChevronRight, HeartHand, MarkerPin01, Building02, Tag03, Gift01, User02 } from "@untitled-ui/icons-react"
import DesktopSidebar from "../../components/desktop/DesktopSidebar";
import TabButton from "../../components/TabButton"

export default function MemberPrivileges(){
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

  const titleSec = [
    {
      title:'สมาชิก',
      id:1
    },
    {
      title:'ซิลเวอร์',
      id:2
    },
    {
      title:'โกลด์',
      id:3
    },
    {
      title:'ไดมอนด์',
      id:4
    }
  ]

  return (
    <>
      <TitleHeader link='/member-level' title='สิทธิพิเศษจากระดับสมาชิก' />
      <div className='py-10 relative lg:flex desktop-sec main-margintop'>
        <DesktopSidebar />
        <div className="w-full">
          <h2 className='header-title hidden lg:block'>สิทธิพิเศษจากระดับสมาชิก</h2>
          <header className="mt-[53px] lg:mt-0 fixed lg:static w-full top-0 border-b border-b-[#F2F2F2] lg:border-none">
            <div className='block m-auto lg:my-[30px]'>
              {titleSec.map((t) => (
                <TabButton key={t.id} title={t.title} isActive={type === t.title} onClick={() => setType(t.title)} totalTabs={titleSec.length}/>
              ))}
            </div>
          </header>

          <main className="mt-[133px] lg:mt-0 lg:flex lg:gap-x-10">
            <section className='member-gradient'>
              <div className={`member-card-img`} style={{background:`url(${type == 'สมาชิก' ? bronzeMember : type == 'ซิลเวอร์' ? silverMember : type == 'โกลด์' ? goldMember : diamondMember}) 0% 0% / contain no-repeat`}}>
                <div className="m-auto z-[5] w-[90%] relative">
                  <h2 className="text-[18px] text-[#333333] font-bold">ระดับ : {type}</h2>
                  <p className="text-[#424242] text-xs">
                    {type == 'สมาชิก' ? (
                      'คะแนนตั้งแต่ 0 - 49 คะแนน'
                    ) : type == 'ซิลเวอร์' ? (
                      'คะแนนตั้งแต่ 50 - 99 คะแนน'
                    ) : type == 'โกลด์' ? (
                      'คะแนนตั้งแต่ 100 - 149 คะแนน'
                    ) : (
                      'คะแนนตั้งแต่ 150 คะแนนขึ้นไป'
                    )}
                  </p>
                </div>
              </div>
            </section>
            <section className="member-card-text">
              <h2 className="text-[#333333] font-bold">สิทธิพิเศษทุกไลฟ์สไตล์</h2>
              <div className="flex flex-col gap-y-[18px] mt-[10px]">
                {type == 'สมาชิก' ? (
                  <>
                  {bronzePrivileges.map((privilege) => 
                    <PrivilegeList icon={privilege.icon} title={privilege.title} desc={privilege.desc}/>
                  )}
                  </>
                ) : type == 'ซิลเวอร์' ? (
                  <>
                  {silverPrivileges.map((privilege) => 
                    <PrivilegeList icon={privilege.icon} title={privilege.title} desc={privilege.desc}/>
                  )}
                  </>
                ) : type == 'โกลด์' ? (
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
            <div className="relative top-[-40px] lg:hidden">
              <button onClick={handleClick} className={`p-5 w-full flex justify-between border-y border-y-[#E3E3E3] accordion-btn`}>
                คำถามที่พบบ่อย
                <ChevronRight className={`accordion-arrow-anim`}/>
              </button>
              <div ref={content} className={`accordion-detail`}>
                <div className="p-5">ได้แต่ตั้งคําถาม แต่ไม่กล้าถามเธอสักครั้ง</div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}