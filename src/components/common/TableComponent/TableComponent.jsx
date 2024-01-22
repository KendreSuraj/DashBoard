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
  Button,
} from '@mui/material';

const TableComponent = ({
  data,
  hiddenFields,
  showUpdateButton,
  viewButton,
  updateDetails,
  viewDetails,
  viewBookingButton,
  bookingDetails,
  deleteCoupon,
  deleteCouponButton
}) => {
  const handleUpdate = (id) => {
    updateDetails(id);
  };

  const handleViewDetails = (details) => {
    viewDetails(details);
  };

  const handleViewBookingDetails = (details) => {
    bookingDetails(details)
  }

  return (
    <div className="table-container">
      {data && data.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow className="table-header">
                {Object.keys(data[0]).map((key, index) => {
                  if (!hiddenFields || !hiddenFields.includes(key)) {
                    return (
                      <TableCell key={index} className="table-cell">
                        {key
                          .replace(/_/g, ' ')
                          .replace(/([a-z])([A-Z])/g, '$1 $2')
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </TableCell>
                    );
                  }
                  return null;
                })}
                {viewButton && (
                  <TableCell className="table-cell">view</TableCell>
                )}
                {showUpdateButton && (
                  <TableCell className="table-cell">Actions</TableCell>
                )}
                {viewBookingButton && (
                  <TableCell className="table-cell">View</TableCell>
                )}
                {deleteCouponButton && (
                  <TableCell className="table-cell">Delete</TableCell>
                )}
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {Object.keys(row).map((key, colIndex) => {
                    if (!hiddenFields || !hiddenFields.includes(key)) {
                      return (
                        <TableCell key={colIndex} className="table-cell">
                          {row[key]}
                        </TableCell>
                      );
                    }
                    return null;
                  })}
                  {viewButton && (
                    <TableCell className="table-cell">
                      {viewButton === 'img' ? <img
                        className="view-unchecked-img"
                        src={`${row.image}?w=100&h=100&fit=crop`}
                        onClick={() => window.open(row.image, '_blank')}
                        alt="img"
                      /> : <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleViewDetails(row)}
                      >
                        {viewButton}
                      </Button>
                      }
                    </TableCell>
                  )}
                  {showUpdateButton && (
                    <TableCell className="table-cell">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleUpdate(row.id)}
                      >
                        Update
                      </Button>
                    </TableCell>
                  )}
                  {viewBookingButton && (
                    <TableCell className="table-cell">
                      {viewBookingButton === 'img' ? <img
                        className="view-unchecked-img"
                        src={`${row.image}?w=100&h=100&fit=crop`}
                        onClick={() => window.open(row.image, '_blank')}
                        alt="img"
                      /> : <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleViewBookingDetails(row)}
                      >
                        {viewBookingButton}
                      </Button>
                      }
                    </TableCell>
                  )}
                  {deleteCouponButton && (
                    <TableCell className="table-cell">
                      {deleteCouponButton === 'img' ? <img
                        className="view-unchecked-img"
                        src={`${row.image}?w=100&h=100&fit=crop`}
                        onClick={() => window.open(row.image, '_blank')}
                        alt="img"
                      /> : <Button
                        variant="contained"
                        color="primary"
                        style={{ backgroundColor: '#D70040', color: 'white' }}
                        onClick={() => deleteCoupon(row)}
                      >
                        {deleteCouponButton}
                      </Button>
                      }
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div className="no-data-found">
          <p>Data not found</p>
        </div>
      )}
    </div>
  );
};

export default TableComponent;
