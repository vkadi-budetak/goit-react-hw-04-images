import React, { useEffect } from 'react';

const Modal = ({ data, onCloseModal }) => {
  const onOverlayClick = event => {
    if (event.currentTarget === event.target) {
      onCloseModal();
    }
  };

  const onKeyDown = event => {
    if (event.code === 'Escape') {
      onCloseModal();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <div onClick={onOverlayClick} className="Overlay">
      <div className="Modal">
        <img src={data.src} alt={data.alt} />
      </div>
    </div>
  );
};

export default Modal;