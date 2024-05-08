import React, { useEffect, useState } from 'react';
import { Paper, Button, FormControl, TextareaAutosize, TextField, MenuItem, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAvailableMachine, fetchMachine, manualAllocateMachine, reAllocateMachine } from '../../../store/actions/machine.action';

const AllotMachine = ({ body,isDisabled }) => {
    const dispatch = useDispatch()
    const availableMachines = useSelector(state => state.machine?.availableMachine)
    const availableMachine = [...availableMachines, body?.previousMachineId]
    const allMachine = useSelector(state => state.machine?.machineList?.machines)
    const [selectedMachine, setSelectedMachine] = useState('')
    useEffect(() => {
        dispatch(fetchMachine())
        setSelectedMachine(body?.previousMachineId || '')
        if (body?.slotTime?.startTime) {
            dispatch(fetchAvailableMachine(body))
        }
    }, [dispatch, body])
    const handleMachineChange = (event) => {
        setSelectedMachine(event.target.value);
    }
  
    const handleSubmit = async (e) => {
        try {
          e.preventDefault();
          const isConfirmed = window.confirm('Are you sure you want to submit?');
          if (isConfirmed) {
            const newBody = {
              ...body,
              newMachineId: selectedMachine
            };
            const res = await manualAllocateMachine(newBody);
            if (res?.status === 200) {
              alert(res.data?.status?.message);
              window.location.reload();
            }else{
                alert("An error occurred while Allocating Machine.")
            }
          }
        } catch (error) {
          console.error('An error occurred while handling the submission:', error);
        }
      };
      

    const reAllocateMachineManual = async () => {
        try {
          const isConfirmed = window.confirm('Are you sure you want to Reallocate Machine?');
          if (isConfirmed) {
            const res = await reAllocateMachine(body);
            if (res?.status === 200) {
              alert(res.data?.status?.message);
              window.location.reload();
            } else {
              alert("An error occurred while Reallocating the machine.");
            }
          }
        } catch (error) {
          console.error('An error occurred while reallocating the machine:', error);
          alert('An error occurred while reallocating the machine. Please try again later.');
        }
      };
      

    return (
        <>
            <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
                <h3>Allot  Machine</h3>
                <Button 
                  variant="contained"
                  color="primary"
                  disabled={isDisabled}
                 style={{ float: 'right', textTransform: 'none' }} onClick={() => reAllocateMachineManual()}>
                    Re Allocate Machine
                </Button>
                <form>
                    <Grid container spacing={2} alignItems="center">
                        <TextField
                            select
                            label="Machines"
                            fullWidth
                            margin="normal"
                            value={selectedMachine}
                            onChange={handleMachineChange}
                            disabled={isDisabled}
                            required
                        >
                            {availableMachine && availableMachine.length > 0 ? (
                                allMachine?.filter(machine => availableMachine.includes(machine.id)).map((machine) => (
                                    <MenuItem
                                        // value={`${machine.id} - ${machine.name}`}
                                        value={machine.id}
                                        key={machine.id}
                                    >
                                        {machine.id} - {machine.name}
                                    </MenuItem>
                                ))
                            ) : (
                                <MenuItem value="value">Enter</MenuItem>
                            )}
                        </TextField>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                onClick={handleSubmit}
                                disabled={isDisabled}
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </>
    )
}

export default AllotMachine;