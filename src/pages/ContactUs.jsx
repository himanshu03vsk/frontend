import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import "./contactUs.css"; // Keep this for any custom styles you might still need

const About = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const containerStyle = {
    width: '100%',
    height: '400px'
  };

  const center = {
    lat: 32.7357,
    lng: -97.1081
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://backend-carshop.onrender.com/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message_subject: formData.subject,
          message: formData.message
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to submit enquiry.");
      }
  
      alert("Message sent successfully!");
  
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      console.error("Submission error:", error);
      alert("There was an error sending your message. Please try again.");
    }
  };

  return (
    <div>
    <div className="mx-auto md:w-2/3 px-8 py-15">
      {/* Main Section with Contact Info and Map */}
      <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
        {/* Contact Info Section */}
        <section className="section rounded p-3 w-full md:w-1/3 text-center">
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <h3 className="text-xl mb-6">We're here to help</h3>

          <div className="mb-4">
            <h3 className="text-lg font-semibold">Phone Number</h3>
            <h4 className="text-white">(817) xxx-xxxx</h4>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold">E-Mail</h3>
            <h4 className="text-white">contact@carshop.com</h4>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold">Address</h3>
            <h4 className="text-white">416 Yates ST, Arlington, TX 76010</h4>
          </div>
        </section>

        {/* Google Map Section */}
        <section className="section p-3 rounded w-full md:w-2/3">
          <h2 className="text-3xl font-bold mb-4 text-center">Find Us on the Map</h2>
          <LoadScript googleMapsApiKey="AIzaSyC_uSLzJkD-58lga1hRprISlHPr1Q8vjGs">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={14}
            >
              <Marker position={center} />
            </GoogleMap>
          </LoadScript>
        </section>
      </div>
      </div>
      
      <section className="w-full md:w-1/3 mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-center">Send us a Message</h2>
        <form onSubmit={handleSubmit} className="section p-6 rounded-lg ">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-md border border-gray-300 section my-1 text-white placeholder-gray-400 focus:outline-none"
          />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-md border border-gray-300 section my-1 text-white placeholder-gray-400 focus:outline-none"
          />
          <input
            type="phone"
            id="phone"
            name="phone"
            placeholder="Your Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-md border border-gray-300 section my-1 text-white placeholder-gray-400 focus:outline-none"
          />
          <input
            type="text"
            id="subject"
            name="subject"
            placeholder="Message Subject"
            value={formData.subject}
            onChange={handleChange}
            required 
            className="w-full p-3 rounded-md border border-gray-300 section my-1 text-white placeholder-gray-400 focus:outline-none"
          />
          <textarea
            id="message"
            name="message"
            rows="5"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-md border border-gray-300 section my-1 mb-3 text-white placeholder-gray-400 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full p-3 bg-gray-600 text-white rounded-md hover:bg-gray-500 focus:outline-none"
          >
            Submit
          </button>
        </form>
      </section>
    </div>
  );
};

export default About;
