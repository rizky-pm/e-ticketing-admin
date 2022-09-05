import React from 'react';
import { Routes, Route } from 'react-router';

import Main from '../pages/Main';
import Detail from '../pages/Detail';

const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/detail/:id' element={<Detail />} />
    </Routes>
  );
};

export default Routers;
