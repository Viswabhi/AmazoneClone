import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decreamentQuantity, deleteItem, increamentQuantity, resetCart } from "../redux/amazonSlice";
import {emptyCart} from '../assets/index'
import { motion } from 'framer-motion';
import {Link} from 'react-router-dom';
const Cart = () => {
const dispatch=useDispatch()
  const products = useSelector((state) => state.amazon.products);
  const[totalPrice,setTotalPrice]=useState("")
  useEffect(()=>{
    let Total=0;
    products.map((item)=>{
        Total +=item.price * item.quantity;
        return setTotalPrice(Total.toFixed(2))
    })
  },[products])
  return (
    <div className="w-full bg-gray-100 p-4">
      {
        products.length > 0 ?(
          <div className="container mx-auto h-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="w-full h-full bg-white px-4 py-6 col-span-1 lg:col-span-4">
          <div className="font-titleFont flex items-center justify-between border-b border-gray-400 pb-3 mb-6">
            <h2 className="text-3xl font-medium">Shopping Cart</h2>
            <h4 className="text-xl font-normal">Subtitle</h4>
          </div>
          <div>
            {products.map((item, index) => (
              <div
                key={index}
                className="w-full border-b border-gray-300 p-4 flex flex-col md:flex-row items-center gap-6"
              >
                <div className="w-full md:w-1/5">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-44 object-contain"
                  />
                </div>
                <div className="w-full md:w-4/5">
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <p className="text-lg font-semibold">
                    Unit Price:{" "}
                    <span className="text-green-500">${item.price}</span>
                  </p>
                  <div className="bg-[#F0F2F2] flex justify-center items-center gap-1 w-24 py-1 text-center drop-shadow-lg rounded-md">
                   <p>Qty:</p>
                   <p onClick={()=>dispatch(decreamentQuantity(item.id))} className="cursor-pointer bg-gray-200 px-1 rounded-md hover:bg-gray-400 duration-300">-</p>
                   <p>{item.quantity}</p>
                   <p onClick={()=>dispatch(increamentQuantity(item.id))} className="cursor-pointer bg-gray-200 px-1 rounded-md hover:bg-gray-400 duration-300">+</p>
                  </div>
                  <button onClick={()=>dispatch(deleteItem(item.id))} className="bg-red-500 w-36 py-1 rounded-lg text-white mt-2 hover:bg-red-700 active:bg-red-900 duration-300">Delete</button>
                </div>
                
                <div className="w-full py-2">
                    <p className="text-lg font-titlefont font-semibold">{item.price * item.quantity}</p>
                </div>
                
              </div>
              
            ))}
          </div>
          <div onClick={()=>dispatch(resetCart())} className="w-full py-2">
            <button className="px-10 py-2 bg-red-500 hover:bg-red-600 active:bg-red-500 text-white rounded-lg font-titlefont font-semibold text-lg tracking-wide">Clear Cart</button>
          </div>
        </div>
        <div className="w-full h-full bg-white p-4 col-span-1">
          {/* Add additional components or content for the side column here */}
          <div className="border border-gray-300 p-4 rounded-lg">
            <h2 className="text-xl font-medium">Order Summary</h2>
            <p className="text-lg font-semibold">
              Total:{" "}
              <span className="text-green-500">
                {/* ${products.reduce((total, item) => total + item.price, 0)} */}
                ${totalPrice}
              </span>
            </p>
            <Link to="/checkout">
            <button className="w-full mt-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300">
              Proceed to Checkout
            </button>
            </Link>
          </div>
        </div>
      </div>
        ): <motion.div 
        className="flex justify-center items-center gap-4 py-10"
        initial={{ y:70,opacity:0 }}
        animate={{ y:0,opacity:1 }}
        transition={{delay:0.5,duration:0.5}}
        
      >
           <div>
            <img className="w-80 rounded-lg p-4 mx-auto"
            src={emptyCart} alt="" />
           </div>
           <div className="w-96 p-4 bg-white flex flex-col items-center rounded-md shadow-lg">
            <h1 className="font-titlFont text-xl font-bold">Your Cart feels Lonely</h1>
            <p className="text-sm text-center">Your Shopping cart lives to serve. Give it purpose - fill it with books, electronics, videos, etc. and make it happy.</p>
         <Link to="/">
         <button className="mt-6 bg-yellow-400 rounded-md cursor-pointer
           hover:bg-yellow-500 active:bg-yellow-700 px-8 py-2 font-titlefont font-semibold
           text-lg">Continue Shopping</button>
         </Link>
           </div>
           </motion.div>
      }
    </div>
  );
};

export default Cart;
