import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Select, MenuItem } from '@mui/material';
import { changeVirtualConsultationsStatus } from '../../store/actions/Virtualconsultations.action';
import { useDispatch } from 'react-redux';
import { hasAdminAndSuperAdminAccess } from '../../components/common/UserRolesConfig';

const VirtualConsultationTable = ({ data }) => {
    const role = JSON.parse(localStorage.getItem('userData'))?.user?.role;
    const dispatch = useDispatch();
    const changeConsultationsStatus = async (id, newStatus) => {
        try {
            const res = await dispatch(changeVirtualConsultationsStatus({ id, newStatus }));
            if (res?.payload.status === 200) {
                window.location.reload();
            } else {
                console.error("Failed to change consultation status:", res);
            }
        } catch (err) {
            console.error("An error occurred while changing consultation status:", err);
        }
    };
    return (
        <div className="table-responsive">
            <Table>
                <TableHead>
                    <TableCell><strong>ID</strong></TableCell>
                    <TableCell><strong>Name</strong></TableCell>
                    <TableCell><strong>Phone</strong></TableCell>
                    <TableCell><strong>Time</strong></TableCell>
                    <TableCell><strong>Date</strong></TableCell>
                    <TableCell><strong>Status</strong></TableCell>
                </TableHead>
                <TableBody>
                    {data.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.phone}</TableCell>
                            <TableCell>{item.time}</TableCell>
                            <TableCell>{item.date}</TableCell>
                          <TableCell>
                                <Select
                                    value={item.status}
                                    onChange={(e) => changeConsultationsStatus(item.id, e.target.value)}
                                    disabled={!hasAdminAndSuperAdminAccess(role)}
                                >
                                    <MenuItem value="PENDING">PENDING</MenuItem>
                                    <MenuItem value="RESOLVED">RESOLVED</MenuItem>
                                    <MenuItem value="UNREACHEABLE">UNREACHEABLE</MenuItem>
                                    <MenuItem value="CANCELLED">CANCELLED</MenuItem>
                                </Select>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default VirtualConsultationTable;

