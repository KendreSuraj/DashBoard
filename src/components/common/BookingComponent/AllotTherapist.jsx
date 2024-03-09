import React, { useEffect, useState } from 'react';
import { Paper, TextField, Button, MenuItem, Grid } from '@mui/material';
import axios from 'axios';
import { getToken } from '../userLocalStorageUtils';
import { getHoursList } from '../../../utils';
import { getMinutesList } from '../../../utils';
import DeleteIcon from '@mui/icons-material/Delete';

const AllotTherapistBox = (props) => {
  const [partners, setPartners] = useState([]);
  const [selectedTherapist, setSelectedTherapist] = useState('');
  const [selectSecondTherapist, setSelectSecondTherapist] = useState('');
  const [selectedDate, setSelectedDate] = useState(props.startDate);
  const [startTime, setStartTime] = useState({
    hour: '',
    minute: '',
    ampm: '',
  });
  const [endTime, setEndTime] = useState({ hour: '', minute: '', ampm: '' });
  const { handleAllotTherapist } = props;
  const hours = getHoursList();
  const minutes = getMinutesList();

  useEffect(() => {
    setSelectedDate(props.startDate);
    setStartTime(props.startTime);
    setEndTime(props.endTime);
    setSelectedTherapist(props.partnerNameStr);
    setSelectSecondTherapist(props.secondPartnerStr);
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/v1/admin/partner/list`, {
        headers: {
          Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
          token: getToken(),
        },
      })
      .then((response) => {
        const partnerList =
          response.data && response.data.partnerList
            ? response.data.partnerList
            : [];
        setPartners(partnerList);
      });
  }, [props.startDate, props.endTime, props.startTime, props.partnerNameStr, props.secondPartnerStr]);

  const handleTherapistChange = (event) => {
    setSelectedTherapist(event.target.value);
  };

  const handleSecondTherapistChange = (event) => {
    setSelectSecondTherapist(event.target.value)
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleStartTimeChange = (field, value) => {
    setStartTime((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleEndTimeChange = (field, value) => {
    setEndTime((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Form validation
    // if (
    //   !selectedTherapist ||
    //   !selectedDate ||
    //   !startTime.hour ||
    //   !startTime.minute ||
    //   !startTime.ampm ||
    //   !endTime.hour ||
    //   !endTime.minute ||
    //   !endTime.ampm
    // ) {
    // Handle validation error (e.g., show an error message)
    //   alert('please fill all the fields.');
    //   return;
    // }
    const id = selectedTherapist.split('-')[0].trim();

    handleAllotTherapist({
      selectedTherapist: id,
      secondSelectedTherapist: selectSecondTherapist ? selectSecondTherapist.split("-")[0].trim() : null
    });
  };

  const deleteFisrtTherapist = () => {
    const id = selectedTherapist ? selectedTherapist.split('-')[0].trim() : null
    if (!id) {
      alert("No therapist to delete")
      return;
    }

    props.deleteFirstTherapistHandler(id)
  }
  const deleteSecondTherapist = () => {
    const id = selectSecondTherapist ? selectSecondTherapist.split('-')[0].trim() : null
    if (!id) {
      alert("No therapist to delete")
      return;
    }

    props.deleteSecondTherapistHandler(id)
  }

  return (
    <div>
      <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
        <h3>Allot Therapist</h3>
        <form>
          <Grid container spacing={2} alignItems="center">
            {/* First Therapist */}
            <Grid item xs={11}>
              <TextField
                select
                label="Therapist 1"
                fullWidth
                margin="normal"
                value={selectedTherapist}
                onChange={handleTherapistChange}
                disabled={props.isDisabled}
                required
              >
                {partners && partners.length > 0 ? (
                  partners.map((partner) => (
                    <MenuItem
                      value={`${partner.partner_id} - ${partner.name}`}
                      key={partner.partner_id}
                    >
                      {partner.partner_id} - {partner.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="value">Enter</MenuItem>
                )}
              </TextField>
            </Grid>
            <Grid item xs={1}>
              <DeleteIcon onClick={deleteFisrtTherapist} />
            </Grid>

            {/* Second Therapist */}
            <Grid item xs={11}>
              <TextField
                select
                label="Therapist 2"
                fullWidth
                margin="normal"
                value={selectSecondTherapist}
                onChange={handleSecondTherapistChange}
                disabled={props.isDisabled}
              >
                {partners && partners.length > 0 ? (
                  partners.map((partner) => (
                    <MenuItem
                      value={`${partner.partner_id} - ${partner.name}`}
                      key={partner.partner_id}
                    >
                      {partner.partner_id} - {partner.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="value">Enter</MenuItem>
                )}
              </TextField>
            </Grid>
            <Grid item xs={1}>
              <DeleteIcon onClick={deleteSecondTherapist} />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={handleSubmit}
                disabled={props.isDisabled}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
};

export default AllotTherapistBox;
