import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { addToCart } from '../../redux/amazonSlice'; // adjust the import path as necessary

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.thumbnail, // Use thumbnail instead of image
      quantity: 1
    }));
    toast.success("Product added to cart!");
  };

  const handleBuyNow = () => {
    handleAddToCart(); // Optionally, add the item to the cart first
    navigate('/checkout'); // Redirect to the checkout page
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className='max-w-4xl mx-auto py-8 px-4'>
      <div className='flex flex-wrap'>
        <div className='w-full md:w-1/2'>
          <img src={product.thumbnail} alt={product.title} className='rounded-lg shadow-md' />
        </div>
        <div className='w-full md:w-1/2 md:pl-6 mt-4 md:mt-0'>
          <h2 className='text-2xl font-bold mb-2'>{product.title}</h2>
          <p className='text-gray-700'>{product.description}</p>
          <p className='text-2xl font-semibold mt-4'>${product.price}</p>
          <p className='text-sm text-gray-500'>Brand: {product.brand}</p>
          <p className='text-sm text-gray-500'>Category: {product.category}</p>
          <p className='text-sm text-gray-500'>Rating: {product.rating}</p>
          <p className='text-sm text-gray-500'>Stock: {product.stock}</p>
          <div className='mt-4'>
            <button
              onClick={handleAddToCart}
              className='bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 focus:outline-none'
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className='bg-green-500 text-white px-4 py-2 rounded-md ml-4 hover:bg-green-600 focus:outline-none'
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;