import React from 'react';
import './TableComponent.style.css';
import { Link } from 'react-router-dom';

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
  viewPackagesButton,
  viewBookingButton,
  bookingDetails,
  deleteCoupon,
  deleteCouponButton,
  deleteFAQ,
  deleteFAQButton,
  deletePaymentButton,
  deletePayment,
  verifyPaymentButton,
  verifyPayment
}) => {
  const handleUpdate = (id) => {
    updateDetails(id);
  };

  const handleViewDetails = (details) => {
    viewDetails(details);
  };

  const handleViewBookingDetails = (details) => {
    bookingDetails(details);
  };
  const handlePackagesDetails = () => {

  }

  const stringifiedUser = localStorage.getItem('userData');
  const userData = stringifiedUser ? JSON.parse(stringifiedUser) : null;
  const concentrixUser =
    userData && userData.user && userData.user.concentrixUser
      ? userData.user.concentrixUser
      : false;

  return (
    <div className="table-container">
      {data && data.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow className="table-header">
                {Object.keys(data[0]).map((key, index) => {
                  if (!hiddenFields || !hiddenFields.includes(key)) {
                    if (key == 'sessionSchedulesId') {
                      return (
                        <TableCell key={index} className="table-cell">
                          Service ID
                        </TableCell>
                      );
                    } else {
                      return (
                        <TableCell key={index} className="table-cell">
                          {key
                            .replace(/_/g, ' ')
                            .replace(/([a-z])([A-Z])/g, '$1 $2')
                            .replace(/\b\w/g, (l) => l.toUpperCase())}
                        </TableCell>
                      );
                    }
                  }
                  return null;
                })}
                {viewButton && (
                  <TableCell className="table-cell">view</TableCell>
                )}
                {showUpdateButton && (
                  <TableCell className="table-cell">Actions</TableCell>
                )}
                {!concentrixUser && viewBookingButton && (
                  <TableCell className="table-cell">View</TableCell>
                )}
                {deleteCouponButton && (
                  <TableCell className="table-cell">Delete</TableCell>
                )}
                {deleteFAQButton && (
                  <TableCell className="table-cell">Delete</TableCell>
                )}
                {deletePaymentButton && (
                  <TableCell className="table-cell">Delete</TableCell>
                )}
                {verifyPaymentButton && (
                  <TableCell className="table-cell">Verify Payment</TableCell>
                )}
                {viewPackagesButton && (
                  <TableCell className="table-cell">View</TableCell>
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
                          {key === 'map' ? (
                            <Link to={row[key]} target="_blank">
                              Click here
                            </Link>
                          ) : (
                            key === 'image' ? <img
                              className="view-unchecked-img"
                              src={`${row[key]}?w=100&h=100&fit=crop`}
                              onClick={() => window.open(row[key], '_blank')}
                              style={{ maxWidth: '100px', maxHeight: '100px', cursor: 'pointer' }}
                              alt="img"
                            /> : row[key]
                          )}
                        </TableCell>
                      );
                    }
                    return null;
                  })}
                  {viewButton && (
                    <TableCell className="table-cell">
                      {viewButton === 'img' ? (
                        <img
                          className="view-unchecked-img"
                          src={`${row.image}?w=100&h=100&fit=crop`}
                          onClick={() => window.open(row.image, '_blank')}
                          alt="img"
                        />
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleViewDetails(row)}
                        >
                          {viewButton}
                        </Button>
                      )}
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

                  {!concentrixUser
                    ? viewBookingButton && (
                      <TableCell className="table-cell">
                        {viewBookingButton === 'img' ? (
                          <img
                            className="view-unchecked-img"
                            src={`${row.image}?w=100&h=100&fit=crop`}
                            onClick={() => window.open(row.image, '_blank')}
                            alt="img"
                          />
                        ) : (
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleViewBookingDetails(row)}
                          >
                            {viewBookingButton}
                          </Button>
                        )}
                      </TableCell>
                    )
                    : ''}

                  {viewPackagesButton && (
                    <TableCell className="table-cell">
                      {viewPackagesButton === 'img' ? (
                        <img
                          className="view-unchecked-img"
                          src={`${row.image}?w=100&h=100&fit=crop`}
                          onClick={() => window.open(row.image, '_blank')}
                          alt="img"
                        />
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handlePackagesDetails(row)}
                        >
                          {viewPackagesButton}
                        </Button>
                      )}
                    </TableCell>
                  )}
                  {deleteCouponButton && (
                    <TableCell className="table-cell">
                      {deleteCouponButton === 'img' ? (
                        <img
                          className="view-unchecked-img"
                          src={`${row.image}?w=100&h=100&fit=crop`}
                          onClick={() => window.open(row.image, '_blank')}
                          alt="img"
                        />
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          style={{ backgroundColor: '#D70040', color: 'white' }}
                          onClick={() => deleteCoupon(row)}
                        >
                          {deleteCouponButton}
                        </Button>
                      )}
                    </TableCell>
                  )}
                  {deletePaymentButton && (
                    <TableCell className="table-cell">
                      {deletePaymentButton === 'img' ? (
                        <img
                          className="view-unchecked-img"
                          src={`${row.image}?w=100&h=100&fit=crop`}
                          onClick={() => window.open(row.image, '_blank')}
                          alt="img"
                        />
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          style={{ backgroundColor: '#D70040', color: 'white' }}
                          onClick={() => deletePayment(row)}
                        >
                          {deletePaymentButton}
                        </Button>
                      )}
                    </TableCell>
                  )}

                  {!row.isValidated && verifyPaymentButton && (
                    <TableCell className="table-cell">
                      {deletePaymentButton === 'img' ? (
                        <img
                          className="view-unchecked-img"
                          src={`${row.image}?w=100&h=100&fit=crop`}
                          onClick={() => window.open(row.image, '_blank')}
                          alt="img"
                        />
                      ) : (
                        <Button
                          variant="contained"
                          color="success"
                          style={{ backgroundColor: '#0d9149', color: 'white' }}
                          onClick={() => {
                            verifyPayment(row)
                          }}
                        >
                          {verifyPaymentButton}
                        </Button>
                      )}
                    </TableCell>
                  )}

                  {deleteFAQButton && (
                    <TableCell className="table-cell">
                      {deleteFAQButton === 'img' ? (
                        <img
                          className="view-unchecked-img"
                          src={`${row.image}?w=100&h=100&fit=crop`}
                          onClick={() => window.open(row.image, '_blank')}
                          alt="img"
                        />
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          style={{ backgroundColor: '#D70040', color: 'white' }}
                          onClick={() => deleteFAQ(row)}
                        >
                          {deleteFAQButton}
                        </Button>
                      )}
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