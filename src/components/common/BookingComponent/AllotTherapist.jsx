import React, { useEffect, useState } from 'react';
import { Paper, TextField, Button, MenuItem, Grid, Box } from '@mui/material';
import axios from 'axios';
import { getToken } from '../userLocalStorageUtils';
import { getHoursList } from '../../../utils';
import { getMinutesList } from '../../../utils';
import DeleteIcon from '@mui/icons-material/Delete';
import { deAllocateTherapist, fetchAvailableTherapist, manualTherapistAllocation, reAllocateTherapist } from '../../../store/actions/therapist.action';
import { useDispatch, useSelector } from 'react-redux';
import { hasAdminAndSuperAdminAccess } from '../UserRolesConfig';
import CircularProgress from '@mui/material/CircularProgress';
import { fetchCenter } from '../../../store/actions/center.action';

const AllotTherapistBox = (props) => {
  const role = JSON.parse(localStorage.getItem('userData'))?.user?.role;
  const body = props?.reAllocateBody
  const dispatch = useDispatch()
  const [partners, setPartners] = useState([]);
  const [selectedTherapist, setSelectedTherapist] = useState('');
  const [selectedCenter, setSelectedCenter] = useState(body?.therapistCenterId)
  const [selectSecondTherapist, setSelectSecondTherapist] = useState('');
  const therapist1 = props.therapist
  const availableTherapist = useSelector(state => state?.therapist?.availableTherapist)
  let centerList = useSelector(state => state.center?.centerList?.centers)

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

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
    dispatch(fetchCenter())
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
  const handleCenterChange = (event) => {
    setSelectedCenter(event.target.value)
  }

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
        setIsButtonDisabled(true);
        const res = await manualTherapistAllocation({ ...reAllocateBodyWithId, centerId: selectedCenter });
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
        } else {
          setIsButtonDisabled(false);
          alert('An error occurred while submission')
        }
      }
    } catch (error) {
      setIsButtonDisabled(false);
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

  const changeGenderOfBooking = async () => {
    try {
      try {
        const reqBody = {
          sessionScheduleId: reAllocateBody?.sessionScheduleId,
          date: reAllocateBody?.slotDate,
          therapistId: reAllocateBody?.therapistId
        }
        const res = await deAllocateTherapist(reqBody);
        console.log("seeee", res)
        if (res?.status === 200) {
          alert(res.data?.status?.message);
          window.location.reload();
        } else {
          setIsButtonDisabled(false);
          alert(res?.response?.data?.status?.message);
        }
      } catch (err) {
        console.log(err)
      }

      const isConfirmed = window.confirm('Are you sure you want to change Gender?');
      if (isConfirmed) {
        setIsButtonDisabled(true);
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/admin/booking/change-gender`, { sessionScheduleId: reAllocateBody?.sessionScheduleId }, {
          headers: {
            Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
            token: getToken(),
          },
        });
        if (res?.status === 200) {
          alert(res.data?.status?.message);
          window.location.reload();
        } else {
          setIsButtonDisabled(false);
          console.log("Alert jo hai wo error wala hai", res)
          alert(res?.response?.data?.status?.message);
          return res;
        }
      }
    } catch (error) {
      setIsButtonDisabled(false);
      alert(error?.response?.data?.status?.message);
    }
  }

  const reAllocateAvailableTherapist = async () => {
    try {
      const isConfirmed = window.confirm('Are you sure you want to Reallocate Therapist?');
      if (isConfirmed) {
        setIsButtonDisabled(true);
        const res = await reAllocateTherapist({ ...reAllocateBody, centerId: selectedCenter });
        if (res?.status === 200) {
          alert(res.data?.status?.message);
          window.location.reload();
        } else {
          setIsButtonDisabled(false);
          alert(res?.response?.data?.status?.message);
          return res;
        }
      }
    } catch (error) {
      setIsButtonDisabled(false);
      alert('An error occurred while reallocating therapist. Please try again later.');
    }
  };

  const deAllocateTherapistForBooking = async () => {
    try {
      const isConfirmed = window.confirm('Are you sure you want to Deallocate Therapist?');
      if (isConfirmed) {
        setIsButtonDisabled(true);
        const reqBody = {
          sessionScheduleId: reAllocateBody?.sessionScheduleId,
          date: reAllocateBody?.slotDate,
          therapistId: reAllocateBody?.therapistId
        }
        const res = await deAllocateTherapist(reqBody);
        console.log("seeee", res)
        if (res?.status === 200) {
          alert(res.data?.status?.message);
          window.location.reload();
        } else {
          setIsButtonDisabled(false);
          alert(res?.response?.data?.status?.message);
          return res;
        }
      }
    } catch (error) {
      console.log("-=-==-=--=", error)
      setIsButtonDisabled(false);
      alert('An error occurred while Deallocating therapist. Please try again later.');
    }
  };

  useEffect(() => {
    if (body?.slotTime?.startTime) {
      let newBody = {
        ...body,
        centerId: selectedCenter
      }
      dispatch(fetchAvailableTherapist(newBody));
    }
  }, [dispatch, selectedCenter]);

  return (
    <div>
      <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
        <h3>Allot Therapist</h3>
        <Box display="flex" alignItems="center" gap={10}>
          {hasAdminAndSuperAdminAccess(role) && <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={props.isDisabled || isButtonDisabled}
            style={{ float: 'right', textTransform: 'none' }}
            onClick={changeGenderOfBooking}>
            {isButtonDisabled ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Change gender'
            )}
          </Button>}
        </Box>
        <Box display="flex" alignItems="center" gap={10}>
          <TextField
            select
            label="Choose Center"
            fullWidth
            margin="normal"
            value={selectedCenter}
            onChange={handleCenterChange}
            disabled={props.isDisabled}
            required
            sx={{
              '.MuiInputBase-root': {
                height: 41,
              },
              '.MuiInputLabel-root': {
                fontSize: 12,
              },
              '.MuiMenuItem-root': {
                fontSize: 12,
              },
            }}
          >
            {centerList && centerList.length > 0 ? (
              centerList.map((center) => (
                <MenuItem value={center.id} key={center.id}>
                  {center.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="value">Enter</MenuItem>
            )}
          </TextField>
          {hasAdminAndSuperAdminAccess(role) && <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={props.isDisabled || isButtonDisabled}
            style={{ float: 'right', textTransform: 'none' }}
            onClick={(() => reAllocateAvailableTherapist())}>
            {isButtonDisabled ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Re Allocate Therapist'
            )}
          </Button>}
        </Box>
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
              {reAllocateBody?.therapistId && <DeleteIcon onClick={() => deAllocateTherapistForBooking()} />}
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
              {hasAdminAndSuperAdminAccess(role) && <DeleteIcon onClick={deleteSecondTherapist} />}
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              {hasAdminAndSuperAdminAccess(role) && <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={handleSubmit}
                disabled={props.isDisabled || isButtonDisabled}
              >
                {isButtonDisabled ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Submit'
                )}
              </Button>}
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
};

export default AllotTherapistBox;
