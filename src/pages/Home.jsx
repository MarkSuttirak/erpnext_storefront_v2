import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import PromotionCard from '../components/PromotionCard';
import BlogCard from '../components/BlogCard';
import { useProducts } from '../hooks/useProducts'
import { useFrappeAuth, useFrappeGetDocCount, useFrappeGetDocList, useFrappeGetCall } from 'frappe-react-sdk';
import { SfIconArrowForward } from '@storefront-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import banner from '../img/banner.png'
import coin from '../img/coin.svg'
import coupon from '../img/coupon.svg'
import promotion1 from '../img/promotion1.png'
import promotion2 from '../img/promotion2.png'
import NavHeader from '../components/NavHeader';
import FooterMenu from '../components/FooterMenu'
import { useUser } from '../hooks/useUser';
import PromotionCardDesktop from '../components/desktop/PromotionCardDesktop';
import { useMediaQuery } from 'react-responsive'
import { SearchMd } from '@untitled-ui/icons-react';

export default function Home(){
  const { updateCurrentUser } = useFrappeAuth();
  const { products, userdata } = useProducts();
  const [loading, setLoading] = useState(true);
  const [data, setUserdata] = useState(null);
  const navigate = useNavigate();
  const [profileloading, setProfileloading] = useState(true);

  const isDesktop = useMediaQuery({ minWidth: 1024 });

  const { user } = useUser()

  const { data:couponNum } = useFrappeGetDocCount('Coupon Code')

  useEffect(() => {
    if (userdata) {
      setUserdata(userdata.user);
      setProfileloading(false);
    }
    updateCurrentUser();
    if (products) {
      setLoading(false)
    }
  }, [userdata]);

  const { data:dataShortcut, isLoading:isLoadingShortcut, error:errorShortcut } = useFrappeGetDocList('Shortcut Menus', {
    fields: ['name', 'image', 'title', 'link'],
    limit: 8
  })

  const { data:dataBlog, isLoading:isLoadingBlog, error:errorBlog } = useFrappeGetDocList('Blog Post', {
    fields: ['name', 'title', 'meta_image', 'published_on', 'post_display'],
    filters: [['post_display', '=', 'Storefront']],
    limit: isDesktop ? 2 : undefined
  })

  const { data:dataBanner, isLoading:isLoadingBanner, error:errorBanner } = useFrappeGetDocList('Promotion Banner', {
    fields: ['name', 'title', 'image', 'expiration_date'],
    limit: isDesktop ? 3 : undefined
  })

  return (
    <>
      <NavHeader />
      <div className='lg:mt-[92px]'>
        <img src={banner} className='w-full left-0 max-h-[240px] lg:max-h-[600px] object-cover'/>
        <header className='m-3 bg-white relative pl-5 py-1 m-auto rounded-[6px] top-[-30px] flex lg:hidden max-w-[1200px] mx-auto' style={{filter:"drop-shadow(0 4px 20px #6363630D)",width:"calc(100% - 40px)"}}>
          <div className='w-[80%] py-2'>
            <div className='flex'>
              <div className='basis-1/3 flex gap-x-1 text-[13px]'>
                <span className='text-[#1BB040]'>฿ </span>
                850
              </div>
              <div className='basis-1/3 flex gap-x-1 text-[13px]'>
                <img src={coin}/>
                {user ? user.loyalty_points : '...'}
              </div>
              <div className='basis-1/3 flex gap-x-1 text-[13px]'>
                <img src={coupon}/>
                {couponNum ? couponNum : '...'}
              </div>
            </div>

            <div className='flex mt-[2px]'>
              <div className='basis-1/3 inter text-xs text-[#4C4B4F]'>
                <Link to="/my-account">Wallet</Link>
              </div>
              <div className='basis-1/3 inter text-xs text-[#4C4B4F]'>
                Coins
              </div>
              <div className='basis-1/3 inter text-xs text-[#4C4B4F]'>
                <Link to="/my-coupon">Coupon</Link>
              </div>
            </div>
          </div>

          <Link to='/search' className='border-l border-l-[#E8E8E8] w-[20%]'>
            <div className='h-full flex items-center justify-center'>
              <SearchMd color='#8A8A8A'/>
            </div>
          </Link>
        </header>
        <main className='relative top-[-10px] lg:top-5 pb-[94px] desktop-sec'>
          <div className='grid grid-cols-4 lg:grid-cols-8 gap-2 lg:gap-8 px-5 lg:px-10 lg:mt-[60px]'>
            {(dataShortcut ?? []).map((d) => 
              <a href={d.link} key={d.name} className='cursor-pointer lg:w-[75%] lg:h-[75%]'>
                <picture className='flex flex-col justify-start text-center'>
                  <img src={`${import.meta.env.VITE_ERP_URL}${d.image}`} className='lg:max-w-[60px] lg:max-h-[60px] max-w-[46px] max-h-[46px] w-full h-full mx-auto aspect-square'/>
                  <p className='text-xs text-[#1C1C1C] mt-3'>{d.name}</p>
                </picture>
              </a>
            )}
          </div>

          <div className="mt-[30px] lg:mt-[70px]">
            <div className='lg:flex justify-between items-center mb-[14px] lg:mb-10'>
              <h2 className='px-5 font-semibold text-[#3D3D3D] lg:text-[40px] lg:font-bold eventpop'>Celebrate Mid Year Festival</h2>
              <Link to='/blog' className='lg:flex hidden gap-x-2 px-5 mb-[14px] text-[#66BC89]'>
                ดูทั้งหมด
                <SfIconArrowForward className="w-[18px] text-[#66BC89]"/>
              </Link>
            </div>

            {isDesktop ? (
              <div className={`px-5 hidden lg:grid grid-cols-3 gap-x-6`}>
                {(dataBanner ?? []).map((banner) => 
                  <PromotionCardDesktop key={banner.name} link="/checkout" title={banner.title} image={banner.image} date="อายุการใช้งาน 1 เดือนหลังจากได้รับคูปอง" ratio='1'/>
                )}
              </div>
            ) : (
              <div className='mt-3 flex overflow-x-scroll gap-x-6 px-5 lg:hidden'>
                {(dataBanner ?? []).map((banner) => 
                  <PromotionCard key={banner.name} link="/checkout" title={banner.title} image={banner.image} date="อายุการใช้งาน 1 เดือนหลังจากได้รับคูปอง" />
                )}
              </div>
            )}
          </div>

          <div className='mt-[22px]'>
            <div className='lg:mt-[78px] lg:mb-8'>
              <h2 className='text-[#3D3D3D] font-bold flex items-center px-5 mb-[14px] leading-6 lg:justify-center lg:text-[40px]'>
                สินค้าลดราคา
                <SfIconArrowForward className="w-[18px] text-black ml-2 lg:hidden"/>
              </h2>
              <div className='hidden lg:flex gap-x-6 justify-center mt-6'>
                <button className='text-[#66BC89] underline'>สินค้าทั้งหมด</button>
                <button className='text-[#777777]'>สินค้ามาใหม่</button>
                <button className='text-[#777777]'>ลดสูงสุด</button>
              </div>
            </div>

            <div className="flex overflow-x-auto gap-x-5 lg:grid lg:grid-cols-4 mx-auto px-5">
              {(products ?? []).map((product) => (
                <ProductCard
                  key={product.item_code}
                  title={product.item_name}
                  productId={product.name}
                  desc={product.item_group}
                  itemCode={product.item_code}
                  price={product.formatted_price}
                  thumbnail={product.website_image ? `${import.meta.env.VITE_ERP_URL}${product.website_image}` : "https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/sneakers.png"}
                  isGift={product?.item_group === "Gift" || product?.item_group === "Gift and Cards"}
                />
              ))}
            </div>
          </div>

          <div className='lg:hidden'>
            <div className='mt-[22px]'>
              <h2 className='text-[#3D3D3D] font-bold flex items-center px-5 mb-[14px] leading-6'>
                สินค้าลดราคา
                <SfIconArrowForward className="w-[18px] text-black ml-2"/>
              </h2>

              <div className="flex overflow-x-auto gap-x-5 mx-auto px-5 lg:grid lg:grid-cols-4">
                {(products ?? []).map((product) => (
                  <ProductCard
                    key={product.item_code}
                    title={product.item_name}
                    productId={product.name}
                    desc={product.item_group}
                    itemCode={product.item_code}
                    price={product.formatted_price}
                    thumbnail={product.website_image ? `${import.meta.env.VITE_ERP_URL}${product.website_image}` : "https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/sneakers.png"}
                    isGift={product?.item_group === "Gift" || product?.item_group === "Gift and Cards"}
                  />
                ))}
              </div>
            </div>

            <div className='mt-[22px]'>
              <h2 className='text-[#3D3D3D] font-bold flex items-center px-5 mb-[14px] leading-6'>
                สินค้าลดราคา
                <SfIconArrowForward className="w-[18px] text-black ml-2"/>
              </h2>

              <div className="flex overflow-x-auto gap-x-5 mx-auto px-5 lg:grid lg:grid-cols-4">
                {(products ?? []).map((product) => (
                  <ProductCard
                    key={product.item_code}
                    title={product.item_name}
                    productId={product.name}
                    desc={product.item_group}
                    itemCode={product.item_code}
                    price={product.formatted_price}
                    thumbnail={product.website_image ? `${import.meta.env.VITE_ERP_URL}${product.website_image}` : "https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/sneakers.png"}
                    isGift={product?.item_group === "Gift" || product?.item_group === "Gift and Cards"}
                  />
                ))}
              </div>
            </div>
          </div>

          <h2 className='mt-[30px] px-5 font-semibold text-[#3D3D3D] lg:text-[40px] lg:font-bold eventpop mb-[14px] lg:mb-10'>Celebrate Mid Year Festival</h2>

          {isDesktop ? (
            <div className={`px-5 hidden lg:grid ${dataBlog?.length > 2 ? 'grid-cols-3' : dataBlog?.length == 2 ? 'grid-cols-2' : 'grid-cols-1'} gap-x-6`}>
              {(dataBlog ?? []).map((d) => 
                <PromotionCardDesktop key={d.name} image={d.meta_image} title={d.title} date={d.published_on} link={`/single-blog/${d.name}`} ratio='16/9'/>
              )}
            </div>
          ) : (
            <div className="flex overflow-x-auto gap-x-5 mx-auto px-5 lg:hidden">
              {(dataBlog ?? []).map((d) => 
                <BlogCard key={d.name} image={d.meta_image} title={d.title} date={d.published_on} link={`/single-blog/${d.name}`}/>
              )}
            </div>
          )}

          <div className='flex flex-col lg:flex-row gap-y-[11px] lg:gap-x-6 mt-[30px] px-5'>
            <img src={promotion1} className='lg:w-1/2'/>
            <img src={promotion2} className='lg:w-1/2'/>
          </div>
        </main>
      </div>
      <FooterMenu active={0}/>
    </>
  )
}