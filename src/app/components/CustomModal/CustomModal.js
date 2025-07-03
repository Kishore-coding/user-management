import React from "react";
import "./CustomModal.scss";

const CustomModal = ({ show, onClose, children, className }) => {
  if (!show) return null;
  return (
    <div className={`modal-backdrop ${className}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

export default CustomModal;
