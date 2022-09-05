import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from '@mui/material/Pagination';

import { fetchTickets } from '../rtk/features/ticketsSlice';

import TicketCard from '../components/TicketCard';
import TableComponent from '../components/Table/TableComponent';

const Main = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);

  const tickets = useSelector((state) => state.tickets.data);
  const dispatch = useDispatch();

  const paginate = (array, pageSize, pageNumber) => {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  };

  const handleChangePage = (e, pg) => {
    setPage(pg);
  };

  const data = paginate(tickets, pageSize, page);

  useEffect(() => {
    dispatch(fetchTickets());
  }, []);

  return (
    <main className='py-2 px-4'>
      <h1 className='text-2xl font-bold'>Tickets List</h1>

      <div className='space-y-2'>
        <TableComponent tableData={data} />
        {/* {tickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))} */}
        <Pagination
          count={Math.ceil(tickets.length / pageSize)}
          variant='outlined'
          shape='rounded'
          onChange={handleChangePage}
        />
      </div>
    </main>
  );
};

export default Main;
