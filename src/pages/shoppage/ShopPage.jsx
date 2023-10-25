import { useCart } from '../../hooks/useCart';
import { ShoppingBag01, ChevronDown, ArrowLeft, FilterLines } from "@untitled-ui/icons-react";
import { Link, useLocation } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import { useProducts } from '../../hooks/useProducts'
import { useState } from "react";
import ShopPageMobile from "./ShopPage-mobile";
import ShopPageFilter from "./ShopPage-filter";
import ShopPageType from "./ShopPage-type";
import ShopPageViewed from "./ShopPage-viewed";
import Breadcrumbs from "../../components/Breadcrumbs";
import Dropdown from '../../components/Dropdown';

export default function ShopPage(){
  const { products } = useProducts()
  const [currentPage, setCurrentPage] = useState('shop');
  const [showFilter, setShowFilter] = useState(true);
  const [showFilterBtn, setShowFilterBtn] = useState('ซ่อนตัวกรองสินค้า')

  const location = useLocation();
  const filter = new URLSearchParams(location)

  const showFilterProduct = () => {
    setShowFilter(true);
    setShowFilterBtn('ซ่อนตัวกรอง')
  }

  const hideFilterProduct = () => {
    setShowFilter(false);
    setShowFilterBtn('แสดงตัวกรอง')
  }

  const handleSetCurrentPage = (page) => {
    setCurrentPage(page);
  };

  const pages = [
    {
      name: 'ร้านค้า',
      href: ''
    },
  ]

  return (
    <>
      {/* Mobile version */}
      <div className="lg:hidden">
        {currentPage === 'shop' ? (
          <ShopPageMobile setCurrentPage={handleSetCurrentPage}/>
        ) : currentPage === 'filter' ? (
          <ShopPageFilter setCurrentPage={handleSetCurrentPage}/>
        ) : currentPage === 'type' ? (
          <ShopPageType setCurrentPage={handleSetCurrentPage}/>
        ) : (
          <ShopPageViewed setCurrentPage={handleSetCurrentPage}/>
        )}
      </div>

      {/* Desktop version */}
      <main className='main-margintop p-5 desktop-sec lg:py-10 hidden lg:block'>
        <Breadcrumbs pages={pages}/>
        <div className="flex justify-between mb-[50px]">
          <h2 className='header-title'>ร้านค้า</h2>
          <div className="flex gap-x-10">
            <button className="flex items-center gap-x-[6px]" onClick={() => {
              if (showFilter){
                hideFilterProduct()
              } else {
                showFilterProduct()
              }
            }}>
              {showFilterBtn}
              <FilterLines />
            </button>
            <Dropdown title='เรียงตาม' menus={[{
              link:'',
              title:'ใหม่ล่าสุด'
            },
            {
              link:'',
              title:'ราคา : สูง - ต่ำ'
            },
            {
              link:'',
              title:'ราคา : ต่ำ - สูง'
            }]} side='right'/>
          </div>
        </div>

        <section className="flex gap-x-20">
          {showFilter ? (
            <div className="flex flex-col">
              <ShopPageFilter />
              <ShopPageType />
            </div>
          ) : null}
          <div className="flex gap-x-5 gap-y-8 mx-auto grid grid-cols-3">
            {(products ?? []).map((product) => (
              <ProductCard
                key={product.item_code}
                desc={product.item_group}
                title={product.item_name}
                productId={product.name}
                itemCode={product.item_code}
                price={product.formatted_price}
                thumbnail={product.website_image ? `${import.meta.env.VITE_ERP_URL}${product.website_image}` : "https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/sneakers.png"}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  )
}