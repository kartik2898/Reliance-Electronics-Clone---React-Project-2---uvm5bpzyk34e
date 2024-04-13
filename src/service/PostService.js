import http from "../http-interceptor"

const getItemsCategories = ()=>{
    return http.get(`https://academics.newtonschool.co/api/v1/ecommerce/electronics/categories`);
}
const getProducts = ()=>{
    return http.get(`https://academics.newtonschool.co/api/v1/ecommerce/electronics/products`);
}
const lowestPriceProducts = ()=>{
    return http.get(`https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?sort={"price":1}`);
}
const trendingProducts = ()=>{
    return http.get(`https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?sort={"rating":-1}`);
}
const productsCategories = ({subCategoryName})=>{
    return http.get(`https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?filter={"subCategory":${subCategoryName}}`);
}

const postService = {
    getItemsCategories,
    getProducts,
    lowestPriceProducts,
    trendingProducts,
    productsCategories,
}

export default postService