import React, { useState } from 'react';
import {
  Grid,
  Paper,
  TextField,
  makeStyles,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@material-ui/core';

import { addCoupon } from '../../store/actions/couponsAction';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '70%',
      margin: theme.spacing(1),
    },
  },
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(5),
  },
}));

const AddCoupon = () => {
  const [values, setValues] = useState({
    code: '',
    description: '',
    type: 'SINGLE_USER',
    startDate: '',
    expiryDate: '',
    phone: '',
    maxCartDiscount: '',
    minCartDiscount: '',
    discountType: 'flat',
    discount: '',
    isPublic: true,
  });
  const classes = useStyles();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // validate all fields
    try {
      for (const key in values) {
        if (!['isPublic', 'discountType', 'type'].includes(key)) {
          if (values[key] === '') {
            alert('Please fill all the fields correctly.');
            return;
          }
        }
      }
      const response = await addCoupon(values);
      if (response?.status?.code === 201 || response?.status?.code === 200) {
        navigate('/coupons');
      } else {
        alert('Something went wrong');
      }
    } catch (err) {
      alert(err?.response?.data?.status?.message);
    }
  };

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Coupons</h1>
      <Paper className={classes.pageContent}>
        <form className={classes.root}>
          <Grid container>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                label="Coupon Code"
                name="code"
                value={values.code}
                onChange={handleInputChange}
                required
              />

              <TextField
                id="start-date"
                variant="outlined"
                label="Start Date"
                type="date"
                name="startDate"
                value={values.startDate}
                onChange={handleInputChange}
                labelWidth={100}
                InputLabelProps={{ shrink: true }}
                placeholder=""
              />

              <TextField
                variant="outlined"
                type="number"
                label="Min Cart Discount"
                name="minCartDiscount"
                value={values.minCartDiscount}
                onChange={handleInputChange}
                required
              />

              <TextField
                variant="outlined"
                type="number"
                label="Discount"
                name="discount"
                value={values.discount}
                onChange={handleInputChange}
                required
              />

              <FormControl variant="outlined">
                <InputLabel id="discount-type-label">Discount Type</InputLabel>
                <Select
                  variant="outlined"
                  labelId="discount-type-label"
                  label="Discount Type"
                  id="discount-type"
                  name="discountType"
                  value={values.discountType}
                  onChange={handleInputChange}
                  required
                >
                  <MenuItem value="flat">flat</MenuItem>
                  <MenuItem value="percentage">percentage</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant="outlined"
                type="tel"
                name="phone"
                label="Phone Number"
                value={values.phone}
                onChange={handleInputChange}
                placeholder="XXX-XXX-XXXX"
                required
              />
              <TextField
                id="expiry-date"
                variant="outlined"
                label="Expiry Date"
                type="date"
                name="expiryDate"
                value={values.expiryDate}
                onChange={handleInputChange}
                labelWidth={100}
                InputLabelProps={{ shrink: true }}
                placeholder=""
              />

              <TextField
                variant="outlined"
                type="number"
                label="Max Cart Discount"
                name="maxCartDiscount"
                value={values.maxCartDiscount}
                onChange={handleInputChange}
                required
              />
              
              
              <TextField
                variant="outlined"
                label="Description"
                name="description"
                value={values.description}
                onChange={handleInputChange}
                required
              />
            </Grid>
          </Grid>

          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              style={{width:'20%', marginTop:'30px'}}
            >
              Submit
            </Button>
          </Grid>
        </form>
      </Paper>
    </>
  );
};

export default AddCoupon;
