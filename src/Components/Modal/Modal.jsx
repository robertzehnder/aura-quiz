import React, { useEffect } from "react";
import "./Modal.css";

export default function Modal({ onClose, children }) {
  useEffect(() => {
    document.body.classList.add("modal-active");
    return () => {
      document.body.classList.remove("modal-active");
    };
  }, []);

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
