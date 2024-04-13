import { useEffect, useState } from "react";
import postService from "../../service/PostService";
import logo from "../../Assets/images.png"
import { FiSearch } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";
import { MdPerson } from "react-icons/md";

function Header(){
    const [itemsCategories, setItemsCategories] =useState([]);

    useEffect(()=>{
        getItemsCategories();
    },[])


    const getItemsCategories = ()=>{
        postService.getItemsCategories().then((res)=>{
            setItemsCategories(res.data.data)
        })
    }
    return(
        <div>
            <div className="bg-[#E42529] flex items-center">
                <div><img src={logo} alt="logo" className="w-40" /></div>
                <div className="flex  items-center w-5/12 rounded-3xl h-10">
                    <input placeholder="Find your favorite products" className="w-full rounded-3xl h-8 px-3"/>
                    <FiSearch className="relative right-6" />
                </div>
                <div className="flex items-center">
                    <div>Select your Pin Code</div>
                    <div className="flex"><FaShoppingCart size={20} /> <span>Cart</span></div>
                    <div className="flex"><MdPerson size={20}/> <span>login</span></div>
                </div>
            </div>
            <div className="flex bg-[#003380]">
                {
                    itemsCategories.map((item,key)=>(
                        <button className="p-2 bg-[#003380] hover:bg-[#E42529]" key={key}>{item}</button>
                    ))
                }
            </div>
        </div>
    )
}
export default Header