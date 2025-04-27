import React from "react";
import { useNavigate } from "react-router-dom"; // Import the correct hook from React Router
import RecommendedProducts from "../components/RecommendedProducts";
import "./Home.css"; // Import your custom CSS (if needed)

const Home = () => {
    const navigate = useNavigate(); // Using the useNavigate hook for programmatic routing

    return (
        <div  className=' mx-auto mt-16 px-6 w-4/5'>
        <div className="container mx-auto mt-16 px-6 w-full"> {/* Added padding and margin-top */}
            {/* Image with responsive classes */}
            <img 
                className="max-h-[60vh] object-cover h-auto rounded-lg shadow-lg" 
                src="/cover.jpg" 
                alt="Car parts ecommerce platform cover" 
            />
            <div className="ml-2 rounded entry"> {/* Margin top for spacing */}
                <div className="text-center mt-6 mb-4 scrollable max-h-[300px]">
                <p className="para text-lg text-white-700 leading-relaxed mb-6">
                    Our Car Parts Ecommerce Platform is a one-stop online shop that provides a wide range of high-quality car parts and accessories for every vehicle, whether you’re a car owner, mechanic, or automotive enthusiast. From essential replacement components like brakes, filters, and batteries to specialized performance parts, we offer products for a variety of makes and models. The platform is designed with user convenience in mind, featuring an intuitive interface that makes it easy to search and find the exact parts you need. With secure payment options, fast shipping, and expert customer support, we ensure that your experience is smooth and reliable. Competitive pricing, combined with top-notch products, makes our platform the ideal destination for all your automotive needs, helping you keep your vehicle in peak condition without breaking the bank.
                </p>
                </div>

                {/* Button to navigate using useNavigate hook */}
                <button 
                    type="button" 
                    onClick={() => navigate("/prodlist")} 
                    className="px-6 py-3 ml-2 bg-gray-900 text-white font-semibold rounded-lg shadow-md hover:bg-black transition duration-200 ease-in-out"
                >
                    Start Exploring 
                    <img 
                        id="arrow" 
                        src="/arrow-rt.svg" 
                        alt="Go to product list" 
                        className="inline-block ml-2 w-6 h-6"
                    />
                </button>
            </div>
            
        </div>
        <RecommendedProducts />
        </div>
    );
};

export default Home;
