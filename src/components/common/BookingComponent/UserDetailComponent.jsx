// UserDetailsComponent

import React from 'react';
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Button } from '@mui/material';

const UserDetailsComponent = ({ data, machineDetails, handleSetOfficeLeftTime }) => {
    const keys = Object.keys(data);
    const keys1 = Object.keys(machineDetails);
    const middleIndex = Math.ceil(keys.length / 2);
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
                    <TableContainer style={{ overflowX: 'auto' }}>
                        <h3>Client Details</h3>
                        <Table>
                            <TableBody>
                                {keys.slice(0, middleIndex + 1).map((key) => (
                                    <TableRow key={key}>
                                        <TableCell>
                                            <strong>{key}:</strong>
                                        </TableCell>
                                        <TableCell>
                                            {
                                                key === 'Left for appointment' && data[key] ? new Date(new Date(data[key]).getTime() + 5.5 * 60 * 60 * 1000).toISOString().split('T')[1].split('.')[0] : key === 'Left for appointment' && !data[key] ? <Button variant="contained" color="primary" type="submit" onClick={handleSetOfficeLeftTime}>Left Time</Button> : data[key]
                                            }
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
                <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
                    <TableContainer style={{ overflowX: 'auto' }}>
                        <h3>Therapist Details</h3>
                        <Table>
                            <TableBody>
                                {keys.slice(middleIndex + 1).map((key) => (
                                    <TableRow key={key}>
                                        <TableCell>
                                            <strong>{key}:</strong>
                                        </TableCell>
                                        <TableCell>{data[key]}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <h3>Machine Details</h3>
                        <Table>
                            <TableBody>
                                {keys1.map((key) => (
                                    <TableRow key={key}>
                                        <TableCell>
                                            <strong>{key}:</strong>
                                        </TableCell>
                                        <TableCell>{machineDetails[key]}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default UserDetailsComponent;
