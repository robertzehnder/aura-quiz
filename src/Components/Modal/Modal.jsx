import React from "react";
import "./Modal.css"; // Ensure proper CSS is applied

export default function Modal({ onClose, children }) {
  console.log("Modal rendered with children:", children); // Debugging output

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => {
          e.stopPropagation(); // Prevent closing when clicking inside the modal
        }}
      >
        <button className="close-modal" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
