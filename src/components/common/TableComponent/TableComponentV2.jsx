// import React from 'react';
// import './TableComponent.style.css';
// import { Link } from 'react-router-dom';

// import {
//     Table,
//     TableContainer,
//     TableHead,
//     TableRow,
//     TableCell,
//     TableBody,
//     Paper,
//     Button,
// } from '@mui/material';

// const TableComponentV2 = ({
//     data,
//     hiddenFields,
//     viewButton,
//     updateDetails,
//     viewDetails,
//     viewBookingButton,
//     bookingDetails,

// }) => {
//     const handleUpdate = (id) => {
//         updateDetails(id);
//     };

//     const handleViewDetails = (details) => {
//         viewDetails(details);
//     };

//     const handleViewBookingDetails = (details) => {
//         bookingDetails(details);
//     };
//     const handlePackagesDetails = () => {

//     }

//     const stringifiedUser = localStorage.getItem('userData');
//     const userData = stringifiedUser ? JSON.parse(stringifiedUser) : null;

//     return (
//         <div className="table-container">
//             {data && data.length > 0 ? (
//                 <TableContainer component={Paper}>
//                     <Table>
//                         <TableHead>
//                             <TableRow className="table-header">
//                                 {Object.keys(data[0]).map((key, index) => {
//                                     if (!hiddenFields || !hiddenFields.includes(key)) {
//                                         if (key == 'sessionSchedulesId') {
//                                             return (
//                                                 <TableCell key={index} className="table-cell">
//                                                     Service ID
//                                                 </TableCell>
//                                             );
//                                         } else {
//                                             return (
//                                                 <TableCell key={index} className="table-cell">
//                                                     {key
//                                                         .replace(/_/g, ' ')
//                                                         .replace(/([a-z])([A-Z])/g, '$1 $2')
//                                                         .replace(/\b\w/g, (l) => l.toUpperCase())}
//                                                 </TableCell>
//                                             );
//                                         }
//                                     }
//                                     return null;
//                                 })}
//                                 {viewBookingButton && (
//                                     <TableCell className="table-cell">View</TableCell>
//                                 )}
//                             </TableRow>
//                         </TableHead>

//                         <TableBody>
//                             {data.map((row, rowIndex) => (
//                                 <TableRow key={rowIndex}>
//                                     {Object.keys(row).map((key, colIndex) => {
//                                         if (!hiddenFields || !hiddenFields.includes(key)) {
//                                             return (
//                                                 <TableCell key={colIndex} className="table-cell">
//                                                     {key === 'map' ? (
//                                                         <Link to={row[key]} target="_blank">
//                                                             Click here
//                                                         </Link>
//                                                     ) : (
//                                                         row[key]
//                                                     )}
//                                                 </TableCell>
//                                             );
//                                         }
//                                         return null;
//                                     })}
//                                     {viewButton && (
//                                         <TableCell className="table-cell">
//                                             {viewButton === 'img' ? (
//                                                 <img
//                                                     className="view-unchecked-img"
//                                                     src={`${row.image}?w=100&h=100&fit=crop`}
//                                                     onClick={() => window.open(row.image, '_blank')}
//                                                     alt="img"
//                                                 />
//                                             ) : (
//                                                 <Button
//                                                     variant="contained"
//                                                     color="primary"
//                                                     onClick={() => handleViewDetails(row)}
//                                                 >
//                                                     {viewButton}
//                                                 </Button>
//                                             )}
//                                         </TableCell>
//                                     )}
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             ) : (
//                 <div className="no-data-found">
//                     <p>Data not found</p>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default TableComponentV2;






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

const TableComponentV2 = ({
    data,
    hiddenFields,
    buttonsConfig,
    updateDetails,
    viewDetails,
    deleteDetails,
    viewImage=false
}) => {
    const handleButtonClick = (action, row) => {
        if (action === 'update') {
            updateDetails(row.id);
        } else if (action === 'view') {
            viewDetails(row);
        } else if (action === 'booking') {
            deleteDetails(row);
        }
    };

    const stringifiedUser = localStorage.getItem('userData');
    const userData = stringifiedUser ? JSON.parse(stringifiedUser) : null;

    return (
        <div className="table-container">
            {data && data.length > 0 ? (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow className="table-header">
                                {Object.keys(data[0]).map((key, index) => {
                                    if (!hiddenFields || !hiddenFields.includes(key)) {
                                        if (key === 'sessionSchedulesId') {
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
                                 {viewImage && (
                                    <TableCell className="table-cell">Image</TableCell>
                                )}
                                {buttonsConfig && buttonsConfig.length > 0 && (
                                    <TableCell className="table-cell">Action</TableCell>
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
                                                        row[key]
                                                    )}
                                                </TableCell>
                                            );
                                        }
                                        return null;
                                    })}
                                    {viewImage&& <TableCell className="table-cell">
                                        (
                                            <img
                                                className="view-unchecked-img"
                                                src={`${row.image}?w=100&h=100&fit=crop`}
                                                onClick={() => window.open(row.image, '_blank')}
                                                alt="img"
                                            />
                                        )
                                    </TableCell>}
                                    {buttonsConfig && buttonsConfig.length > 0 && (
                                        <TableCell className="table-cell" style={{display:"flex",flexDirection:"column"}}>
                                            {buttonsConfig.map((buttonConfig, index) => (
                                                <Button
                                                    key={index}
                                                    variant="contained"
                                                    color="primary"
                                                    sx={{ mb: '5px', borderRadius: '7px'}}
                                                    onClick={() => handleButtonClick(buttonConfig.action, row)}
                                                >
                                                    {buttonConfig.label}
                                                </Button>
                                               
                                            ))}
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

export default TableComponentV2;
