import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCenter } from '../../store/actions/center.action';
import { fetchSlotData } from '../../store/actions/SchedulerAnalytics.action';
import moment from 'moment';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const SchedulerSlotData = () => {
  const dispatch = useDispatch();
  const [activeOption, setActiveOption] = useState(0);
  const [centerId, setCenterId] = useState(4);
  const [selectedDay, setSelectedDay] = useState(moment().format('YYYY-MM-DD'));
  const centerList = useSelector(state => state.center?.centerList?.centers || []);
  const slotData = useSelector(state => state.schedulerAnalytics?.schedulerSlotData);

  useEffect(() => {
    dispatch(fetchCenter());
  }, [dispatch]);

  useEffect(() => {
    if (centerId) {
      dispatch(fetchSlotData({centerId, selectedDay}));
    }
  }, [centerId, selectedDay, dispatch]);

  const handleChange = (event) => {
    const selectedCenterId = event.target.value;
    setCenterId(selectedCenterId);

  };

  const getNextSevenDays = (today) => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      const formattedDate = moment(nextDate).format('YYYY-MM-DD');
      dates.push({ id: i + 1, date: formattedDate });
    }
    return dates;
  };

  const handleActive = (index, item) => {
    setActiveOption(index);
    setSelectedDay(item);
  };
const allCenter={
  1:"Pune Center",
  2:"Gurgaon Center",
  3:"Mohali Center",
  4:"Kotla Center",
  5:"Bangalore Center",
  6:"Mumbai Center",
  7:"Noida Center",
  8:"Ludhiana Center",
  9:"Hyderabad Center"
}
  return (
    <div>
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

        <div style={{ textAlign: 'center', display: 'flex', marginTop: '20px' }}>
          <strong style={{ padding: '10px' }}>Choose Date:</strong>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {getNextSevenDays(new Date()).map((item, index) => (
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
                onClick={() => handleActive(index, moment(item.date).format('YYYY-MM-DD'))}
              >
                <span>
                  {moment(item.date).format('MMMM ddd DD')}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Box>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
      <Box 
        sx={{ 
          width: '50%', 
          padding: '20px', 
          border: '1px solid #ccc', 
          borderRadius: '10px', 
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#f9f9f9',
          fontSize: '18px' 
        }}
      >
        <h3 style={{ textAlign: 'center' }}>Slots of {allCenter[slotData?.centerId]}</h3>
        <div>
          <p style={{ textAlign: 'center' ,fontWeight:"bold"}}>Therapist Slot</p> 
          <p>Available Slot: <strong>{slotData?.therapistSlotCount.availableSlots}</strong></p>
          <p>Blocked Slot:<strong>{slotData?.therapistSlotCount.blockedSlots}</strong></p>
          <p style={{  textAlign: 'center',fontWeight: 'bold' }}>Machine Slot</p> 
          <p>Available Slot: <strong>{slotData?.machineSlotCount.availableSlots}</strong></p>
          <p>Blocked Slot: <strong>{slotData?.machineSlotCount?.blockedSlots}</strong></p>
          {/* <p style={{ textAlign: 'center',fontWeight: 'bold' }}>Overlapping Slots</p> */}
        </div>
      </Box>
    </div>
    </div>
  );
}

export default SchedulerSlotData;
