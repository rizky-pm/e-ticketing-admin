import React from 'react';
import { useNavigate } from 'react-router-dom';

const TicketCard = ({ ticket }) => {
  const navigate = useNavigate();

  const navigateToDetail = (id) => {
    navigate('/detail/' + id, { state: ticket });
  };

  console.log(ticket);

  const renderColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-red-500 text-red-200';
      case 'review':
        return 'bg-yellow-500 text-yellow-200';
      case 'closed':
        return 'bg-green-500 text-green-200';
      default:
        break;
    }
  };

  return (
    <div
      className='border-2 border-blue-300 p-2 rounded-md'
      onClick={() => {
        navigateToDetail(ticket.id);
      }}
    >
      <h1 className='block truncate font-medium'>{ticket.titleReport}</h1>
      <p className='text-sm'>{ticket.date}</p>
      <div className='text-sm flex justify-between'>
        <span className='italic'>By {ticket.fullName}</span>
        <span
          className={`text-xs rounded-sm py-1 px-2 ${renderColor(
            ticket.status
          )}`}
        >
          {ticket.status}
        </span>
      </div>
    </div>
  );
};

export default TicketCard;
