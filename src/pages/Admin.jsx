import React, { useEffect, useState } from "react";
import AdminChat from "../components/AdminChat"; // Adjust the import path as necessary

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchAdminOrders = async () => {
      try {
        const response = await fetch("http://backend-carshop.onrender.com/api/admin/orders", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching admin orders:", error);
      }
    };

    fetchAdminOrders();
  }, []);

  return (<>



    <AdminChat /> {/* Add the ChatBox component here */}  
    
    <div className="p-6 mt-3 section min-h-screen max-h-[1080px] scrollable overflow-y-auto bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

      <div className="grid gap-6">
        {orders.length === 0 ? (
          <p className="text-center text-gray-600">No orders found.</p>
        ) : (
          orders.map((order) => {
            let parsedAddress;
            try {
              parsedAddress = JSON.parse(order.shipping_address);
            } catch {
              parsedAddress = null;
            }

            return (
              <div
                key={order.order_id}
                className="bg-black p-4 rounded-lg shadow-md border"
              >
                <h2 className="text-xl font-semibold mb-2">
                  Order #{order.order_id}
                </h2>
                <p>
                  <strong>Buyer:</strong> {order.buyer_email}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(order.order_date).toLocaleString()}
                </p>
                <p>
                  <strong>Payment:</strong> {order.payment_method}
                </p>
                <div className="mt-2">
                  <p className="font-medium">Shipping Address:</p>
                  {parsedAddress ? (
                    <p className="text-sm">
                      {parsedAddress.line1}
                      {parsedAddress.line2 ? `, ${parsedAddress.line2}` : ""},{" "}
                      {parsedAddress.city}, {parsedAddress.state_in}{" "}
                      {parsedAddress.zip_code}
                    </p>
                  ) : (
                    <p className="text-sm text-red-500">Invalid address format</p>
                  )}
                </div>

                <div className="mt-3">
                  <h3 className="font-medium mb-1">Shipments:</h3>
                  {order.Shipments?.map((shipment) => (
                    <div
                      key={shipment.shipment_id}
                      className="text-sm section p-2 mb-2 rounded"
                    >
                      <p>
                        <strong>Part:</strong> {shipment.Part?.part_name} (ID:{" "}
                        {shipment.part_id})
                      </p>
                      <p>
                        <strong>Color:</strong> {shipment.color}
                      </p>
                      <p>
                        <strong>Quantity:</strong> {shipment.quantity_purchased}
                      </p>
                      <p>
                        <strong>Status:</strong> {shipment.shipment_status}
                      </p>
                      <p>
                        <strong>Cost:</strong> ${shipment.shipment_cost}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
    </>

    
  );
};

export default AdminDashboard;
