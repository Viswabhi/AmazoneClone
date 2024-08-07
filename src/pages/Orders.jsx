// import React from 'react';
// import { useSelector } from 'react-redux';

// const Orders = () => {
//   const orders = useSelector((state) => state.amazon.orders) || [];

//   return (
//     <div className="w-full bg-gray-100 p-4">
//       <div className="container mx-auto h-auto">
//         <h2 className="text-3xl font-medium mb-6">Your Orders</h2>
//         {orders.length === 0 ? (
//           <p className="text-lg">You have no orders yet.</p>
//         ) : (
//           orders.map((order, index) => (
//             order && ( // Check if order is not null
//               <div key={index} className="w-full bg-white p-4 mb-4 rounded-lg shadow-md">
//                 <h3 className="text-xl font-semibold mb-2">Order #{index + 1}</h3>
//                 {order.date && ( // Check if order.date exists
//                   <p className="text-sm text-gray-600 mb-2">Date: {new Date(order.date).toLocaleString()}</p>
//                 )}
//                 <p className="text-lg font-medium mb-2">Total: ${order.totalPrice}</p>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {order.products && order.products.map((item, i) => ( // Check if order.products exists
//                     <div key={i} className="border border-gray-300 p-4 rounded-lg">
//                       <div className="w-full md:w-1/5">
//                   <img
//                     src={item.image}
//                     alt={item.title}
//                     className="w-full h-44 object-contain"
//                   />
//                 </div>
//                       <h4 className="text-lg font-semibold">{item.title}</h4>
//                       <p className="text-sm text-gray-600">{item.description}</p>
//                       <p className="text-lg font-semibold">Unit Price: ${item.price}</p>
//                       <p className="text-lg font-semibold">Quantity: {item.quantity}</p>
//                       <p className="text-lg font-semibold">Total: ${(item.price * item.quantity).toFixed(2)}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Orders;


import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const orders = useSelector((state) => state.amazon.orders) || [];
  const userInfo = useSelector((state) => state.amazon.userInfo);
  const navigate = useNavigate();

  // Redirect to login if user is not authenticated
  React.useEffect(() => {
    if (!userInfo) {
      navigate('/signin');
    }
  }, [userInfo, navigate]);

  // Filter orders to show only those belonging to the current user
  const userOrders = orders.filter(order => order && order.userId === userInfo?.uid);

  if (!userInfo) {
    return null; // or a loading spinner
  }

  return (
    <div className="w-full bg-gray-100 p-4">
      <div className="container mx-auto h-auto">
        <h2 className="text-3xl font-medium mb-6">Your Orders</h2>
        {userOrders.length === 0 ? (
          <p className="text-lg">You have no orders yet.</p>
        ) : (
          userOrders.map((order, index) => (
            <div key={index} className="w-full bg-white p-4 mb-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Order #{index + 1}</h3>
              {order.date && (
                <p className="text-sm text-gray-600 mb-2">Date: {new Date(order.date).toLocaleString()}</p>
              )}
              <p className="text-lg font-medium mb-2">Total: ${order.totalPrice}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {order.products && order.products.map((item, i) => (
                  <div key={i} className="border border-gray-300 p-4 rounded-lg">
                    <div className="w-full md:w-1/5">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-44 object-contain"
                      />
                    </div>
                    <h4 className="text-lg font-semibold">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    <p className="text-lg font-semibold">Unit Price: ${item.price}</p>
                    <p className="text-lg font-semibold">Quantity: {item.quantity}</p>
                    <p className="text-lg font-semibold">Total: ${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
