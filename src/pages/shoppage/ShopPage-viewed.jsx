import { Link } from "react-router-dom"
import { ArrowLeft, ShoppingBag01 } from "@untitled-ui/icons-react"
import searchIcon from '../../img/search-md-black.svg'
import { useProducts } from "../../hooks/useProducts"
import ProductCard from "../../components/ProductCard"

const ShopPageViewed = () => {
  const { products } = useProducts()

  return (
    <>
      <header className={`p-[14px] border-b border-b-[#F2F2F2] text-md font-bold bg-white flex justify-between items-center fixed w-full top-0 z-[999]`}>
        <div className="flex items-center gap-x-[7px]">
          <Link to='/shop/search'>
            <ArrowLeft />
          </Link>
          ไอเท็มใหม่
        </div>

        <div className="flex items-center">
          <Link to='/shop/search' className="px-2">
            <img src={searchIcon} />
          </Link>
          <button className="px-2" onClick={() => setIsOpen(true)}>
            <ShoppingBag01 viewBox='0 0 24 24' width="22" height="22"/>
          </button>
        </div>
      </header>
      <header className='bg-black text-white text-center py-[10px] fixed w-full top-0 z-[999] mt-[53px]'>
        สมาชิกใหม่รับ ของขวัญฟรี กดรับเลย !! 🎁
      </header>
      <main className="mt-[97px]">
        <section className="p-5 flex flex-wrap justify-between gap-y-[14px]">
          {(products ?? []).map((product) => (
            <ProductCard
              key={product.item_code}
              title={product.name}
              productId={product.name}
              itemCode={product.item_code}
              price={product.formatted_price}
              thumbnail={product.website_image ? product.website_image : "https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/sneakers.png"} 
            />
          ))}
        </section>
      </main>
    </>
  )
}

export default ShopPageViewed