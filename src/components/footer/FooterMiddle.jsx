
import React from 'react';
import { bdFlag, logo } from '../../assets';

const FooterMiddle = () => {
  return (
    <div className='w-full bg-amazon_light text-white py-8'>
      <div className='max-w-5xl mx-auto text-gray-300 px-4'>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4'>
          <div>
            <h3 className='font-titlefont text-white text-base font-semibold mb-3'>Get to Know Us</h3>
            <ul className='flex flex-col gap-2 font-bodyfont'>
              <li className='footerLink'>Careers</li>
              <li className='footerLink'>Blog</li>
              <li className='footerLink'>About Amazon</li>
              <li className='footerLink'>Investor Relations</li>
              <li className='footerLink'>Amazon Devices</li>
              <li className='footerLink'>Amazon Science</li>
            </ul>
          </div>
          <div>
            <h3 className='font-titlefont text-white text-base font-semibold mb-3'>Make Money with Us</h3>
            <ul className='flex flex-col gap-2 font-bodyfont'>
              <li className='footerLink'>Sell products on Amazon</li>
              <li className='footerLink'>Sell on Amazon Business</li>
              <li className='footerLink'>Sell apps on Amazon</li>
              <li className='footerLink'>Become an Affiliate</li>
              <li className='footerLink'>Advertise Your Products</li>
              <li className='footerLink'>Sell Product with Us</li>
              <li className='footerLink'>Host an Amazon Hub</li>
            </ul>
          </div>
          <div>
            <h3 className='font-titlefont text-white text-base font-semibold mb-3'>Amazon Payment Products</h3>
            <ul className='flex flex-col gap-2 font-bodyfont'>
              <li className='footerLink'>Amazon Business Card</li>
              <li className='footerLink'>Shop with Points</li>
              <li className='footerLink'>Reload Your Balance</li>
              <li className='footerLink'>Amazon Currency Converter</li>
            </ul>
          </div>
          <div>
            <h3 className='font-titlefont text-white text-base font-semibold mb-3'>Let Us Help You</h3>
            <ul className='flex flex-col gap-2 font-bodyfont'>
              <li className='footerLink'>Amazon and COVID-19</li>
              <li className='footerLink'>Your Account</li>
              <li className='footerLink'>Your Orders</li>
              <li className='footerLink'>Shipping Rates & Policies</li>
              <li className='footerLink'>Returns & Replacements</li>
              <li className='footerLink'>Manage Your Content and Devices</li>
              <li className='footerLink'>Amazon Assistant</li>
              <li className='footerLink'>FAQ & Help</li>
            </ul>
          </div>
        </div>
      </div>
      <div className='w-full flex flex-col items-center justify-center py-6 px-4'>
        <div>
          <img className='w-20 pt-3' src={logo} alt="" />
        </div>
        <div className='flex gap-2 mb-4'>
          <p className='flex gap-1 items-center justify-center border border-gray-500 hover:border-amazon_yellow cursor-pointer duration-200 px-2 py-1'>
            English
          </p>
        </div>
        <div className='flex gap-1 items-center justify-center border border-gray-500 hover:border-amazon_yellow cursor-pointer duration-200 px-2 py-1'>
          <img className='w-6' src={bdFlag} alt="" />
          <p>India</p>
        </div>
      </div>
    </div>
  );
};

export default FooterMiddle;
