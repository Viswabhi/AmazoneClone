// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import Modal from 'react-modal';
// import { useNavigate } from 'react-router-dom';
// import { placeOrder as placeOrderAction, clearCart } from '../redux/amazonSlice'; // Adjust the import path as needed

// const Checkout = () => {
//   const products = useSelector((state) => state.amazon.products);
//   const userInfo = useSelector((state) => state.amazon.userInfo);
//   const [totalPrice, setTotalPrice] = useState("");
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isLoginRequiredModalOpen, setIsLoginRequiredModalOpen] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     let total = 0;
//     products.forEach((item) => {
//       total += item.price * item.quantity;
//     });
//     setTotalPrice(total.toFixed(2));
//   }, [products]);

//   useEffect(() => {
//     Modal.setAppElement('#root');
//   }, []);

//   const handlePlaceOrder = async (e) => {
//     e.preventDefault();

//     const address = e.target.elements.address.value;
//     const city = e.target.elements.city.value;
//     const zip = e.target.elements.zip.value;
//     const country = e.target.elements.country.value;
//     const payment = e.target.elements.payment.value;

//     if (!address || !city || !zip || !country || !payment) {
//       alert('Please fill in all fields.');
//       return;
//     }

//     if (!userInfo) {
//       setIsLoginRequiredModalOpen(true);
//       return;
//     }

//     setIsSubmitting(true);

//     const orderDetails = {
//       products,
//       address,
//       city,
//       zip,
//       country,
//       payment,
//       totalPrice,
//       date: new Date().toISOString(),
//     };

//     await dispatch(placeOrderAction(orderDetails));
//     dispatch(clearCart());
//     setIsSubmitting(false);

//     setModalIsOpen(true);
//     setTimeout(() => {
//       setModalIsOpen(false);
//       navigate('/');
//     }, 3000); // Adjust timing as needed
//   };

//   const closeModal = () => {
//     setModalIsOpen(false);
//   };

//   const closeLoginRequiredModal = () => {
//     setIsLoginRequiredModalOpen(false);
//   };

//   const handleLoginRedirect = () => {
//     closeLoginRequiredModal();
//     navigate('/signin');
//   };

//   return (
//     <div className="w-full bg-gray-100 p-4">
//       <div className="container mx-auto h-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
//         <div className="w-full h-full bg-white px-4 py-6 col-span-1 lg:col-span-3">
//           <div className="font-titleFont flex items-center justify-between border-b border-gray-400 pb-3 mb-6">
//             <h2 className="text-3xl font-medium">Checkout</h2>
//           </div>
//           <div>
//             {products.map((item, index) => (
//               <div
//                 key={index}
//                 className="w-full border-b border-gray-300 p-4 flex flex-col md:flex-row items-center gap-6"
//               >
//                 <div className="w-full md:w-1/5">
//                   <img
//                     src={item.image}
//                     alt={item.title}
//                     className="w-full h-44 object-contain"
//                   />
//                 </div>
//                 <div className="w-full md:w-4/5">
//                   <h2 className="text-lg font-semibold">{item.title}</h2>
//                   <p className="text-sm text-gray-600">{item.description}</p>
//                   <p className="text-lg font-semibold">
//                     Unit Price:{" "}
//                     <span className="text-green-500">${item.price}</span>
//                   </p>
//                   <p className="text-lg font-semibold">
//                     Quantity: {item.quantity}
//                   </p>
//                   <p className="text-lg font-semibold">
//                     Total: <span className="text-green-500">${(item.price * item.quantity).toFixed(2)}</span>
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="w-full h-full bg-white p-4 col-span-1 lg:col-span-2">
//           <div className="border border-gray-300 p-4 rounded-lg">
//             <h2 className="text-xl font-medium">Order Summary</h2>
//             <p className="text-lg font-semibold">
//               Total:{" "}
//               <span className="text-green-500">${totalPrice}</span>
//             </p>
//             <form className="mt-6" onSubmit={handlePlaceOrder}>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-1" htmlFor="address">
//                   Shipping Address
//                 </label>
//                 <input
//                   type="text"
//                   id="address"
//                   name="address"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   placeholder="123 Main St"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-1" htmlFor="city">
//                   City
//                 </label>
//                 <input
//                   type="text"
//                   id="city"
//                   name="city"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   placeholder="Anytown"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-1" htmlFor="zip">
//                   ZIP / Postal Code
//                 </label>
//                 <input
//                   type="text"
//                   id="zip"
//                   name="zip"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   placeholder="12345"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-1" htmlFor="country">
//                   Country
//                 </label>
//                 <input
//                   type="text"
//                   id="country"
//                   name="country"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   placeholder="Country"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-1" htmlFor="payment">
//                   Payment Method
//                 </label>
//                 <input
//                   type="text"
//                   id="payment"
//                   name="payment"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   placeholder="Card Number"
//                   required
//                 />
//               </div>
//               <button type="submit" className="w-full mt-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300" disabled={isSubmitting}>
//                 {isSubmitting ? 'Placing Order...' : 'Place Order'}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={closeModal}
//         contentLabel="Order Confirmation"
//         className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75"
//         overlayClassName="fixed inset-0 bg-black bg-opacity-50"
//       >
//         <div className="bg-white p-8 rounded-lg shadow-lg text-center">
//           <h2 className="text-2xl font-semibold mb-4">Order Confirmed!</h2>
//           <p className="mb-4">Thank you for your order.</p>
//         </div>
//       </Modal>
//       <Modal
//         isOpen={isLoginRequiredModalOpen}
//         onRequestClose={closeLoginRequiredModal}
//         contentLabel="Login Required"
//         className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75"
//         overlayClassName="fixed inset-0 bg-black bg-opacity-50"
//       >
//         <div className="bg-white p-8 rounded-lg shadow-lg">
//           <h2 className="text-2xl font-semibold mb-4">Login Required</h2>
//           <p className="mb-4">You need to be logged in to place an order.</p>
//           <div className="flex justify-end">
//             <button
//               className="mr-2 py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300"
//               onClick={closeLoginRequiredModal}
//             >
//               Cancel
//             </button>
//             <button
//               className="py-2 px-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300"
//               onClick={handleLoginRedirect}
//             >
//               Login
//             </button>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default Checkout;


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { placeOrder as placeOrderAction, clearCart } from '../redux/amazonSlice';

