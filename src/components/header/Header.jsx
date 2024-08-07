import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logo } from '../../assets/index';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { allItems } from '../../constants';
import HeaderBottom from './HeaderBottom';
import LogoutIcon from '@mui/icons-material/Logout';
import { getAuth, signOut } from "firebase/auth";
import { userSignOut } from '../../redux/amazonSlice';
 import InventoryIcon from '@mui/icons-material/Inventory';
import { setSearchQuery, setSelectedCategory } from '../../redux/amazonSlice';

const Header = () => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const [showAll, setShowAll] = useState(false);
  const [location, setLocation] = useState('');
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [tempLocation, setTempLocation] = useState('');
  const searchQuery = useSelector((state) => state.amazon.searchQuery);
  const selectedCategory = useSelector((state) => state.amazon.selectedCategory);
  const products = useSelector((state) => state.amazon.products);
  const userInfo = useSelector((state) => state.amazon.userInfo);
  const ref = useRef();

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (e.target.contains(ref.current)) {
        showAll && setShowAll(false);
      }
    });

    // Geolocation
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        
        // Use a reverse geocoding service to get the city name
        fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=YOUR_API_KEY`)
          .then(response => response.json())
          .then(data => {
            if (data.results && data.results.length > 0) {
              setLocation(data.results[0].components.city || data.results[0].components.town || 'Unknown location');
            }
          })
          .catch(error => console.error('Error:', error));
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, [ref, showAll]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign out successfully");
        dispatch(userSignOut());
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleCategorySelect = (category) => {
    dispatch(setSelectedCategory(category));
    setShowAll(false);
  };

  const handleLocationSelect = () => {
    setLocation(tempLocation);
    setShowLocationModal(false);
  };
  return (
    <div className='w-full sticky top-0 z-50'>
      <div className='w-full bg-amazon_blue text-white mx-auto px-4 py-2 flex items-center gap-4'>
        <Link to="/">
          <div className='headerHover'>
            <img className='w-24 mt-2' src={logo} alt="" />
          </div>
        </Link>
        <div className='headerHover hidden mdl:inline-flex' onClick={() => setShowLocationModal(true)}>
          <LocationOnIcon />
          <p className='text-sm text-lightText font-light flex flex-col'>
            Deliver to
            <span className='text-sm font-semibold text-whiteText'>{location || 'Select your location'}</span>
          </p>
        </div>
        <div className='h-10 rounded-md hidden lgl:flex flex-grow relative'>
          <span onClick={() => setShowAll(!showAll)} className='w-14 h-full bg-gray-200 hover:bg-gray-300 border-2 cursor-pointer duration-300 text-sm text-amazon_blue font-titlefont flex items-center justify-center rounded-tl-md rounded-bl-md'>
            All <ArrowDropDownOutlinedIcon />
          </span>
          {showAll && (
            <div>
              <ul className='absolute w-56 h-50 top-10 left-0 overflow-y-scroll overflow-x-hidden bg-white border-[1px] border-amazon_blue text-black p-2 flex-col gap-1 z-50'>
                {allItems.map((item) => (
                  <li key={item._id} className='text-sm tracking-wide font-titlefont border-b-[1px] border-b-transparent hover:border-b-amazon_blue cursor-pointer duration-200' onClick={() => handleCategorySelect(item.title)}>
                    {item.title}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <input
            className='h-full text-base text-amazon_blue flex-grow outline-none border-none px-2'
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder={selectedCategory || 'Search'}
          />
          <span className='w-12 h-full flex items-center justify-center bg-amazon_yellow hover:bg-[#f3a847] duration-300 text-amazon_blue cursor-pointer rounded-tr-md rounded-br-md'>
            <SearchIcon />
          </span>
        </div>
        <Link to="/products" className="hidden md:inline-flex headerHover">
          Products <InventoryIcon/>
        </Link>
        <Link to="/signin">
          <div className='flex flex-col items-start justify-center headerHover'>
            {userInfo ? (
              <p className='text-sm mdl:text-xs text-gray-100 mdl:text-lightText font-medium'>Hello, {userInfo.userName}</p>
            ) : (
              <p className='text-sm mdl:text-xs text-white mdl:text-lightText font-light'>Hello, sign in</p>
            )}
            <p className='text-sm font-semibold -mt-1 text-whiteText hidden mdl:inline-flex'>
              Account & Lists <ArrowDropDownOutlinedIcon />
            </p>
          </div>
        </Link>
        <Link to="/orders">
          <div className='hidden lgl:flex flex-col items-start justify-center headerHover'>
            <p className='text-xs text-lightText font-light'>Returns</p>
            <p className='text-sm font-semibold -mt-1 text-whiteText'>& Orders</p>
          </div>
        </Link>
        
        <Link to="/cart">
          <div className='relative flex flex-col items-start justify-center headerHover'>
            <ShoppingCartIcon />
            <p className='text-xs font-semibold mt-1 text-whiteText'>
              Cart
              <span className='absolute text-xs top-0 left-6 font font-semibold p-1 h-4 bg-[#f3a847] text-amazon_blue rounded-full flex justify-center items-center'>
                {products.length > 0 ? products.length : 0}
              </span>
            </p>
          </div>
        </Link>
        {userInfo && (
          <div onClick={handleLogout} className='flex flex-col justify-center items-center headerHover relative'>
            <LogoutIcon />
            <p className='hidden mdl:inline-flex text-xs font-semibold text-whiteText'>
              Logout
            </p>
          </div>
        )}
      </div>
      <HeaderBottom />
      {showLocationModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Enter your location</h3>
              <div className="mt-2 px-7 py-3">
                <input
                  type="text"
                  className="px-3 py-2 border border-gray-300 rounded-md w-full"
                  value={tempLocation}
                  onChange={(e) => setTempLocation(e.target.value)}
                  placeholder="Enter city name"
                />
              </div>
              <div className="items-center px-4 py-3">
                <button
                  id="ok-btn"
                  className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onClick={handleLocationSelect}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
  