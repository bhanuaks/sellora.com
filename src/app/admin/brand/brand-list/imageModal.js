'use client';

import { baseUrl } from '@/Http/helper';
import { fileBasePath } from '@/Http/urlHelper';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth:'50%'
  },
};
export default function ImageModal({modalIsOpen, setIsOpen, path,type}) {

  let subtitle;

  useEffect(() => {
    // Use body instead of #__next to prevent selector error
    Modal.setAppElement(document.body);
  }, []);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    if (subtitle) subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      {/* <button onClick={openModal}>Open Modal</button> */}
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {/* <h2 ref={(ref) => (subtitle = ref)}></h2> */}
        <button onClick={closeModal}>close</button>
         
         <div>
          {type === "pdf" ? (
            <iframe 
            src={`${fileBasePath}${path}`} 
            title="PDF Preview" 
            width="100%" 
            height="500px"
            style={{ border: 'none' }}
          ></iframe>
          ):( 
            <img src={`${baseUrl}${path}`} alt='cirtificate' style={{maxWidth:"100%"}} />
          )}
         </div>
      </Modal>
    </div>
  );
}
