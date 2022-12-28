import React from 'react';
import './modal.css';

function Modal({ caption, state, onClose, children }) {
  return (
    <div id='modal' style={{ display: state ? 'flex' : 'none' }}>
      <span id='close-modal' onClick={onClose}>
        &times;
      </span>
      <div id='modal-content'>
        {children}
        <p id='modal-caption'>{caption}</p>
      </div>
    </div>
  );
}

export default Modal;