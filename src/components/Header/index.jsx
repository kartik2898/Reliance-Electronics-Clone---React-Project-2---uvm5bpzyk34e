import { useContext, useEffect, useState } from "react";
import productService from "../../service/ProductService";
import logo from "../../Assets/images.png"
import { FiSearch } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";
import { MdPerson } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Link } from "react-router-dom";
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { UserContext } from "../../contexts/user-context";
import { CartContext } from "../../contexts/cart-context";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
function Header(){
    const [itemsCategories, setItemsCategories] =useState([]);
    const {userDetail,getUserDetail,setUserDetail} = useContext(UserContext);
    const {cartItems} = useContext(CartContext);
    const navigate = useNavigate();
    const userNavigation = [
        { name: 'Your Profile'},
        { name: 'Settings'},
        { name: 'Sign out'},
    ]
    console.log(userDetail);
    const validationForm = yup.object({
        search:yup.string().trim().required(),
    });

    const formik = useFormik({
        initialValues: {
          search:"",
        },
        validationSchema: validationForm,
        onSubmit: (values,action) => {
            // console.log(values);
          handleSearch(values);
          action.resetForm();
        },
      });

    useEffect(()=>{
        getItemsCategories();
    },[])

    const handleSearch=(values)=>{
        navigate('/products/c/:sc',{state : {title:values}})
        // navigate('/search')
    }

    const getItemsCategories = ()=>{
        productService.getItemsCategories().then((res)=>{
            setItemsCategories(res.data.data)
        })
    }

    const handleNavigation = (Name)=>{
      console.log(Name);
        if(Name == 'Sign out'){
          // localStorage.clear();
          localStorage.removeItem("userDetail");
          // setUserDetail(null);
          getUserDetail();
          navigate('/');
        }
    }
    return(
        <div className="fixed w-full z-50 mt-[-7.9%]">
            <div className="bg-[#E42529] flex items-center justify-around">
                <div className="cursor-pointer" onClick={()=>{navigate(`/`)}}>
                    <img src={logo} alt="logo" className="w-40" />
                </div>
                <div className="w-5/12">
                    <form className="flex  items-center justify-center" onSubmit={formik.handleSubmit}>
                        <div className="flex  items-center w-10/12 rounded-3xl h-10">
                          <input 
                            placeholder="Find your favorite products" 
                            className="w-full rounded-3xl h-8 px-3" 
                            name="search"
                            value={formik.values.search}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          <FiSearch className="relative right-6" />
                        </div>
                    </form>
                </div>
                <div className="flex items-center gap-x-2 text-white justify-center">
                    <div className="pr-2">Select your Pin Code</div>
                    <Link to={"/cart"} className="flex relative"><FaShoppingCart size={20} />
                    {cartItems?.items?.length > 0 && (
                    <span className="absolute bottom-3 right-6 flex items-center justify-center w-5 h-5 bg-red-500 rounded-full text-white text-xs">
                      {cartItems?.items?.length}
                    </span>
                    )}
                     <span className="pl-2">Cart</span>
                    </Link>
                    {userDetail?
                    (
                        <div>
                            <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative flex max-w-xs items-center text-sm focus:outline-none ">
                            <MdPerson size={20}/>  <span className="px-2">Hii</span> <span>{userDetail?.user?.name}</span>
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item?.name}>
                                {({ active }) => (
                                  <a
                                    onClick={()=>handleNavigation(item?.name)}
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700 cursor-pointer'
                                    )}
                                  >
                                    {item?.name}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                        </div>
                    ):(<Link to={"/login"}className="flex justify-center items-center"><MdPerson size={20}/> <span>login</span></Link>)
                    }
                </div>
            </div>
            <div className="flex bg-[#003380] justify-around">
                {
                    itemsCategories.map((item,key)=>(
                        <button 
                            className="p-2 px-5 bg-[#003380] hover:bg-[#E42529] text-white" 
                            key={key} 
                            onClick={()=>{navigate(`/products/c/${item}`)}}
                        >
                            {item}
                        </button>
                    ))
                }
            </div>
        </div>
    )
}
export default Header