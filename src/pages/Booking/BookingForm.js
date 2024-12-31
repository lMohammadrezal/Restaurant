import React, { Fragment, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const BookingForm = () => {
  const getIranTime = () => {
    // Get the current time in Iran (UTC+3:30)
    const iranTime = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Tehran",
    });
    const date = new Date(iranTime);
    
    // Format it to match the 'datetime-local' input requirement (YYYY-MM-DDTHH:MM)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    // Return formatted date in 'YYYY-MM-DDTHH:MM' format
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    datetime: getIranTime(), // Set default to Iran's local date and time
    people: "1",
    message: "",
  });

  const [errors, setErrors] = useState({}); // For storing validation errors

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Check required fields
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    if (!formData.datetime.trim()) newErrors.datetime = "Date & Time is required.";
    if (!formData.message.trim()) newErrors.message = "Special request is required.";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      Swal.fire({
        icon: "error",
        title: "Invalid Submission",
        text: "Please fill all required fields correctly.",
      });
      return;
    }

    console.log("Submitting Form Data:", formData);

    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts", // Replace with your API endpoint
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Log the HTTP status code and response data
      console.log("HTTP Status Code:", response.status); // Logs status code like 200, 201, etc.
      console.log("Response Data:", response.data); // Logs the data returned by the API

      // Show SweetAlert with reservation details and success message
      Swal.fire({
        icon: "success",
        title: "Reservation Saved",
        html: `
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Date & Time:</strong> ${formData.datetime}</p>
          <p><strong>No of People:</strong> ${formData.people}</p>
          <p><strong>Special Request:</strong> ${formData.message}</p>
          <p>Your reservation has been saved successfully!</p>
        `,
      });

      setFormData({
        name: "",
        email: "",
        datetime: getIranTime(), // Reset to Iran's local date and time
        people: "1",
        message: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Error saving reservation:", error);
      if (error.response) {
        // Log the HTTP status code in case of an error response
        console.log("HTTP Status Code (Error):", error.response.status);
        console.log("Error Response Data:", error.response.data);
      }
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "An error occurred while saving your reservation.",
      });
    }
  };

  return (
    <Fragment>
      <div className="col-md-6 bg-dark d-flex align-items-center">
        <div className="p-5 wow fadeInUp" data-wow-delay="0.2s">
          <h5 className="section-title ff-secondary text-start text-primary fw-normal">
            Reservation
          </h5>
          <h1 className="text-white mb-4">Book A Table Online</h1>
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
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
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
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="datetime-local"
                    className={`form-control ${errors.datetime ? "is-invalid" : ""}`}
                    id="datetime"
                    value={formData.datetime}
                    onChange={handleChange}
                  />
                  <label htmlFor="datetime">Date & Time</label>
                  {errors.datetime && (
                    <div className="invalid-feedback">{errors.datetime}</div>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating">
                  <select
                    className="form-select"
                    id="people"
                    value={formData.people}
                    onChange={handleChange}
                  >
                    <option value="1">People 1</option>
                    <option value="2">People 2</option>
                    <option value="3">People 3</option>
                    <option value="4">People 4</option>
                    <option value="5">People 5</option>
                  </select>
                  <label htmlFor="people">No Of People</label>
                </div>
              </div>
              <div className="col-12">
                <div className="form-floating">
                  <textarea
                    className={`form-control ${errors.message ? "is-invalid" : ""}`}
                    placeholder="Special Request"
                    id="message"
                    style={{ height: "100px" }}
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                  <label htmlFor="message">Special Request</label>
                  {errors.message && (
                    <div className="invalid-feedback">{errors.message}</div>
                  )}
                </div>
              </div>
              <div className="col-12">
                <button className="btn btn-primary w-100 py-3" type="submit">
                  Book Now
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default BookingForm;
