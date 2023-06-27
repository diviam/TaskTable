import React, { useEffect, useState } from 'react';
import { useLocation,Link, NavLink } from 'react-router-dom';
import { demoData } from './jsonData';
import TableHead from '@mui/material/TableHead';
import { Box, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
const CountryTable = () => {
  const [sortedCountries, setSortedCountries] = useState(demoData?.slice(0,20));
  const [sortOrder, setSortOrder] = useState({
    name: 'asc',
    dial_code: 'asc',
    code: 'asc'
  });
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const sortParam = searchParams.get('sort');

    if (sortParam) {
      const sortFields = sortParam.split(',');

      const updatedSortOrder = {};
      sortFields.forEach(field => {
        updatedSortOrder[field] = sortOrder[field] === 'asc' ? 'desc' : 'asc';
      });

      setSortOrder(updatedSortOrder);
      sortData(sortFields);
    }
  }, [location.search]);

  const handleSortClick = (field) => {
    const newSortOrder = sortOrder[field] === 'asc' ? 'desc' : 'asc';
    setSortOrder(prevState => ({
      ...prevState,
      [field]: newSortOrder
    }));

    sortData([field]);
      // Update URL based on the field
    updateURLParams();
  };

  const sortData = sortFields => {
    const sortedData = [...sortedCountries].sort((a, b) => {
      for (let field of sortFields) {
        if (a[field] < b[field]) return sortOrder[field] === 'asc' ? -1 : 1;
        if (a[field] > b[field]) return sortOrder[field] === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setSortedCountries(sortedData);
  };

  const updateURLParams = () => {
    const searchParams = new URLSearchParams();
    const sortFields = Object.keys(sortOrder).filter(field => sortOrder[field] !== 'asc');
    if (sortFields.length > 0) {
      searchParams.set('sort', sortFields.join(','));
    }

    const url = `${location.pathname}?${searchParams.toString()}`;
    window.history.pushState(null, '', url);
  };

  return (
    <div
      style={{
        width: "50%", margin: "40px auto"
        

      }}
    > <TableContainer >
        <Table sx={{
          minWidth: 500, border: "1px solid lightgrey"
        }} aria-label="simple table">
          <TableHead sx={{backgroundColor:"rgb(249 250 251)",cursor:"pointer"}} >
            <TableRow>
              <TableCell sx={{cursor:"pointer"}}><span onClick={() => handleSortClick('name')}>Name {sortOrder.name === 'asc' ? '▲' : '▼'}</span></TableCell>
              <TableCell sx={{cursor:"pointer"}} align="right"><span onClick={() => handleSortClick('dial_code')}> Dial Code {sortOrder.dial_code === 'asc' ? '▲' : '▼'}</span></TableCell>
              <TableCell sx={{cursor:"pointer"}} align="right"><span onClick={() => handleSortClick('code')}>Code {sortOrder.code === 'asc' ? '▲' : '▼'}</span></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedCountries.map((country) => (
              <TableRow
                key={country.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {country.name}
                </TableCell>
                <TableCell align="right">{country.dial_code}</TableCell>
                <TableCell align="right">{country.code}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer></div>

  );
};

export default CountryTable;
