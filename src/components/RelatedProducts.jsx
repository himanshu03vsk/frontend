import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RelatedProducts = ({ category, currentId }) => {
  const [related, setRelated] = useState([]);
  const navigate = useNavigate();

  const handleClick = (part_id) => {
    navigate(`/proddetail/${part_id}`);
  };

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `http://backend-carshop.onrender.com/api/parts/related?category=${category}&exclude=${currentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        if (Array.isArray(data)) setRelated(data);
        else console.warn("Related products not in array format:", data);
      } catch (error) {
        console.error("Error loading related products:", error.message);
      }
    };

    fetchRelated();
  }, [category, currentId]);

  return (
    <div className="bg-black p-4 mt-8 rounded scorllable min-h-[500px] max-h-[500px] overflow-y-auto">
      <h3>Related Products</h3>
      <div className="flex flex-col">
        {Array.isArray(related) &&
          related.map((p) => (
            <div
              onClick={() => handleClick(p.part_id)}
              key={p.part_id}
              className="section m-3 rounded bg-white text-white p-2 cursor-pointer transition duration-300 ease-in-out transform hover:bg-gray hover:shadow-lg"
            >
              <div className="item-dets flex gap-4">
                <div className="price-name flex flex-col justify-center flex-1">
                  <img
                    className=" mb-1 rounded"
                    src={`/images/${p.part_type} 2.jpg`}
                    alt={p.part_name}
                    width="100"
                  />
                  <p>{p.part_name}</p>
                  <p>${p.price}</p>
                </div>
                <p className="flex-2">{p.part_description}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
