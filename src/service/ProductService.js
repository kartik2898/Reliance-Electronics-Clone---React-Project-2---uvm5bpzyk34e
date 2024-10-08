import http from "../http-interceptor"

const getItemsCategories = ()=>{
    return http.get(`https://academics.newtonschool.co/api/v1/ecommerce/electronics/categories`);
}
const getProducts = (categories)=>{
    return http.get(`https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?${categories}`);
}
// const lowestPriceProducts = ()=>{
//     return http.get(`https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?sort={"price":1}`);
// }
// const trendingProducts = ()=>{
//     return http.get(`https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?sort={"rating":-1}`);
// }
// const productsCategories = (subCategoryName,price=1,limit,page=0)=>{
//     return http.get(`https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?filter={"subCategory":"${subCategoryName}"}&sort={"price":${price}}&limit=${limit}&page=${page}`);
// }
const getProduct = (id)=>{
    return http.get(`https://academics.newtonschool.co/api/v1/ecommerce/product/${id}`);
}
// const search = (searchTerm,price,limit=20,page=0)=>{
//     return http.get(`https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?search=${searchTerm}&sort={"price":${price}}&limit=${limit}&page=${page}`);
// }
const AddCartItem = (productID,quantity)=>{
    return http.patch(`https://academics.newtonschool.co/api/v1/ecommerce/cart/${productID}`,{"quantity":quantity})
}
const getCartItems = ()=>{
    return http.get(`https://academics.newtonschool.co/api/v1/ecommerce/cart`);
}
const deleteCartItem = (productID)=>{
    return http.delete(`https://academics.newtonschool.co/api/v1/ecommerce/cart/${productID}`)
}
const addItemInWishList = (productID) => {
    return http.patch(`https://academics.newtonschool.co/api/v1/ecommerce/wishlist`,{ "productId": productID });
  };
const getWishList = ()=>{
    return http.get(` https://academics.newtonschool.co/api/v1/ecommerce/wishlist`);
}
const removeItemFromWishList = (productID)=>{
    return http.delete(`https://academics.newtonschool.co/api/v1/ecommerce/wishlist/${productID}`)
}
const OrderNow = (productId,quantity=1,address)=>{
    console.log("check");
    return http.post(`https://academics.newtonschool.co/api/v1/ecommerce/order`,{"productId":productId,"quantity":quantity,"address":address,"addressType":"HOME"})
}
const clearCartItem = (productID)=>{
    return http.delete(`https://academics.newtonschool.co/api/v1/ecommerce/cart/`)
}
const productService = {
    getItemsCategories,
    getProducts,
    getProduct,
    AddCartItem,
    getCartItems,
    deleteCartItem,
    addItemInWishList,
    getWishList,
    removeItemFromWishList,
    OrderNow,
    clearCartItem
}

export default productService