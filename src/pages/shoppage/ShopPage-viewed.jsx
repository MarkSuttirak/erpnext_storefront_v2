import { Link } from "react-router-dom"
import { ArrowLeft, ShoppingBag01 } from "@untitled-ui/icons-react"
import searchIcon from '../../img/search-md-black.svg'
import { useProducts } from "../../hooks/useProducts"
import ProductCard from "../../components/ProductCard"

export default function ShopPageViewed({setCurrentPage}){
  const { products } = useProducts()

  const handleClickToSearch = () => {
    setCurrentPage('search')
  }

  return (
    <>
      {/* Mobile version */}
      <div className="lg:hidden">
        <header className={`p-[14px] border-b border-b-[#F2F2F2] text-md font-bold bg-white flex justify-between items-center fixed w-full top-0 z-[999]`}>
          <div className="flex items-center gap-x-[7px]">
            <Link to='/shop'>
              <ArrowLeft />
            </Link>
            สินค้าที่ดูล่าสุด
          </div>

          <div className="flex items-center">
            <button onClick={handleClickToSearch} className="px-2">
              <img src={searchIcon} />
            </button>
            <button className="px-2" onClick={() => setIsOpen(true)}>
              <ShoppingBag01 viewBox='0 0 24 24' width="22" height="22"/>
            </button>
          </div>
        </header>
        <header className='bg-black text-white text-center py-[10px] fixed w-full top-0 z-[999] mt-[53px]'>
          12.12 โปรโมชั่นทั้งเว็บไซต์
        </header>
        <main className="mt-[97px]">
          <section className="p-5 flex flex-wrap justify-between gap-y-[14px]">
            {(products ?? []).map((product) => (
              <ProductCard
                key={product.item_code}
                title={product.item_name}
                productId={product.name}
                desc={product.item_group}
                itemCode={product.item_code}
                price={product.formatted_price}
                thumbnail={product.website_image ? `${import.meta.env.VITE_ERP_URL}${product.website_image}` : "https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/sneakers.png"}
              />
            ))}
          </section>
        </main>
      </div>

      {/* Desktop version */}
      <main className="main-margintop p-5 desktop-sec">
        <h2 className="header-title pt-10 pb-[56px] text-center">สินค้าที่ดูล่าสุด</h2>
        <section className="p-5 grid grid-cols-4 gap-6">
          {(products ?? []).map((product) => (
            <ProductCard
              key={product.item_code}
              title={product.item_name}
              productId={product.name}
              desc={product.item_group}
              itemCode={product.item_code}
              price={product.formatted_price}
              thumbnail={product.website_image ? `${import.meta.env.VITE_ERP_URL}${product.website_image}` : "https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/sneakers.png"}
            />
          ))}
        </section>
      </main>
    </>
  )
}