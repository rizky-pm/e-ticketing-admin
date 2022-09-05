import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DocumentIcon } from '@heroicons/react/24/outline';
import ModalComponent from '../components/ModalComponent';

const Detail = () => {
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const { state } = useLocation();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  console.log(state);

  return (
    <div className='relative py-2 px-4'>
      <h1 className='text-xl font-bold'>{state.titleReport}</h1>
      <p className='italic'>By {state.fullName}</p>
      <p className='text-sm'>{state.date}</p>
      <p className='mt-4'>{state.descriptionReport}</p>

      {state.attachment ? (
        <div className='mt-4 font-medium text-lg'>
          <p>Attachment</p>

          <div
            className='w-full h-60 bg-[#F7F9F9] border-dashed border-2 border-darkGreen flex flex-col justify-center items-center space-y-4'
            onClick={(e) => {
              console.log('Clicked');
              console.log(state.attachment);
              handleOpen();

              if (
                ['bmp', 'jpg', 'jpeg', 'gif', 'png'].includes(
                  state.attachment.extension
                )
              ) {
                console.log('its an image');
                setModalData({
                  image: state.attachment.base64String,
                  imageName: state.attachment.fileName,
                });
              }
            }}
          >
            <div className='flex flex-col justify-center items-center'>
              <DocumentIcon className='w-10 h-10 text-gray-500' />
            </div>
          </div>
        </div>
      ) : (
        <div className='mt-4 font-medium text-lg'>
          <p className='text-center'>No Attachment</p>
        </div>
      )}

      <div className='absolute'>
        <ModalComponent
          open={open}
          handleClose={handleClose}
          data={modalData}
        />
      </div>
    </div>
  );
};

export default Detail;
