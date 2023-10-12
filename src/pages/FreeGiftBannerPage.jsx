import { Gift01 } from "@untitled-ui/icons-react"
import TitleHeader from "../components/TitleHeader"
import promotion1 from '../img/promotion1.png'
import promotion2 from '../img/promotion2.png'
import PromotionCardDesktop from "../components/desktop/PromotionCardDesktop"

const FreeGiftBannerPage = () => {
  
  return (
    <>
      <TitleHeader title="ของขวัญและดีลต่างๆ" link="/" icon={<Gift01 />}/>
      <main className="main-margintop p-5">
        <img src={promotion1} className='lg:w-1/2'/>
        <img src={promotion2} className='lg:w-1/2'/>
      </main>
    </>
  )
}

export default FreeGiftBannerPage