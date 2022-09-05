import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { DocumentIcon } from '@heroicons/react/24/outline';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import moment from 'moment';
import 'moment/locale/id';

import { fetchTicket, patchComment } from '../rtk/features/ticketSlice';

import ModalComponent from '../components/ModalComponent';
import CommentCard from '../components/CommentCard';

const Detail = () => {
  const [comment, setComment] = useState('');
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const params = useParams();
  const ticket = useSelector((state) => state.ticket);
  const dispatch = useDispatch();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleComment = (e) => {
    setComment(e.target.value);
  };

  const generateRandomId = (len) => {
    return Math.random()
      .toString(36)
      .substring(2, len + 2);
  };

  const handleSubmitComment = () => {
    const data = {
      comments: [
        ...ticket?.data?.comments,
        {
          id: generateRandomId(34),
          message: comment,
          attachment: null,
          date: moment().format('dddd, Do/MM/YYYY - HH:mm:ss'),
          user: {
            id: '1',
            name: 'administrator',
          },
        },
      ],
    };

    const payload = {
      id: params.id,
      data,
    };

    dispatch(patchComment(payload));
  };

  const downloadFile = (file) => {
    // console.log(file.attachment.base64String);
    const meta = file.attachment.base64String.substring(
      file.attachment.base64String.indexOf(','),
      0
    );

    const base64String = file.attachment.base64String.substring(
      file.attachment.base64String.indexOf(',')
    );

    console.log(meta + base64String);
    const linkSource = `${meta + base64String}`;
    const downloadLink = document.createElement('a');
    const fileName = file.attachment.fileName;

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  };

  useEffect(() => {
    dispatch(fetchTicket(params.id));
  }, []);

  return (
    <div className='relative py-2 px-4'>
      {ticket.isFetching ? (
        <h1>Loading data ...</h1>
      ) : (
        <div className='space-y-4'>
          <h1 className='text-xl font-bold'>{ticket.data?.titleReport}</h1>
          <p className='italic'>By {ticket.data?.fullName}</p>
          <p className='text-sm'>{ticket.data?.date}</p>
          <p className=''>{ticket.data?.descriptionReport}</p>

          {ticket.data?.attachment ? (
            <div>
              <p className='font-medium text-lg'>Attachment</p>

              <div
                className='w-full h-60 bg-[#F7F9F9] border-dashed border-2 border-darkGreen flex flex-col justify-center items-center space-y-4'
                onClick={(e) => {
                  if (
                    ['bmp', 'jpg', 'jpeg', 'gif', 'png'].includes(
                      ticket.data?.attachment.extension
                    )
                  ) {
                    handleOpen();
                    setModalData({
                      base64String: ticket.data?.attachment.base64String,
                      fileName: ticket.data?.attachment.fileName,
                      extension: ticket.data?.attachment.extension,
                    });
                  } else {
                    downloadFile(ticket?.data);
                    console.log(ticket?.data.attachment);
                  }
                }}
              >
                <div className='flex flex-col justify-center items-center'>
                  <DocumentIcon className='w-10 h-10 text-gray-500' />
                  <span>{ticket?.data.attachment.fileName}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className=' font-medium text-lg'>
              <p className='text-center'>No Attachment</p>
            </div>
          )}

          <div className='space-y-4 flex flex-col'>
            <p className='font-medium text-lg'>Comments</p>
            {ticket?.data.comments ? (
              ticket?.data.comments.map((comment, index) => {
                return <CommentCard comment={comment} key={index} />;
              })
            ) : (
              <p className='font-medium text-stone-400 text-center'>
                No comment
              </p>
            )}
          </div>

          <div className='space-y-4 flex flex-col'>
            <p className='font-medium text-lg'>Add Comment</p>
            <TextareaAutosize
              aria-label='comment'
              minRows={1}
              placeholder='Your message'
              onChange={(e) => {
                handleComment(e);
              }}
              style={{
                width: '100%',
                border: '.0625rem solid lightgray',
                padding: '.625rem',
                resize: 'none',
              }}
            />
            <button
              onClick={handleSubmitComment}
              className='py-1 px-4 rounded bg-red-500'
            >
              Comment
            </button>
          </div>

          <div className='absolute'>
            <ModalComponent
              open={open}
              handleClose={handleClose}
              data={modalData}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
