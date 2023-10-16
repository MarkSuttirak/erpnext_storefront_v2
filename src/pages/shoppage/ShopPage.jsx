import FooterMenu from "../../components/FooterMenu"
import searchIcon from '../../img/search-md-black.svg'
import { useCart } from '../../hooks/useCart';
import { ShoppingBag01, ChevronDown, ArrowLeft, FilterLines } from "@untitled-ui/icons-react";
import { Link } from "react-router-dom";
import newItem from '../../img/new-item.png'
import ProductCard from "../../components/ProductCard";
import { useProducts } from '../../hooks/useProducts'
import { useState } from "react";
import ShopPageMobile from "./ShopPage-mobile";
import ShopPageFilter from "./ShopPage-filter";
import ShopPageSearch from "./ShopPage-search";
import ShopPageType from "./ShopPage-type";
import ShopPageViewed from "./ShopPage-viewed";
import Breadcrumbs from "../../components/Breadcrumbs";

const ShopPage = () => {
  const { products } = useProducts()
  const { cartCount, setIsOpen } = useCart()
  const [currentPage, setCurrentPage] = useState('shop');
  const [showFilter, setShowFilter] = useState(true);
  const [showFilterBtn, setShowFilterBtn] = useState('ซ่อนตัวกรองสินค้า')

  const showFilterProduct = () => {
    setShowFilter(true);
    setShowFilterBtn('ซ่อนตัวกรองสินค้า')
  }

  const hideFilterProduct = () => {
    setShowFilter(false);
    setShowFilterBtn('แสดงตัวกรองสินค้า')
  }

  const handleSetCurrentPage = (page) => {
    setCurrentPage(page);
  };

  const pages = [
    {
      name: 'ร้านค้า',
      href: '/categories'
    },
    {
      name: 'โอ้โห นี่มัน',
      href: ''
    }
  ]

  return (
    <>
      {/* Mobile version */}
      <div className="lg:hidden">
        {currentPage === 'shop' ? (
          <ShopPageMobile setCurrentPage={handleSetCurrentPage}/>
        ) : currentPage === 'filter' ? (
          <ShopPageFilter setCurrentPage={handleSetCurrentPage}/>
        ) : currentPage === 'search' ? (
          <ShopPageSearch setCurrentPage={handleSetCurrentPage}/>
        ) : currentPage === 'type' ? (
          <ShopPageType setCurrentPage={handleSetCurrentPage}/>
        ) : (
          <ShopPageViewed setCurrentPage={handleSetCurrentPage}/>
        )}
      </div>

      {/* Desktop version */}
      <div className="desktop-sec hidden lg:block">
        <main className='main-margintop p-5'>
          <Breadcrumbs pages={pages}/>
          <div className="flex justify-between mb-[48px]">
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
              <button className='flex flex-1 items-center gap-x-[6px]'>
                เรียงตาม
                <ChevronDown />
              </button>
            </div>
          </div>

          <section className="flex gap-x-20">
            {showFilter ? (
              <div className="flex flex-col">
                <ShopPageFilter />
                <ShopPageType />
              </div>
            ) : null}
            <div className="flex gap-x-5 mx-auto grid grid-cols-3">
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
            </div>
          </section>
        </main>
      </div>
    </>
  )
}

export default ShopPage