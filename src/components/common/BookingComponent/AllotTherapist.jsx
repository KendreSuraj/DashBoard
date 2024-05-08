import React, { useEffect, useState } from 'react';
import { Paper, TextField, Button, MenuItem, Grid } from '@mui/material';
import axios from 'axios';
import { getToken } from '../userLocalStorageUtils';
import { getHoursList } from '../../../utils';
import { getMinutesList } from '../../../utils';
import DeleteIcon from '@mui/icons-material/Delete';
import { manualTherapistAllocation, reAllocateTherapist } from '../../../store/actions/therapist.action';
import { useDispatch, useSelector } from 'react-redux';

const AllotTherapistBox = (props) => {
  const dispatch = useDispatch()
  const [partners, setPartners] = useState([]);
  const [selectedTherapist, setSelectedTherapist] = useState('');
  const [selectSecondTherapist, setSelectSecondTherapist] = useState('');
  const therapist1 = props.therapist
  const availableTherapist = useSelector(state => state?.therapist?.availableTherapist)


  const [startTime, setStartTime] = useState({
    hour: '',
    minute: '',
    ampm: '',
  });
  const reAllocateBody = props?.reAllocateBody
  // const [endTime, setEndTime] = useState({ hour: '', minute: '', ampm: '' });
  const { handleAllotTherapist } = props;
  const hours = getHoursList();
  const minutes = getMinutesList();

  useEffect(() => {
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
        if (reAllocateBody?.slotTime?.startTime) {
          let newAvailableTherapist = [...availableTherapist, therapist1?.['Therapist Id']]
          setPartners(partnerList?.filter(therapist => newAvailableTherapist.includes(therapist.partner_id)));
        }
      });
  }, [props.partnerNameStr, props.secondPartnerStr, availableTherapist]);

  const handleTherapistChange = (event) => {
    setSelectedTherapist(event.target.value);
  };

  const handleSecondTherapistChange = (event) => {
    setSelectSecondTherapist(event.target.value)
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const id = selectedTherapist.split('-')[0].trim();

  //   handleAllotTherapist({
  //     selectedTherapist: id,
  //     secondSelectedTherapist: selectSecondTherapist ? selectSecondTherapist.split("-")[0].trim() : null
  //   });
  // };
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const id = selectedTherapist.split('-')[0].trim();
      const reAllocateBodyWithId = {
        ...reAllocateBody,
        newTherapistId: id
      };
      const isConfirmed = window.confirm('Are you sure you want to submit?');
      if (isConfirmed) {
        const res = await manualTherapistAllocation(reAllocateBodyWithId);
        if (res?.status === 200) {
          if (selectSecondTherapist) {
            const secondId = selectSecondTherapist.split("-")[0].trim();
            handleAllotTherapist({
              selectedTherapist: id,
              secondSelectedTherapist: secondId
            });
          }
          alert(res.data?.status?.message);
          window.location.reload()
        }else{
          alert('An error occurred while submission')
        }
      }
    } catch (error) {
      console.error('An error occurred while handling the submission:', error);
    }
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

  const reAllocateAvailableTherapist = async () => {
    try {
      const isConfirmed = window.confirm('Are you sure you want to Reallocate Therapist?');
      if (isConfirmed) {
        const res = await reAllocateTherapist(reAllocateBody);
        if (res?.status === 200) {
          alert(res.data?.status?.message);
          window.location.reload();
        } else {
          alert('An error occurred while reallocating therapist. Please try again later.');
          return res;
        }
      }
    } catch (error) {
      alert('An error occurred while reallocating therapist. Please try again later.');
    }
  };


  return (
    <div>
      <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
        <h3>Allot Therapist</h3>
        <Button
          variant="contained"
          color="primary"
          disabled={props.isDisabled}
          style={{ float: 'right', textTransform: 'none' }}
          onClick={(() => reAllocateAvailableTherapist())}>
          Re Allocate Therapist
        </Button>
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
            {/* <Grid item xs={1}>
              <DeleteIcon onClick={deleteFisrtTherapist} />
            </Grid> */}

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
