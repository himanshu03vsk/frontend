import { useEffect, useState } from "react";

const ProductImageGallery = ({ partId, part_type, setMainImage }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Generate image paths based on partId
    const imagePaths = [];
    for (let i = 1; i <= 5; i++) {
      imagePaths.push(`/images/${part_type} ${i}.jpg`);  // Assuming images are named like `Spark Plug 1.jpg`, `Spark Plug 2.jpg`, etc.
    }
    setImages(imagePaths);
  }, [partId, part_type]);

  // Handle image click
  const handleImageClick = (imageSrc) => {
    setMainImage(imageSrc);  // Update the main image when a thumbnail is clicked
  };

  return (
    <div className="prod-sm-image-container">
      {images.map((img, idx) => (
        <img
          className="imgs prod-sm-image w-7/10 p-2 rounded-2xl max-w-[200px] max-h-[200px]"
          key={idx}
          src={img}  // Dynamically set the image source
          alt={`Image ${idx + 1}`}  // Alt text for accessibility
          onClick={() => handleImageClick(img)}  // Update main image when clicked
        />
      ))}
    </div>
  );
};

export default ProductImageGallery;
