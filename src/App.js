import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import ProductsPage from "./Pages/ProductsPage";
import ProductDetail from "./Pages/Product-detail";
import Layout from "./layout";
import Login from "./Pages/LoginPage";
import SignUp from "./Pages/Sign-up";
import ShoppingCard from "./Pages/ShoppingCardPage";

function App() {
  return <div className=''>
    {/* <Header/> */}
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
  </div>;
}

export default App;
