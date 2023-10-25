import React, { useState, useMemo, useEffect } from 'react'
import TitleHeader from '../../components/TitleHeader'
import coinHand from '../../img/coins-hand.svg'
import spentCoins from '../../img/spentCoins.png'
import { Link } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import { useFrappeGetCall, useFrappeGetDoc } from 'frappe-react-sdk';
import FooterMenu from '../../components/FooterMenu';
import Skeleton from '../../components/Skeleton';
import TabButton from '../../components/TabButton';
import DesktopSidebar from '../../components/desktop/DesktopSidebar';

export default function RewardHistory() {
  const [currentTab, setCurrentTab] = useState('คะแนนที่ได้รับ');
  const { user } = useUser()
  const { data } = useFrappeGetCall('headless_e_commerce.api.get_loyalty_points_details');
  const [loading, setLoading] = useState(true)

  const tabData = [
    {
      title: 'ส่วนลด 5 % สินค้าที่ร่วมรายการ',
      description: '26 ก.พ. 2022',
      coins: "+10",
      image: coinHand,
    }
  ]
  const tabDataRedeemed = [
    {
      title: 'ส่วนลด 5 % สินค้าที่ร่วมรายการ',
      description: '26 ก.พ. 2022',
      coins: "-10",
      image: coinHand,
    }
  ]
  const tabs = [
    { name: 'คะแนนที่ได้รับ', id: tabData },
    { name: 'คะแนนที่ใช้ไป', id: tabDataRedeemed },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  const entryDistribution = useMemo(() => {
    return data?.message.record.reduce((acc, record) => {
      if (record.loyalty_points > 0) {
        acc.entries.push(record)
      } else {
        if (record.loyalty_points < 0) {
          acc.exits.push(record)
        }
      }
      return acc;
    }, {
      entries: [],
      exits: []
    })
  }, [data])

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, [])

  return (
    <>
      <TitleHeader link='/' title='ประวัติการใช้งานคะแนน' />
      <main className='main-margintop desktop-sec lg:px-5 lg:py-10 flex'>
        <DesktopSidebar />
        <div className='w-full'>
          <div className='fixed mt-[53px] lg:mt-0 max-w-[520px] w-full top-0 lg:static lg:max-w-none'>
            <div className='bg-[#E9F6ED] lg:bg-transparent lg:px-0 flex justify-between p-[18px] items-center lg:border-b lg:border-b-[#F2F2F2]'>
              <div className=''>
                <div className='flex items-center'>
                  <h4 className='font-bold text-[#00B14F] text-[26px] mr-[7px]'>{user?.loyalty_points}</h4>
                  <p className='font-normal font-xs text-[17px] text-[#00B14F] bg-none'>คะแนนที่ใช้ได้</p>
                </div>
                <p className='font-normal text-[#424242] text-xs leading-[17.4px]'>21 คะแนนจะหมดอายุ 31 ม.ค. 2024 </p>
              </div>
              <div>
                <Link to='/my-order' className='bg-[#00B14F] text-sm font-bold px-[6px] py-[4px] font-sm rounded-md  text-white leading-[20.3px]'>รางวัลของฉัน</Link>
              </div>
            </div>

            <div className='block m-auto lg:my-[30px]'>
              {tabs.map((t) => (
                <TabButton key={t.name} title={t.name} isActive={currentTab === t.name} onClick={() => setCurrentTab(t.name)} totalTabs={tabs.length}/>
              ))}
            </div>
          </div>

          <div className={`mt-[214px] ${currentTab === 'คะแนนที่ได้รับ' ? "mb-[18px]" : ""}`}>
            {!loading ? (
              <>
                {tabs.map((tab) => (
                <div key={tab.name} className={currentTab === tab.name ? 'space-y-[18px]' : 'hidden'}>
                    {tab.name == 'คะแนนที่ได้รับ' ?
                      <>
                        {
                          entryDistribution?.entries.map((entry) => (
                            <div className="border-b border-[#E3E3E3]" key={entry.name}>
                              <div className="flex justify-between items-center pb-[18px] px-[18px]">
                                <div className="flex items-center">
                                  <div><img src={coinHand} className="w-[22px] h-[22px] ml-[27px]" alt="" /></div>
                                  <div className="ml-[43px]">
                                    <p className="mt-[6px] font-bold text-xs text-[#000000] leading-[14px]" style={{ fontFamily: "Eventpop" }}>คุณได้รับคะแนน</p>
                                  </div>
                                </div>
                                <div>
                                  <button className="font-bold text-[#00B14F] text-xs leading-[14px]" style={{ fontFamily: "Eventpop" }}>+{entry.loyalty_points} คะแนน</button>
                                </div>
                              </div>
                            </div>
                          ))
                        }
                      </> : <>
                        {
                          entryDistribution?.exits.map((exit) => (
                            <div className="border-b border-[#E3E3E3]" key={exit.name}>
                              <div className="flex justify-between items-center pb-[18px] px-[18px]">
                                <div className="flex items-center">
                                  <div><img src={spentCoins} className="w-[22px] h-[22px] ml-[27px]" alt="" /></div>
                                  <div className="ml-[43px]">
                                    <p className="mt-[6px] font-bold text-xs text-[#111111] leading-[14px]">คะแนนที่ถูกใช้</p>
                                    {/* <p className="mt-[9px] font-bold text-xs text-[#00B14F] leading-[14px]" style={{ fontFamily: "Eventpop" }}>{exit.invoice}</p> */}
                                    <p className="mt-[9px] font-normal text-[10px] text-[#00000061] leading-[14.5px]" style={{ fontFamily: "Eventpop" }}>{exit.posting_date}</p> 
                                  </div>
                                </div>
                                <div>
                                  <button className="font-bold text-[#8A8A8A] text-xs leading-[14px]" style={{ fontFamily: "Eventpop" }}>{exit.loyalty_points} คะแนน</button>
                                </div>
                              </div>
                            </div>
                          ))
                        }
                      </>
                    }
                </div>
            ))}
          </>
            ) : (
              <div>
                <div className='pb-[18px] px-5 pt-[37px] border-b border-b-[#E3E3E3]'>
                  <Skeleton width='100%' height='21px' borderRadius='4px'/>
                </div>
                <div className='pb-[18px] px-5 pt-[37px] border-b border-b-[#E3E3E3]'>
                  <Skeleton width='100%' height='21px' borderRadius='4px'/>
                </div>
                <div className='pb-[18px] px-5 pt-[37px] border-b border-b-[#E3E3E3]'>
                  <Skeleton width='100%' height='21px' borderRadius='4px'/>
                </div>
                <div className='pb-[18px] px-5 pt-[37px] border-b border-b-[#E3E3E3]'>
                  <Skeleton width='100%' height='21px' borderRadius='4px'/>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <FooterMenu active={2} />
    </>
  )
}