
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../../redux/amazonSlice';
import StarIcon from "@mui/icons-material/Star";
import ApiIcon from "@mui/icons-material/Api";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useLoaderData();
  const searchQuery = useSelector((state) => state.amazon.searchQuery);
  const selectedCategory = useSelector((state) => state.amazon.selectedCategory);

  const productData = data;

  const handleViewDetails = (product) => {
    navigate(`/product/${product.id}`);
  };

  const filteredProducts = productData.filter((item) => {
    const categoryMatch = selectedCategory === 'All' || item.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const searchMatch = !searchQuery || item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });
  
  return (
    <div className='max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-10 px-4'>
      {filteredProducts.length > 0 ? (
        filteredProducts.map((item) => (
          <div key={item.id} className='bg-white h-auto border-[1px] border-gray-200 py-8 z-30 hover:border-transparent shadow-none hover:shadow-testShadow duration-200 relative flex flex-col gap-4'>
            <span className='text-xs capitalize italic absolute top-2 right-5 text-gray-500'>{item.category}</span>
            <div className='w-full h-auto flex items-center justify-center relative group'>
              <img className='w-52 h-64 object-contain' src={item.thumbnail} alt={item.title} />
              <ul className='w-full h-36 bg-gray-100 absolute bottom-[-170px] flex flex-col items-end justify-center gap-2 font-titlefont px-2 border-1 border-r group-hover:bottom-0 duration-700'>
                <li className='productLi'>
                  Compare <span><ApiIcon /></span>
                </li>
                <li className='productLi'>
                  Add To Cart <span><ShoppingCartIcon /></span>
                </li>
                <li className='productLi' onClick={() => handleViewDetails(item)}>
                  View Details <span><ArrowCircleRightIcon /></span>
                </li>
                <li className='productLi'>
                  Add to WishList <span><FavoriteIcon /></span>
                </li>
              </ul>
            </div>
            {item.images && item.images.length > 0 && (
              <div className='mt-2 flex gap-2 overflow-x-auto px-4'>
                {item.images.map((img, index) => (
                  <img key={index} src={img} alt={`${item.title} ${index + 1}`} className='w-16 h-16 object-cover' />
                ))}
              </div>
            )}
            <div className='px-4 z-10 bg-white'>
              <div className='flex items-center justify-between'>
                <h2 className='font-titleFont tracking-wide text-lg text-amazon_blue font-bold'>
                  {item.title.substring(0, 20)}
                </h2>
                <p className='text-sm text-gray-600 font-semibold'>${item.price}</p>
              </div>
              <div>
                <p className='text-sm'>{item.description.substring(0, 100)}...</p>
                <div className='text-yellow-500 flex'>
                  {[...Array(Math.round(item.rating))].map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                </div>
                <p className='text-sm text-gray-500'>Brand: {item.brand}</p>
                <p className='text-sm text-gray-500'>Stock: {item.stock}</p>
              </div>
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
                className='w-full font-titlefont font-medium text-base bg-gradient-to-tr from-yellow-400 to-yellow-200 border hover:from-yellow-300 hover:to-yellow-300 border-yellow-500 hover:border-yellow-700 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-200 py-1.5 rounded-md mt-3'
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className='col-span-full flex justify-center items-center h-64'>
          <p className='text-xl text-gray-700'>No product available</p>
        </div>
      )}
    </div>
  );
};

export default Products;


