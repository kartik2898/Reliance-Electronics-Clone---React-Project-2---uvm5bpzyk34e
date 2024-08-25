import { Route, Routes ,Navigate} from "react-router-dom";
import Home from "./Pages/Home";
import ProductsPage from "./Pages/ProductsPage";
import ProductDetail from "./Pages/Product-detail";
import Layout from "./layout";
import Login from "./Pages/LoginPage";
import SignUp from "./Pages/Sign-up";
import ShoppingCard from "./Pages/ShoppingCartPage";
import UserContextProvider from "./contexts/user-context";
import { ToastContainer } from 'react-toastify';
import CartContextProvider from "./contexts/cart-context";
import WishListContextProvider from "./contexts/wishList-context";
import CheckOut from "./Pages/CheckOut";

function App() {
  return (<div className=''>
    {/* <Header/> */}
    <ToastContainer />
    <UserContextProvider>
      <CartContextProvider>
        <WishListContextProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/" element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/products/c/:sc" element={<ProductsPage />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<ShoppingCard />} />
                <Route path="/checkout" element={<CheckOut />} />
                <Route path="/checkout/:id" element={<CheckOut />} />
                {/* <Route path="*" element={<Navigate to="/home" />} /> */}
              </Route>
            </Routes>
        </WishListContextProvider>
      </CartContextProvider>
    </UserContextProvider>
  </div>
  );
}

export default App;
