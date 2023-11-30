import { FrappeProvider } from "frappe-react-sdk";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Product from "./pages/Product";
import './App.css'
import { useEffect } from "react";
import { ProductsProvider } from "./hooks/useProducts";
import { CartProvider } from "./hooks/useCart";
import Checkout from "./pages/checkout/Checkout";
import Profile from "./pages/Profile";
import { UserProvider } from "./hooks/useUser";
import { getToken } from "./utils/helper";
import BankInfoPage from "./pages/BankInfoPage";
import MyAccount from "./pages/MyAccount";
import MyID from "./pages/MyID";
import Consent from "./pages/instructions/Consent";
import TermsAndConditions from "./pages/instructions/TermsAndConditions";
import HowRedeemReward from "./pages/instructions/HowRedeemReward";
import MemberConditions from "./pages/instructions/MemberConditions";
import CollectPoints from "./pages/instructions/CollectPoints";
import MyOrder from "./pages/orders/MyOrder";
import MyOrderDetails from "./pages/orders/MyOrderDetails";
import RewardHistory from "./pages/reward/RewardHistory";
import RewardPage from "./pages/reward/RewardPage";
import RewardDetails from "./pages/reward/RewardDetails";
import ShippingAddress from "./pages/address/ShippingAddress";
import Welcome from "./pages/register/Welcome";
import Signup from "./pages/register/Signup";
import FillInfo from "./pages/register/FillInfo";
import Success from "./pages/register/Success";
import CategoryPage from "./pages/shoppage/CategoryPage";
import ShopPage from "./pages/shoppage/ShopPage";
import StoreLocation from "./pages/store-location/StoreLocation";
import StoreLocationDetails from "./pages/store-location/StoreLocationDetails";
import EditProfile from "./pages/EditProfile";
import Wishlist from "./pages/Wishlist";
import PaymentMethods from "./components/PaymentMethods";
import MyCoupon from "./pages/MyCoupon";
import MyCouponDetails from "./pages/MyCouponDetails";
import SingleBlog from "./pages/SingleBlog";
import MemberLevel from "./pages/reward/MemberLevel";
import MemberPrivileges from "./pages/reward/MemberPrivileges";
import FreeGiftBannerPage from "./pages/FreeGiftBannerPage";
import FooterMenuDesktop from "./components/desktop/FooterMenuDesktop";
import HeaderDesktop from "./components/desktop/HeaderDesktop";
import ShopPageViewed from "./pages/shoppage/ShopPage-viewed";
import PaymentPages from "./pages/payment/PaymentPages";
import CartPage from "./pages/checkout/CartPage";
import BlogPage from "./pages/BlogPage";
import SearchPage from "./pages/SearchPage";

export default function App() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!getToken()) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <FrappeProvider url={import.meta.env.VITE_ERP_URL}
      enableSocket={false}
      tokenParams={{
        type: "token",
        useToken: true,
        token: getToken,
      }}
    >
      <UserProvider>
        <ProductsProvider>
          <CartProvider>
            <HeaderDesktop />
            <Routes basename='/erpnext_storefront_v2'>
              <Route path="/" element={<Home />} />
              <Route path="/consent" element={<Consent />} />
              <Route path="/cart" element={<CartPage />}/>
              <Route path="/terms-and-conditions" element={<TermsAndConditions />}/>
              <Route path="/how-to-collect-rewards" element={<HowRedeemReward />} />
              <Route path="/member-conditions" element={<MemberConditions />} />
              <Route path="/collect-points" element={<CollectPoints />} />
              <Route path="products/:id" element={<Product />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/thankyou" element={<BankInfoPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/my-account" element={<MyAccount />}/>
              <Route path="/my-id" element={<MyID />}/>
              <Route path="/my-order" element={<MyOrder />}/>
              <Route path="/my-order-details/:id" element={<MyOrderDetails />}/>
              <Route path="/reward-history" element={<RewardHistory />} />
              <Route path="/rewards" element={<RewardPage />}/>
              <Route path="/reward/:id" element={<RewardDetails />}/>
              <Route path="/shipping-address" element={<ShippingAddress />}/>
              <Route path="/welcome" element={<Welcome />}/>
              <Route path="/signup" element={<Signup />}/>
              <Route path="/fill-info" element={<FillInfo />}/>
              <Route path="/success" element={<Success />}/>
              <Route path="/edit-profile" element={<EditProfile />}/>
              <Route path="/wishlist" element={<Wishlist />}/>
              <Route path="/payment-methods" element={<PaymentMethods />}/>
              <Route path="/my-coupon" element={<MyCoupon />}/>
              <Route path="/my-coupon-details/:id" element={<MyCouponDetails />}/>
              <Route path="/categories" element={<CategoryPage />}/>
              <Route path="/shop" element={<ShopPage />}/>
              <Route path="/viewed-products" element={<ShopPageViewed />}/>
              <Route path="/store-location" element={<StoreLocation />} />
              <Route path="/store-location-details/:id" element={<StoreLocationDetails />} />
              <Route path="/member-level" element={<MemberLevel />}/>
              <Route path="/member-privileges" element={<MemberPrivileges />}/>
              <Route path="/free-gift-banner" element={<FreeGiftBannerPage />}/>
              <Route path="/blog" element={<BlogPage />}/>
              <Route path="/single-blog/:id" element={<SingleBlog />} />
              <Route path="/payment" element={<PaymentPages />}/>
              <Route path="/search" element={<SearchPage />}/>
            </Routes>
            <FooterMenuDesktop />
          </CartProvider>
        </ProductsProvider>
      </UserProvider>
    </FrappeProvider>
  )
}