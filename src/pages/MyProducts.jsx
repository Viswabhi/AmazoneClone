import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart, setSearchQuery } from '../redux/amazonSlice';
import StarIcon from "@mui/icons-material/Star";
import ApiIcon from "@mui/icons-material/Api";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";

const MyProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const searchQuery = useSelector((state) => state.amazon.searchQuery);

  useEffect(() => {
    // Fetch products data here
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products?limit=100");
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleViewDetails = (product) => {
    navigate(`/product/${product.id}`);
  };

  const filteredProducts = products.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">My Products</h1>
      
      {/* Search Bar */}
      <div className="flex items-center justify-center mb-8">
        <div className="relative w-full max-w-xl">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <SearchIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Products Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-10'>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <div key={item.id} className='bg-white h-auto border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition duration-300 flex flex-col'>
              <div className='relative p-4'>
                <span className='text-xs capitalize italic absolute top-2 right-2 text-gray-500'>{item.category}</span>
                <img className='w-full h-48 object-contain mb-4' src={item.thumbnail} alt={item.title} />
                <h2 className='font-bold text-lg text-gray-800 mb-2 truncate'>{item.title}</h2>
                <p className='text-sm text-gray-600 mb-2 line-clamp-2'>{item.description}</p>
                <div className='flex items-center justify-between mb-2'>
                  <p className='text-lg font-semibold text-gray-800'>${item.price}</p>
                  <div className='flex text-yellow-400'>
                    {[...Array(Math.round(item.rating))].map((_, i) => (
                      <StarIcon key={i} fontSize="small" />
                    ))}
                  </div>
                </div>
                <p className='text-sm text-gray-500 mb-1'>Brand: {item.brand}</p>
                <p className='text-sm text-gray-500 mb-4'>Stock: {item.stock}</p>
              </div>
              <div className='mt-auto p-4 bg-gray-50 rounded-b-lg'>
                <button 
                  onClick={() => dispatch(addToCart({
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    price: item.price,
                    category: item.category,
                    image: item.thumbnail,
                    quantity: 1
                  }))} 
                  className='w-full bg-yellow-400 text-gray-800 font-semibold py-2 px-4 rounded-full hover:bg-yellow-500 transition duration-300 flex items-center justify-center'
                >
                  <ShoppingCartIcon className="mr-2" fontSize="small" /> Add to Cart
                </button>
                <button 
                  onClick={() => handleViewDetails(item)}
                  className='w-full mt-2 bg-blue-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300 flex items-center justify-center'
                >
                  <ArrowCircleRightIcon className="mr-2" fontSize="small" /> View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className='col-span-full flex justify-center items-center h-64'>
            <p className='text-xl text-gray-700'>No products available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProducts;