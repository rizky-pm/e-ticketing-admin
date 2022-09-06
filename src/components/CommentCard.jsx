import React from 'react';

const CommentCard = ({ comment }) => {
  return (
    <div
      className={`space-y-2 ${
        comment?.user.id === 1 ? 'self-end text-right' : 'self-start'
      } border-2 border-slate-500 rounded-lg p-4 w-5/6 bg-slate-50`}
    >
      <p className='font-semibold text-lg'>{comment.user.name}</p>
      <p className='text-sm italic'>{comment.date}</p>
      <p className=''>{comment.message}</p>
    </div>
  );
};

export default CommentCard;
