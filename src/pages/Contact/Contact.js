import React, { useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import L from "leaflet";
import throttle from "lodash.throttle";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [address, setAddress] = useState("");
  const mapRef = useRef(null);
  const map = useRef(null);

  // Function to fetch address based on lat/lng
  const fetchAddress = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse`,
        {
          params: {
            lat,
            lon: lng,
            format: "json",
            addressdetails: 1,
            "accept-language": "fa",
          },
        }
      );

      const data = response.data;
      if (data && data.address) {
        const fullAddress = `${data.address.road || ""} ${data.address.city || ""} ${data.address.state || ""} ${data.address.country || ""}`;
        setAddress(fullAddress);
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  // Throttle function for address fetching
  const throttledFetchAddress = useRef(throttle(fetchAddress, 500));

  // Initialize map
  React.useEffect(() => {
    map.current = L.map(mapRef.current).setView([36.273, 50.003], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map.current);

    map.current.on("click", (e) => {
      const { lat, lng } = e.latlng;
      throttledFetchAddress.current(lat, lng);
    });

    const handleResize = () => {
      map.current.invalidateSize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      map.current.remove();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required.";
    if (!formData.message.trim()) newErrors.message = "Message is required.";
    if (!address.trim()) newErrors.address = "Address is required.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      Swal.fire({
        icon: "error",
        title: "Invalid Submission",
        text: "Please fill all required fields correctly.",
      });
      return;
    }

    // Submit form data
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        { ...formData, address }
      );

      // Log the HTTP status and response data to the console
      console.log("HTTP Status Code:", response.status);
      console.log("Response Data:", response.data);

      Swal.fire({
        icon: "success",
        title: "Submission Successful",
        html: `
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Subject:</strong> ${formData.subject}</p>
          <p><strong>Message:</strong> ${formData.message}</p>
          <p><strong>Address:</strong> ${address}</p>
        `,
      });

      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setAddress("");
      setErrors({});
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "An error occurred while submitting your form.",
      });
    }
  };

  return (
    <div className="container dark-mode">
      <div className="text-center">
        <h5 className="section-title text-primary">Contact Us</h5>
        <h1 className="mb-5">Contact For Any Query</h1>
      </div>

      <div className="row">
        {/* Map - Left Column */}
        <div className="col-md-6">
          <div
            ref={mapRef}
            style={{
              height: "400px",
              width: "100%",
            }}
          ></div>
        </div>

        {/* Form - Right Column */}
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="text"
                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                    id="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <label htmlFor="name">Your Name</label>
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    id="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <label htmlFor="email">Your Email</label>
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
              </div>

              <div className="col-12">
                <div className="form-floating">
                  <input
                    type="text"
                    className={`form-control ${errors.subject ? "is-invalid" : ""}`}
                    id="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                  <label htmlFor="subject">Subject</label>
                  {errors.subject && (
                    <div className="invalid-feedback">{errors.subject}</div>
                  )}
                </div>
              </div>

              <div className="col-12">
                <div className="form-floating">
                  <input
                    type="text"
                    className={`form-control ${errors.address ? "is-invalid" : ""}`}
                    id="address"
                    placeholder="Address"
                    value={address}
                    readOnly
                  />
                  <label htmlFor="address">Address</label>
                  {errors.address && (
                    <div className="invalid-feedback">{errors.address}</div>
                  )}
                </div>
              </div>

              <div className="col-12">
                <div className="form-floating">
                  <textarea
                    className={`form-control ${errors.message ? "is-invalid" : ""}`}
                    placeholder="Leave a message here"
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    style={{ height: "150px" }}
                  ></textarea>
                  <label htmlFor="message">Message</label>
                  {errors.message && (
                    <div className="invalid-feedback">{errors.message}</div>
                  )}
                </div>
              </div>

              <div className="col-12">
                <button className="btn btn-primary w-100 py-3" type="submit">
                  Send Message
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
