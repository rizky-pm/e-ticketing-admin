import React from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';

const TextareaComponent = () => {
  return (
    <TextareaAutosize
      aria-label='comment'
      minRows={1}
      placeholder='Your message'
      style={{
        width: '100%',
        border: '.0625rem solid lightgray',
        padding: '.625rem',
        resize: 'none',
      }}
    />
  );
};

export default TextareaComponent;
