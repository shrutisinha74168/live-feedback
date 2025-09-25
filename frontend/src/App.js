import React from "react";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackList from "./components/FeedbackList";

function App() {
  return (
    <div className="App">
      <h1 
  className="text-center my-4 text-primary fw-bold"
  style={{ letterSpacing: "2px", textShadow: "2px 2px 8px rgba(0,0,0,0.3)" }}
>
  Live Feedback Form 
</h1>

      <FeedbackForm />
      <FeedbackList />
    </div>
  );
}

export default App;
