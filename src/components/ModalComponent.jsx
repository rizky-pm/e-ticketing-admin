import React from 'react';
import Modal from '@mui/material/Modal';
import { DocumentIcon } from '@heroicons/react/24/outline';

const ModalComponent = ({ open, handleClose, data }) => {
  const openImage = (base64) => {
    let data = base64;
    let w = window.open();
    let image = new Image();
    image.src = data;
    setTimeout(function () {
      w.document.write(image.outerHTML);
    }, 0);
  };

  const renderAttachment = (file) => {
    if (['bmp', 'jpg', 'jpeg', 'gif', 'png'].includes(file?.extension)) {
      return (
        <img
          src={data?.base64String}
          alt={data?.fileName}
          className='w-11/12 h-auto object-contain bg-slate-200 rounded secondary-box-shadow'
          onClick={() => openImage(data.base64String)}
        />
      );
    } else {
      return (
        <div className='flex items-center justify-center w-52 h-52'>
          <DocumentIcon className='w-10 h-10 text-gray-500' />
        </div>
      );
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <div className='absolute top-1/2 left-1/2 w-5/6 -translate-x-1/2 -translate-y-1/2 bg-white flex flex-col items-center p-2 space-y-2 rounded primary-box-shadow'>
        <h1 className='w-full font-bold self-start block truncate'>
          {data?.fileName}
        </h1>
        {renderAttachment(data)}
        <button
          onClick={handleClose}
          className='self-end bg-blue-500 text-blue-200 py-1 px-4 rounded font-semibold'
        >
          CLOSE
        </button>
      </div>
    </Modal>
  );
};

export default ModalComponent;
