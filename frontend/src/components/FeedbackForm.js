import React, { useState } from "react";
import axios from "axios";
import "animate.css";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const FeedbackForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) return toast.error("Fill all fields!");

    try {
      await axios.post("http://localhost:5000/api/feedback", {
        name,
        email,
        message,
      });

      // Clear form
      setName("");
      setEmail("");
      setMessage("");

      // Show success popup
      toast.success("✅ Feedback submitted successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (err) {
      console.error(err);
      toast.error("❌ Error submitting feedback", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        {/* Animated Heading */}
        <h2 className="text-center mb-4 animate__animated animate__fadeInDown animate__slow">
          Submit Your Feedback
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Message</label>
            <textarea
              className="form-control"
              rows="4"
              placeholder="Write your feedback..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 animate__animated animate__pulse animate__infinite"
          >
            Submit Feedback
          </button>
        </form>
      </div>

      {/* Toast container */}
      <ToastContainer />
    </div>
  );
};

export default FeedbackForm;
