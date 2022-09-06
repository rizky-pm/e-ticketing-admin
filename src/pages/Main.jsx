import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from '@mui/material/Pagination';

import { fetchTickets } from '../rtk/features/ticketsSlice';

import TableComponent from '../components/Table/TableComponent';
import Navbar from '../components/Navbar';

const Main = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const tickets = useSelector((state) => state.tickets.data);
  const dispatch = useDispatch();

  const paginate = (array, pageSize, pageNumber) => {
    return array?.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  };

  const handleChangePage = (e, pg) => {
    setPage(pg);
  };

  const data = paginate(tickets, pageSize, page);

  useEffect(() => {
    dispatch(fetchTickets());
  }, []);

  return (
    <>
      <Navbar />
      <main className='space-y-10 py-8 px-6 lg:py-10 lg:px-20'>
        <TableComponent tableData={data} />
        <Pagination
          count={Math.ceil(tickets.length / pageSize)}
          variant='outlined'
          shape='rounded'
          onChange={handleChangePage}
        />
      </main>
    </>
  );
};

export default Main;
