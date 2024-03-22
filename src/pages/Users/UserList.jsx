import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../store/actions/users.action';
import TableComponent from '../../components/common/TableComponent/TableComponent';
import { Button } from '@mui/material';



function UserList() {
    const dispatch = useDispatch()
    const usersList = useSelector((state) => state.users.usersList);
    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);
    return (
        <div>
            <div>
                <h3>Users</h3>
                <>
                    <Button
                        concentrixUservariant="contained"
                        color="primary"
                        style={{
                            margin: '10px',
                            backgroundColor: '#384456',
                            color: 'white',
                            transition: 'transform 0.3s,background-color 0.3s',
                        }}
                        onMouseOver={(e) =>
                            (e.currentTarget.style.transform = 'scale(1.1)')
                        }
                        onMouseOut={(e) =>
                            (e.currentTarget.style.transform = 'scale(1)')
                        }
                    >
                        Add Users
                    </Button>

                    {usersList?.length > 0 ? (
                        <TableComponent
                            data={usersList}
                        />
                    ) : (
                        <p>No Users.</p>
                    )}
                </>
            </div>
        </div>
    )
}


export default UserList