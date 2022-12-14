import React from 'react';
import './modal.css';

function Modal({onOpen, children}) {
  return <div id='modal-button' onClick={onOpen}> {children}</div>;
}

function ModalContent({onClose, children}){
  return (
    <div id='modal'>
      <span id='close-modal' onClick={onClose}>
        &times;
      </span>
      <div id='modal-content'>{children}</div>
    </div>
  );
}

export { Modal, ModalContent };
