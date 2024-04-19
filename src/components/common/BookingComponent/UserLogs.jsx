import { Paper } from '@mui/material'
import React from 'react'


function UserLogs(props) {
    return (
        <Paper elevation={3} style={{ padding: '20px' }}>
            <h3>Booking Status Logs</h3>
            <ul>
                {
                    props.userLogs.length > 0 ? props.userLogs.map(log => (

                        <li key={log.id}>{log.activity}</li>
                    )) : <p>No logs till now.</p>
                }
            </ul>
        </Paper>
    )
}

export default UserLogs