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
}) => {
  const handleUpdate = (id) => {
    updateDetails(id);
  };

  const handleViewDetails = (details) => {
    viewDetails(details);
  };

  return (
    <div className="table-container">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow className="table-header">
              {data?.length > 0 &&
                Object.keys(data[0]).map((key, index) => {
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
              {viewButton && <TableCell className="table-cell">view</TableCell>}
              {showUpdateButton && (
                <TableCell className="table-cell">Actions</TableCell>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {data?.map((row, rowIndex) => (
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
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleViewDetails(row)}
                    >
                      View
                    </Button>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableComponent;
