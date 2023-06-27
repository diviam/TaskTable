import React, { useEffect, useState } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import CountryTable from './CountryTable';

// Rest of your code...

const App = () => {
  return (
    <BrowserRouter>
      <CountryTable />
    </BrowserRouter>
  );
};

export default App;
