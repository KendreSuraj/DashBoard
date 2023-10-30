/* eslint-disable react/prop-types */
import React from 'react';
import './TableComponent.style.css';

import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@mui/material';

const TableComponent = ({ data }) => {

  return (
    <div className="table-container">

      <TableContainer component={Paper}>

        <Table>

          <TableHead>
            <TableRow className="table-header">
              {data.length > 0 &&
                Object.keys(data[0]).map((key, index) => (
                  <TableCell key={index} className="table-cell">
                    {key}
                  </TableCell>
                ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {Object.values(row).map((value, colIndex) => (
                  <TableCell key={colIndex} className="table-cell">
                    {value}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
          
        </Table>

      </TableContainer>

    </div>
  );
};

export default TableComponent;
