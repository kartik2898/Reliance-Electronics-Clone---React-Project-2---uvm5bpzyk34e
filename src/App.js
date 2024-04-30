import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import ProductsPage from "./Pages/ProductsPage";
import ProductDetail from "./Pages/Product-detail";
import Layout from "./layout";
import Login from "./Pages/LoginPage";
import SignUp from "./Pages/Sign-up";
import ShoppingCard from "./Pages/ShoppingCardPage";
import UserContextProvider from "./contexts/user-context";
import { ToastContainer } from 'react-toastify';

function App() {
  return (<div className=''>
    {/* <Header/> */}
    <ToastContainer />
    <UserContextProvider>
      <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<SignUp/>}/>
        {/* <Route path="/home" element={<Home/>} /> */}
        <Route path="/" element={<Layout/>}>
          <Route path="/home" element={<Home/>} />
          <Route path="/products/c/:sc" element={<ProductsPage/>}/>
          <Route path="/product/:id" element={<ProductDetail/>}/>
          <Route path="/cart" element={<ShoppingCard/>}></Route>
        </Route>
      </Routes>
    </UserContextProvider>
  </div>
  );
}

export default App;