const Checkout = () => {
  const products = useSelector((state) => state.amazon.products);
  const userInfo = useSelector((state) => state.amazon.userInfo);
  const [totalPrice, setTotalPrice] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoginRequiredModalOpen, setIsLoginRequiredModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let total = 0;
    products.forEach((item) => {
      total += item.price * item.quantity;
    });
    setTotalPrice(total.toFixed(2));
  }, [products]);

  useEffect(() => {
    Modal.setAppElement('#root');
  }, []);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    const address = e.target.elements.address.value;
    const city = e.target.elements.city.value;
    const zip = e.target.elements.zip.value;
    const country = e.target.elements.country.value;
    const payment = e.target.elements.payment.value;

    if (!address || !city || !zip || !country || !payment) {
      alert('Please fill in all fields.');
      return;
    }

    if (!userInfo) {
      setIsLoginRequiredModalOpen(true);
      return;
    }

    setIsSubmitting(true);

    const orderDetails = {
      userId: userInfo.uid,
      products,
      address,
      city,
      zip,
      country,
      payment,
      totalPrice,
      date: new Date().toISOString(),
    };

    await dispatch(placeOrderAction(orderDetails));
    dispatch(clearCart());
    setIsSubmitting(false);

    setModalIsOpen(true);
    setTimeout(() => {
      setModalIsOpen(false);
      navigate('/');
    }, 3000);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const closeLoginRequiredModal = () => {
    setIsLoginRequiredModalOpen(false);
  };

  const handleLoginRedirect = () => {
    closeLoginRequiredModal();
    navigate('/signin');
  };

  return (
    <div className="w-full bg-gray-100 p-4">
      <div className="container mx-auto h-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="w-full h-full bg-white px-4 py-6 col-span-1 lg:col-span-3">
          <div className="font-titleFont flex items-center justify-between border-b border-gray-400 pb-3 mb-6">
            <h2 className="text-3xl font-medium">Checkout</h2>
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
                    Unit Price: <span className="text-green-500">${item.price}</span>
                  </p>
                  <p className="text-lg font-semibold">Quantity: {item.quantity}</p>
                  <p className="text-lg font-semibold">
                    Total: <span className="text-green-500">${(item.price * item.quantity).toFixed(2)}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full h-full bg-white p-4 col-span-1 lg:col-span-2">
          <div className="border border-gray-300 p-4 rounded-lg">
            <h2 className="text-xl font-medium">Order Summary</h2>
            <p className="text-lg font-semibold">
              Total: <span className="text-green-500">${totalPrice}</span>
            </p>
            <form className="mt-6" onSubmit={handlePlaceOrder}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="address">
                  Shipping Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="123 Main St"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="city">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Anytown"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="zip">
                  ZIP / Postal Code
                </label>
                <input
                  type="text"
                  id="zip"
                  name="zip"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="12345"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="country">
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Country"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="payment">
                  Payment Method
                </label>
                <input
                  type="text"
                  id="payment"
                  name="payment"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Card Number"
                  required
                />
              </div>
              <button type="submit" className="w-full mt-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300" disabled={isSubmitting}>
                {isSubmitting ? 'Placing Order...' : 'Place Order'}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Order Confirmation"
        className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-semibold mb-4">Order Confirmed!</h2>
          <p className="mb-4">Thank you for your order.</p>
        </div>
      </Modal>
      <Modal
        isOpen={isLoginRequiredModalOpen}
        onRequestClose={closeLoginRequiredModal}
        contentLabel="Login Required"
        className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Login Required</h2>
          <p className="mb-4">You need to be logged in to place an order.</p>
          <div className="flex justify-end">
            <button
              className="mr-2 py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300"
              onClick={closeLoginRequiredModal}
            >
              Cancel
            </button>
            <button
              className="py-2 px-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300"
              onClick={handleLoginRedirect}
            >
              Login
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Checkout;




