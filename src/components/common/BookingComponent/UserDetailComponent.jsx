// UserDetailsComponent

import React from 'react';
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';

const UserDetailsComponent = ({ data }) => {
    const keys = Object.keys(data);
    const middleIndex = Math.ceil(keys.length / 2);

    return (
        <Grid container spacing={2}>  
            <Grid item xs={12} md={6}>
                <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
                    <TableContainer style={{ overflowX: 'auto' }}>
                    <h3>Client Details</h3>
                        <Table>
                            <TableBody>
                                {keys.slice(0, middleIndex).map((key) => (
                                    <TableRow key={key}>
                                        <TableCell>
                                            <strong>{key}:</strong>
                                        </TableCell>
                                        <TableCell>{data[key]}</TableCell>
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
                                {keys.slice(middleIndex).map((key) => (
                                    <TableRow key={key}>
                                        <TableCell>
                                            <strong>{key}:</strong>
                                        </TableCell>
                                        <TableCell>{data[key]}</TableCell>
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
