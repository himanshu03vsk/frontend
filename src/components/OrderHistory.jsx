import React, { useEffect, useState } from 'react';
import './AccountSetting.css';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const buyer_email = JSON.parse(localStorage.getItem('user'))?.email;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/orders/${buyer_email}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!res.ok) throw new Error('Failed to fetch orders');
        const data = await res.json();
        setOrders(data.orders || []);
      } catch (err) {
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };

    if (buyer_email) fetchOrders();
  }, [buyer_email]);

  return (
    <div className="section p-6 rounded-xl shadow-lg max-w-4xl mx-auto my-8">
      <h3 className="text-2xl font-bold mb-6">Order History</h3>
      {loading ? (
        <p className="text-gray-600 text-center py-4">Loading...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-600 text-center py-4">No orders found.</p>
      ) : (
        <div className="scrollablediv p-4 rounded-lg overflow-y-auto max-h-[32rem] space-y-4">
          {orders.map((order) => {
            const address = JSON.parse(order.shipping_address);
            return (
              <div
                key={order.order_id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b pb-3">
                    <p className="text-lg font-semibold text-gray-800">Order #{order.order_id}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(order.order_date).toLocaleString()}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 py-2">
                    <p className="text-gray-700">
                      <span className="font-medium">Payment Method:</span> {order.payment_method}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Shipping Address:</span> {address.line1}, {address.city}, {address.state_in} {address.zip_code}
                    </p>
                  </div>
                  {order.Shipments?.length > 0 ? (
                    <div className="mt-4">
                      <p className="font-medium text-gray-800 mb-2">Items:</p>
                      <ul className="bg-gray-50 rounded-lg p-4 space-y-2">
                        {order.Shipments.map((shipment, idx) => (
                          <li
                            key={`${order.order_id}-${idx}`}
                            className="flex justify-between items-center border-b last:border-0 pb-2"
                          >
                            <div>
                              <p className="font-medium text-gray-800">{shipment.Part.part_name}</p>
                              <p className="text-sm text-gray-600">
                                Color: {shipment.color} | Quantity: {shipment.quantity_purchased}
                              </p>
                            </div>
                            <span
                              className={`px-3 py-1 rounded-full text-sm ${
                                shipment.shipment_status === 'Delivered'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {shipment.shipment_status}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-gray-600 italic">No items in this order.</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
