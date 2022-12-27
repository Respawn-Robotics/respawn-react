import React from 'react';
import './modal.css';

function Modal({ state, caption, onClose, children }) {
  return (
    <div id='modal' style={{ display: state ? 'flex' : 'none' }}>
      <span id='close-modal' onClick={onClose}>
        &times;
      </span>
      <div id='modal-content'>
        {children}
        <p id='modal-caption'>{children.props.alt}</p>
      </div>
    </div>
  );
}

export default Modal;