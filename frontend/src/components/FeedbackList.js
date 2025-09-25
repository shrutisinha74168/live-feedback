import React, { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import { Modal, Button } from "react-bootstrap";

const socket = io("http://localhost:5000");

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/feedback");
        setFeedbacks(res.data);
      } catch (err) {
        console.error("Error fetching feedbacks", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    socket.on("newFeedback", (data) => setFeedbacks((prev) => [data, ...prev]));
    socket.on("deleteFeedback", (id) => setFeedbacks((prev) => prev.filter((fb) => fb._id !== id)));
    return () => {
      socket.off("newFeedback");
      socket.off("deleteFeedback");
    };
  }, []);

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/feedback/${deleteId}`);
      setShowModal(false);
      setDeleteId(null);
      // socket event will update frontend
    } catch (err) {
      console.error(err);
      alert("Error deleting feedback");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">💬 Live Feedbacks</h2>

      {feedbacks.length === 0 ? (
        <p className="text-center text-muted">No feedback yet. Be the first!</p>
      ) : (
        <div className="row">
          {feedbacks.map((fb) => (
            <div className="col-md-6 mb-3" key={fb._id}>
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">
                    {fb.name}{" "}
                    <small className="text-muted" style={{ fontSize: "0.8rem" }}>
                      ({fb.email})
                    </small>
                  </h5>
                  <p className="card-text">{fb.message}</p>
                  <p className="text-muted" style={{ fontSize: "0.8rem" }}>
                    {new Date(fb.createdAt).toLocaleString()}
                  </p>
                  <Button variant="danger" size="sm" onClick={() => confirmDelete(fb._id)}>
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bootstrap Modal for Delete */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>⚠️ Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this feedback?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FeedbackList;
