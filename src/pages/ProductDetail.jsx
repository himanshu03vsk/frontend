import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductImageGallery from "../components/ProductImageGallery";
import ProductDescription from "../components/ProductDescription";
import ProductActions from "../components/ProductActions";
import RelatedProducts from "../components/RelatedProducts";
import Reviews from "../components/Reviews";

const ProductDetail = () => {
  const { id } = useParams();
  const [part, setPart] = useState(null);
  const [mainImage, setMainImage] = useState(""); // State to track the main image

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`http://localhost:3000/api/parts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch product");

        const data = await res.json();
        setPart(data);
        setMainImage(`/images/${data.part_type} 1.jpg`); // Set the default main image to the first image
      } catch (error) {
        console.error("Error loading product:", error.message);
      }
    };

    fetchProduct();
  }, [id]);

  const handleImageChange = (newImage) => {
    setMainImage(newImage); // Change the image
  };

  if (!part) return <p>Loading product...</p>;

  return (
    <div className="container mx-auto px-4 py-6 flex flex-col gap-6">
      <div className="prod-detail-container flex flex-col lg:flex-row gap-6">
        {/* Product Image Gallery */}
        <div className="prod-sm-image-container lg:flex-1 flex-1">
          <ProductImageGallery 
            partId={part.part_id} 
            part_type={part.part_type} 
            setMainImage={setMainImage} // Pass the function to update the main image
          />
        </div>

        {/* Main Product Image */}
        <div className="prod-bg-image-container flex-1 lg:flex-4 h-[300px] lg:h-[500px]">
          <img
            src={mainImage}  // Use the main image state here
            alt={part.part_name}
            id="big-img"
            className="w-full h-full object-cover rounded-md shadow-lg"
          />
        </div>

        {/* Product Description and Actions */}
        <div className="prod-desc-act-container flex-1 lg:flex-5 flex flex-col justify-between">
          <ProductDescription part={part} />
          <ProductActions product={part.part_id} />
        </div>
      </div>

      <div className="rev-rec flex flex-col lg:flex-row mt-12 gap-6">
        {/* Reviews Section */}
        <div className="reviews-container flex-1">
          <Reviews partId={part.part_id} />
        </div>

        {/* Related Products Section */}
        <div className="related-products-container flex-1">
          <RelatedProducts category={part.part_category} currentId={part.part_id} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
