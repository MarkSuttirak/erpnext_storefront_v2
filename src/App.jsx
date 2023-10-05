import { FrappeProvider } from "frappe-react-sdk";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import NavHeader from "./components/NavHeader";
import Home from "./pages/Home";
import Product from "./pages/Product";
import './App.css'
import { useEffect } from "react";
import { ProductsProvider } from "./hooks/useProducts";
import { CartProvider } from "./hooks/useCart";
import Cart from "./components/Cart";
import Checkout from "./pages/Checkout";
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
import MyOrder from "./pages/MyOrder";
import MyOrderDetails from "./pages/MyOrderDetails";
import RewardHistory from "./pages/reward/RewardHistory";
import RewardPage from "./pages/reward/RewardPage";
import ShippingAddress from "./pages/address/ShippingAddress";
import AddShippingAddress from "./pages/address/ShippingAddressAdd";
import EditShippingAddress from "./pages/address/ShippingAddressEdit";
import Welcome from "./pages/register/Welcome";
import Signup from "./pages/register/Signup";
import FillInfo from "./pages/register/FillInfo";
import Success from "./pages/register/Success";
import CategoryPage from "./pages/shoppage/CategoryPage";
import ShopPage from "./pages/shoppage/ShopPage";
import ShopPageFilter from "./pages/shoppage/ShopPage-filter";
import ShopPageType from "./pages/shoppage/ShopPage-type";
import ShopPageViewed from "./pages/shoppage/ShopPage-viewed"
import ShopPageSearch from "./pages/shoppage/ShopPage-search"
import StoreLocation from "./pages/StoreLocation";
import TaxInvoiceRequest from "./pages/TaxInvoiceRequest";
import EditProfile from "./pages/EditProfile";
import Wishlist from "./pages/Wishlist";
import PaymentMethods from "./components/PaymentMethods";
import MyCoupon from "./pages/MyCoupon";
import SingleBlog from "./pages/SingleBlog";

function App() {
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
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/consent" element={<Consent />} />
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
              <Route path="/reward" element={<RewardPage />}/>
              <Route path="/shipping-address" element={<ShippingAddress />}/>
              <Route path="/shipping-address/add" element={<AddShippingAddress />}/>
              <Route path="/shipping-address/edit/:id" element={<EditShippingAddress />}/>
              <Route path="/welcome" element={<Welcome />}/>
              <Route path="/signup" element={<Signup />}/>
              <Route path="/fill-info" element={<FillInfo />}/>
              <Route path="/success" element={<Success />}/>
              <Route path="/edit-profile" element={<EditProfile />}/>
              <Route path="/wishlist" element={<Wishlist />}/>
              <Route path="/payment-methods" element={<PaymentMethods />}/>
              <Route path="/my-coupon" element={<MyCoupon />}/>
              <Route path="/categories" element={<CategoryPage />}/>
              <Route path="/shop" element={<ShopPage />}/>
              <Route path="/shop/filter" element={<ShopPageFilter />}/>
              <Route path="/shop/type" element={<ShopPageType />}/>
              <Route path="/shop/search" element={<ShopPageSearch />} />
              <Route path="/shop/viewed" element={<ShopPageViewed />} />
              <Route path="/store-location" element={<StoreLocation />} />
              <Route path="/store-location" element={<StoreLocation />} />
              <Route path="/tax-invoice-request" element={<TaxInvoiceRequest />} />
              <Route path="/single-blog/:id" element={<SingleBlog />} />
            </Routes>
            <Cart />
          </CartProvider>
        </ProductsProvider>
      </UserProvider>
    </FrappeProvider>
  )
}

export default App
