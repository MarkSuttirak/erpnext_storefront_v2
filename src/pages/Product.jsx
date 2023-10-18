import { useCounter } from 'react-use';
import { clamp } from '@storefront-ui/shared';
import { React, useState, useContext, useEffect, useRef } from 'react';
import {
    SfButton,
    SfLink,
    SfIconShoppingCart,
    SfIconSell,
    SfIconPackage,
    SfIconRemove,
    SfIconAdd,
    SfIconWarehouse,
    SfIconSafetyCheck,
    SfIconShoppingCartCheckout,
    SfIconFavorite,
    SfIconArrowForward,
    SfScrollable
} from '@storefront-ui/react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { ArrowLeft, ShoppingBag01, Heart, CoinsStacked01, Truck01, AnnotationDots, Share04, SwitchHorizontal01 } from '@untitled-ui/icons-react';
import Accordion from '../components/Accordion';
import ProductCard from '../components/ProductCard';
import { useFrappeCreateDoc, useFrappeDeleteDoc, useFrappeGetDoc } from 'frappe-react-sdk';

const Product = () => {
    const { id } = useParams();
    const { get, products } = useProducts();
    const { cart, addToCart, cartCount, setIsOpen } = useCart();
    const product = get(id);
    const sizeRef = useRef(null)
    const inputId = "useId('input')";
    const min = 1;
    const max = 999;
    const [value, { inc, dec, set }] = useCounter(min);
    const [colour, setColour] = useState("ส้ม")

    const navigate = useNavigate()

    const [liked, setLiked] = useState(false)

    const productSizes = [36, 37, 38, 39, 40, 41]

    const productSizeTable = [
      {
        size:36,
        usa:5.5,
        cm:22.5
      },
      {
        size:37,
        usa:6.5,
        cm:23.5
      },
      {
        size:38,
        usa:7.5,
        cm:24.5
      },
      {
        size:39,
        usa:8,
        cm:25.5
      },
      {
        size:40,
        usa:9,
        cm:26
      },
      {
        size:41,
        usa:10,
        cm:27
      },
      {
        size:42,
        usa:11,
        cm:28
      },
    ]

    const items = [
      {
        title: "ตารางขนาด",
        content: (
        <>
          <table className='w-full'>
            <thead className='bg-[#E3E3E3]'>
              <tr className='text-left'>
                <th className='px-6 py-2 w-1/3 box-border border border-[#E3E3E3]'>ไซส์</th>
                <th className='px-6 py-2 w-1/3 box-border border border-[#E3E3E3]'>USA</th>
                <th className='px-6 py-2 w-1/3 box-border border border-[#E3E3E3]'>CM</th>
              </tr>
            </thead>
            <tbody>
              {productSizeTable.map((p) => 
                <tr key={p.size} className='text-left'>
                  <th className='px-6 py-2 w-1/3 border border-[#E3E3E3] box-border'>{p.size}</th>
                  <td className='px-6 py-2 w-1/3 border border-[#E3E3E3] box-border'>{p.usa}</td>
                  <td className='px-6 py-2 w-1/3 border border-[#E3E3E3] box-border'>{p.cm}</td>
                </tr> 
              )}
            </tbody>
          </table>
        </>
        )
      },
      {
        title: "วัสดุ",
        content: "Test"
      },
    ]

    useEffect(() => {
      window.scrollTo(0,0)
    }, [])

    return (
      <>
        <header className='p-[8px] bg-black w-full text-center text-white'>
          <p>สมาชิกใหม่รับ ของขวัญฟรี กดรับเลย !! 🎁</p>
        </header>
        <nav className='flex justify-between p-4 absolute top-[40px] z-[999] w-full max-w-[520px]'>
          <Link to="/" className='p-[9px] rounded-[99px] bg-[#FFFFFF94]' style={{backdropFilter:"blur(6px)"}}>
            <ArrowLeft />
          </Link>
          <button className='p-[9px] rounded-[99px] bg-[#FFFFFF94]' style={{backdropFilter:"blur(6px)"}} onClick={() => navigate('/cart')}>
            <ShoppingBag01 />
          </button>
        </nav>
        <main className="mx-auto">
          <div className="relative flex w-full max-h-[600px] aspect-[4/3]">
            <SfScrollable
              className="relative w-full h-full snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              direction="vertical"
              wrapperClassName="w-full"
              buttonsPlacement="none"
              drag={{ containerWidth: true }}
            >
              <div className="flex justify-center h-full basis-full shrink-0 grow snap-center">
                <img
                  src={product?.website_image !== null && `${import.meta.env.VITE_ERP_URL}${product?.website_image}`}
                  className={`object-cover w-full h-full ${product?.website_image === null && "bg-[#C5C5C5]"}`}
                  aria-label={product?.website_image}
                  alt={product?.website_image}
                />
              </div>
            </SfScrollable>
          </div>
            <section className="mt-4 px-4">
              <div className='w-full'>
                <p className='text-[#625C5C] text-sm'>{product?.item_group}</p>
                <h1 className="mt-2 font-bold typography-headline-4">
                  {product?.item_name}
                </h1>
                <span className="block text-[22px] inter font-medium mt-[21px]">{product?.formatted_price}</span>
              </div>
              <div className='mt-6 mb-3'>
                <p>สี: {colour}</p>

                <div className='flex mt-[14px] gap-x-[10px]'>
                  <div className={`w-6 h-6 bg-[#F54E06] rounded-[99px] border-[2px] border-white ${colour === "ส้ม" ? "outline outline-black" : "outline outline-white"}`} onClick={() => setColour("ส้ม")}></div>
                  <div className={`w-6 h-6 bg-black rounded-[99px] border-[2px] border-white ${colour === "ดำ" ? "outline outline-black" : "outline outline-white"}`} onClick={() => setColour("ดำ")}></div>
                </div>
              </div>
              <div className='mt-6 mb-3'>
                <p>ขนาด: <span className='text-[#8A8A8A]'>กรุณาเลือก 1 ขนาด</span></p>

                <div className='flex gap-x-4 gap-y-3 flex-wrap mt-[14px]'>
                  {productSizes.map((size) => 
                    <label htmlFor={size} className='size-btn'>
                      <input type="checkbox" name="size" id={size} className='size-input' ref={sizeRef} onClick={(e) => {e.target.checked ? setAccordionActiveTwo(true) : setAccordionActiveTwo(false)}}/>
                      <span className='size-text'>{size}</span>
                    </label>
                  )}
                </div>
              </div>
            </section>

            <div className='flex p-[30px] justify-between border-y border-y-[#E3E3E3]'>
              <button className='text-sm text-[#00B14F] text-center gap-x-[6px] flex items-center'>
                <AnnotationDots viewBox='0 0 24 24' width="18" height="18"/>
                ติดต่อเรา
              </button>
              <button className='text-sm text-[#00B14F] text-center gap-x-[6px] flex items-center'>
                <Share04 viewBox='0 0 24 24' width="18" height="18"/>
                แชร์สินค้า
              </button>
              <button className='text-sm text-[#00B14F] text-center gap-x-[6px] flex items-center'>
                <SwitchHorizontal01 viewBox='0 0 24 24' width="18" height="18"/>
                เปรียบเทียบสินค้า
              </button>
            </div>

            <div className='p-[30px] border-b border-b-[#E3E3E3]'>
              <div className="flex mt-4">
                <CoinsStacked01 />
                <div className='block ml-3'>
                  <h3 className="text-sm">Perks</h3>
                  <p className="text-xs text-[#8A8A8A]">
                    รับ Cashback & สิทธิพิเศษอีกมากมาย
                  </p>
                  <SfLink href="#" variant="secondary" className="text-[#00B14F] text-sm" style={{textDecoration:"none"}}>
                    ต้องทำอย่างไร
                  </SfLink>
                </div>
              </div>
              <div className="flex mt-4">
                <Truck01 />
                <div className='block ml-3'>
                  <h3 className="text-sm">ส่งฟรีเมื่อซื้อสินค้าครบ 990 บาท</h3>
                  <p className="text-xs text-[#8A8A8A]">
                    รอรับสินค้าได้เลย
                  </p>
                </div>
              </div>
            </div>

            <Accordion items={items} />

            <div className='pt-2 px-5'>
              {cart[product?.item_code] && (
                <div className="bg-primary-100 text-primary-700 flex justify-center gap-1.5 py-1.5 typography-text-sm items-center mb-4 rounded-md">
                  <SfIconShoppingCartCheckout />{cart[product?.item_code]} in cart
                </div>
              )}
              <div className="items-start flex">
                <SfButton onClick={() => addToCart(product?.item_code, value)} type="button" size="lg" className="w-full" style={{backgroundColor:"black"}}>
                  สั่งซื้อสินค้า
                </SfButton>
                  <SfButton
                    type="button"
                    variant="tertiary"
                    size="lg"
                    square
                    className="bg-white border border-black ml-4 basis-[20%] text-center py-3 w-[62px] h-[48px]"
                    aria-label="Add to wishlist"
                  >
                    <Heart color={liked ? "red" : "black"} />
                  </SfButton>
              </div>
            </div>

            <div className='mt-[22px]'>
              <h2 className='text-[#3D3D3D] font-bold flex items-center px-5 mb-[14px] leading-6'>
                หากคุณชอบสไตล์นี้
                <SfIconArrowForward className="w-[18px] text-black ml-2"/>
              </h2>

                <div className="flex overflow-x-auto gap-x-[14px] mx-auto px-5">
                  {(products ?? []).map((product) => (
                    <ProductCard
                      key={product.item_code}
                      title={product.item_name}
                      productId={product.name}
                      itemCode={product.item_code}
                      price={product.formatted_price}
                      thumbnail={product.website_image ? `${import.meta.env.VITE_ERP_URL}${product?.website_image}` : "https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/sneakers.png"} />
                  ))}
                </div>
            </div>
        </main>
      </>
    )
}

export default Product