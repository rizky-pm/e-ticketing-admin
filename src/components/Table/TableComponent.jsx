import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTable } from 'react-table';

import { COLUMNS } from './columns';

import './style.css';

const TableComponent = ({ tableData }) => {
  const columns = useMemo(() => COLUMNS, []);
  const navigate = useNavigate();

  const tableInstance = useTable({
    columns,
    data: tableData,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const navigateToDetail = (event, data) => {
    event.preventDefault();
    navigate('/detail/' + data.id, { state: data });
  };

  const renderStatus = (status) => {
    switch (status) {
      case 'open':
        return (
          <span className='text-green-500 bg-green-200 py-1 px-4 w-24 text-center inline-block rounded uppercase font-semibold'>
            {status}
          </span>
        );
      case 'pending':
        return (
          <span className='text-yellow-500 bg-yellow-200 py-1 px-4 w-24 text-center inline-block rounded uppercase font-semibold'>
            {status}
          </span>
        );
      case 'closed':
        return (
          <span className='text-red-500 bg-red-200 py-1 px-4 w-24 text-center inline-block rounded uppercase font-semibold'>
            {status}
          </span>
        );
      default:
        break;
    }
  };

  return (
    <div className='rounded overflow-x-auto overflow-y-hidden h-[450px] bg-white'>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className='th-width py-4 px-6'>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className='even:bg-[#F3F7FB] py-4 px-6 hover:cursor-pointer hover:bg-slate-200 transition-all'
                onClick={(e) => {
                  navigateToDetail(e, row.original);
                }}
              >
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()} className='td-width'>
                      <span className='text-[#65768B] py-4 px-6 block truncate'>
                        {/* {cell.render('Cell')} */}
                        {cell.column.Header === 'Status'
                          ? renderStatus(cell.value)
                          : cell.render('Cell')}
                      </span>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
