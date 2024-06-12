import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCenter } from '../../store/actions/center.action';
import { fetchMachineAvailability } from '../../store/actions/SchedulerAnalytics.action';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { Button } from 'react-bootstrap';
import { Box, FormControl, InputLabel, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { markMachineFree } from '../../store/actions/machine.action';

const MachineAnalytics = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeOption, setActiveOption] = useState(0);
  const [centerId, setCenterId] = useState(4);
  const [selectedDay, setSelectedDay] = useState(new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase());
  const centerList = useSelector(state => state.center?.centerList?.centers || []);
  const machines = useSelector(state => state.schedulerAnalytics?.machineAnalytics?.machines || []);
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [selectedDate,setSelectedDate]=useState(new Date().toISOString().slice(0, 10))
  useEffect(() => {
    dispatch(fetchCenter());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchMachineAvailability(centerId));
  }, [centerId, dispatch]);

  const handleChange = (event) => {
    const selectedCenterId = event.target.value;
    setCenterId(selectedCenterId);
    dispatch(fetchMachineAvailability(selectedCenterId));
  };

  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
  };

  function getNextSevenDays(today) {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      const year = nextDate.getFullYear();
      const month = String(nextDate.getMonth() + 1).padStart(2, '0');
      const day = String(nextDate.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      dates.push({ id: i + 1, date: formattedDate });
    }
    return dates;
  }
  const handleActive = (index, item,date) => {
    setActiveOption(index);
    setSelectedDay(item);
    setSelectedDate(date)
  }

  const timeSlots = [
    '07:00-07:30','07:30-08:00',
    '08:00-08:30', '08:30-09:00','09:00-09:30','09:30-10:00','10:00-10:30', '10:30-11:00',
    '11:00-11:30', '11:30-12:00', '12:00-12:30', '12:30-13:00',
    '13:00-13:30', '13:30-14:00', '14:00-14:30', '14:30-15:00',
    '15:00-15:30', '15:30-16:00', '16:00-16:30', '16:30-17:00',
    '17:00-17:30', '17:30-18:00', '18:00-18:30', '18:30-19:00',
    '19:00-19:30', '19:30-20:00', '20:00-20:30', '20:30-21:00',
    '21:00-21:30','21:30-22:00'
  ];

  const renderSlots = (availability) => {
    const slotMap = {};

    availability.forEach(slot => {
      const startTime = moment(slot.startTime, 'HH:mm');
      const endTime = moment(slot.endTime, 'HH:mm');
      const duration = moment.duration(endTime.diff(startTime));
      const slotCount = duration.asMinutes() / 30;

      for (let i = 0; i < slotCount; i++) {
        const startTimeFormatted = startTime.clone().add(i * 30, 'minutes').format('HH:mm');
        const endTimeFormatted = startTime.clone().add((i + 1) * 30, 'minutes').format('HH:mm');
        const timeRange = `${startTimeFormatted}-${endTimeFormatted}`;

        if (slot.status === "LEAVE") {
          slotMap[timeRange] = <span style={{ backgroundColor: 'gray', color: 'black', padding: '8px', padding: '8px', borderRadius: '10px' }}>Leave</span>;
        } else if (slot.status === "AVAILABLE") {
          slotMap[timeRange] = <span style={{ backgroundColor: '#01FF00', color: 'black', padding: '8px', whiteSpace: 'nowrap', borderRadius: '10px',cursor:'pointer' }}>Available</span>;
        } else if (slot.status === "UNAVAILABLE") {
          slotMap[timeRange] = <span style={{ backgroundColor: 'gray', color: 'black', padding: '8px', whiteSpace: 'nowrap', borderRadius: '10px',cursor:'pointer' }}>Unavailable</span>;
        } else if (slot.status === "SESSION_BLOCKED") {
          slotMap[timeRange] = <span style={{ backgroundColor: 'red', color: 'black', padding: '8px', whiteSpace: 'nowrap', borderRadius: '10px',cursor:'pointer' }} onClick={() =>window.open(`/booking-details/${slot?.serviceId}`, '_blank')}>Service ID:{slot.serviceId}</span>;
        } else if (slot.status === "BUFFER_START") {
          slotMap[timeRange] = <span style={{ backgroundColor: 'red', color: 'black', padding: '8px', whiteSpace: 'nowrap', borderRadius: '10px',cursor:'pointer' }} onClick={() =>window.open(`/booking-details/${slot?.serviceId}`, '_blank')}>Service ID:{slot.serviceId}</span>;
        } else if (slot.status === "BUFFER_END") {
          slotMap[timeRange] = <span style={{ backgroundColor: 'red', color: 'black', padding: '8px', whiteSpace: 'nowrap', borderRadius: '10px',cursor:'pointer' }} onClick={() =>window.open(`/booking-details/${slot?.serviceId}`, '_blank')}>Service ID:{slot.serviceId}</span>;
        }
        else {
          slotMap[timeRange] = 'Repair';
        }
      }
    });

    return timeSlots.map(time => (
      <TableCell key={time} align="center" sx={{ borderRight: 1, borderColor: 'divider' }}>
        {slotMap[time] || (Object.keys(slotMap).length !== 0 ? <span style={{ color: 'black', padding: '8px', backgroundColor: 'gray', borderRadius: '10px' }}>Off&nbsp;hours</span> : <span style={{ backgroundColor: 'gray', color: 'black', padding: '8px', borderRadius: '10px' }}>Week&nbsp;Off</span>)}
      </TableCell>
    ));
  }
  const handlemarkFreeMachine=async(id)=>{
    try {
      const isConfirmed = window.confirm('Are you sure you want to mark free?');
      if (isConfirmed) {
        setIsButtonDisabled(true);
        const body = {
          date: selectedDate,
          machineId:id
        };
        const res = await markMachineFree(body);
        if (res?.status === 200) {
          alert(res.data?.status?.message);
          window.location.reload();
        }else{
            alert("An error occurred while mark free.")
            setIsButtonDisabled(false);
        }
      }
    } catch (error) {
      setIsButtonDisabled(false);
      console.error('An error occurred', error);
    }
  }
  return (
    <Box sx={{ width: '100%', padding: '20px' }}>
      <FormControl fullWidth required>
        <InputLabel id="center-label">Centers</InputLabel>
        <Select
          labelId="center-label"
          id="centerId"
          name="centerId"
          value={centerId}
          onChange={handleChange}
          label="Center"
        >
          <MenuItem value="">
            <em>Select Center</em>
          </MenuItem>
          {centerList.map(center => (
            <MenuItem key={center.id} value={center.id}>
              {center.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div style={{ textAlign: 'center', display: 'flex', marginTop: '20px', marginBottom: "20px" }}>
        <strong style={{ padding: '10px' }}>Choose Date:</strong>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {getNextSevenDays(new Date())?.map((item, index) => (
            <li
              key={index}
              style={{
                display: 'inline-block',
                margin: '5px',
                cursor: 'pointer',
                background: activeOption === index ? '#ccc' : 'transparent',
                padding: '5px 10px',
                borderRadius: '5px',
                fontWeight: 'bold',
                border: '1px solid #ccc'
              }}
              onClick={() => handleActive(index, moment(item.date, "YYYY-MM-DDT.SSS[Z]").format('dddd'),item.date)}
            >
              <span>
                {/* {moment(item.date, "YYYY-MM-DDT.SSS[Z]").format(`ddd DD`)} */}
                {moment(item.date).format('MMMM ddd DD')}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <TableContainer component={Paper} sx={{ maxHeight: '550px', overflow: 'auto' }}>
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="therapist availability table">
          <TableHead>
            <TableRow >
              <TableCell align="center"  sx={{ borderRight: 1, borderColor: 'divider', fontWeight: 'bold', position: 'sticky', left: 0, zIndex: 2 }}>Therapist&nbsp;Name</TableCell>
              {timeSlots.map((slot, index) => (
                <TableCell key={index} align="center" s sx={{ borderRight: 1, borderColor: 'divider', fontWeight: 'bold', whiteSpace: "nowrap", top: 0, position: 'sticky', backgroundColor: 'white', zIndex: 1 }}>{slot}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {machines.map((therapist, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row" align="center"  sx={{ borderRight: 1, borderColor: 'divider', position: 'sticky', left: 0, backgroundColor: 'white', zIndex: 1 }}>
                  {therapist.name}<br/>
                  {therapist?.[`${selectedDay.toLowerCase()}Availability`].some(slot => slot.status === "REPAIR" || slot.status === "UNAVAILABLE") && 
                  <Button
                   style={{
                    fontWeight: 'bold',
                    marginTop: '5px',
                    backgroundColor: 'pink',
                    borderRadius: "10px",
                    cursor:'pointer',
                    padding:'5px',
                  }}
                    disabled={isButtonDisabled}
                    onClick={()=>handlemarkFreeMachine(therapist.id)}
                  >
                   Mark Free
                  </Button>}
                </TableCell>
                {renderSlots(therapist?.[`${selectedDay.toLowerCase()}Availability`] || [])}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MachineAnalytics;