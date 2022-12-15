import React from 'react';
import './modal.css';

function Modal({state, onClose, children}){
  return (
    <div id='modal' style={{display : state ? 'block' : 'none'}}>
      <span id='close-modal' onClick={onClose}>
        &times;
      </span>
      <div id='modal-content'>{children}</div>
    </div>
  );
}

export default Modal;