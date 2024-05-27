import React, { useEffect, useState } from 'react';
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
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../../components/common/userLocalStorageUtils';

import moment from 'moment';

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
    name: "",
    phone: "",
    amountPaid: 0,
    date: "",
    modeOfPayment: "",
    callerId: "",
    city: "",
    gender: "",
    image: "",
    address: ""
  });

  const [selectedProducts, setSelectedProducts] = useState("")
  const classes = useStyles();
  const navigate = useNavigate();
  const [callersList, setCallersList] = useState([])
  const [productList, setProductList] = useState([]);
  const [selectedCaller, setSelectedCaller] = useState("")

  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  // const replaceTimeInDate = (originalDateTime, newTime) => {
  //   const parsedOriginalDateTime = moment(originalDateTime);

  //   const datePart = parsedOriginalDateTime.format('YYYY-MM-DD');

  //   const newDateTime = moment(`${datePart} ${newTime}`, 'YYYY-MM-DD HH:mm:ss');

  //   return newDateTime.format();
  // };

  const fetchCaller = async () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/v1/admin/booking/caller-list`, {
        headers: {
          Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
          token: getToken(),
        },
      })
      .then(response => {
        const callersList =
          response.data && response.data.callers
            ? response.data.callers
            : [];


        setCallersList(callersList);
      })
      .then(err => {
        console.log("ERR: callersList......", err)
      })
  }

  const fetchProdutsData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/admin/product/list`, {
        headers: {
          Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
          token: getToken(),
        },
      });
      const data = await res.data.productList;
      setProductList(data);
      console.log(data);
    } catch (error) {
      console.log("ERR: productList......", error)
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const reqBody = {
        name: values.name,
        phone: values.phone,
        gender: values.gender,
        amountPaid: Number(values.amountPaid),
        date: moment(values.date).format("YYYY-MM-DD"),
        productId: Number(selectedProducts.split(" - ")[0]),
        productName: selectedProducts.split(" - ")[1],
        image: values.image,
        city: values.city,
        callerId: Number(selectedCaller.split(" - ")[0]),
        modeOfPayment: values.modeOfPayment,
        address: values.address,
      }
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/admin/advance-payment/add-payment`,
        reqBody,
        {
          headers: {
            Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
            token: getToken(),
          },
        })

      if (response?.status === 201 || response?.status === 200) {
        navigate("/advance-payments")
      }

    } catch (err) {
      alert(err?.response?.data?.status?.message);
    }
    finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      const acceptedTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!acceptedTypes.includes(file.type)) {
        alert("Please select only image files (JPEG, JPG, PNG).");
        window.location.reload()
        return;
      }
      const reader = new FileReader();
      // const file = files[0];
      console.log("see file type ", file.type)
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxDimension = 1024;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxDimension) {
              height *= maxDimension / width;
              width = maxDimension;
            }
          } else {
            if (height > maxDimension) {
              width *= maxDimension / height;
              height = maxDimension;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataURL = canvas.toDataURL(file.type);
          setValues({
            ...values,
            image: compressedDataURL,
          });
        };
      };
      reader.readAsDataURL(file);
    } else {
      // const parsedValue = name === 'paidAmount' ? +value : value;
      setValues({ ...values, [name]: value });
    }
  };

  const handleCallerChange = (event) => {
    setSelectedCaller(event.target.value);
  };

  const handleProductChange = (event) => {
    setSelectedProducts(event.target.value);
  }

  useEffect(() => {
    fetchCaller();
    fetchProdutsData();
  }, []);

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Add Advance Payment</h1>
      <Paper className={classes.pageContent}>
        <form className={classes.root}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                label="Name"
                name="name"
                value={values.name}
                onChange={handleInputChange}
                required
              />
              <FormControl variant="outlined">
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  variant="outlined"
                  labelId="gender-label"
                  label="Gender"
                  id="gender"
                  name="gender"
                  value={values.gender}
                  onChange={handleInputChange}
                  required
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="others">Others</MenuItem>
                </Select>
              </FormControl>



              <TextField
                variant="outlined"
                type="text"
                name="city"
                label="City"
                value={values.city}
                onChange={handleInputChange}
                placeholder=""
                required
              />
              <TextField
                variant="outlined"
                type="number"
                label="Amount Paid"
                name="amountPaid"
                value={values.amountPaid}
                onChange={handleInputChange}
                required
              />

              <FormControl variant="outlined">
                <InputLabel id="caller-label">Callers</InputLabel>
                <Select
                  variant="outlined"
                  labelId="caller-label"
                  label="Callers"
                  id="caller"
                  name="caller"
                  value={selectedCaller}
                  onChange={handleCallerChange}
                  required
                >
                  {callersList && callersList.length > 0 ? (
                    callersList.map((caller) => (
                      <MenuItem
                        value={`${caller.id} - ${caller.name}`}
                        key={caller.id}
                      >
                        {caller.id} - {caller.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="value">Enter</MenuItem>
                  )}
                </Select>
              </FormControl>

              <TextField
                variant="outlined"
                type="file"
                label="Image: "
                name="image"
                accept=".jpeg, .jpg, .png"

                onChange={handleImageChange}
                required
              />

            </Grid>

            <Grid item xs={6}>
              <TextField
                variant="outlined"
                type="text"
                label="phone"
                name="phone"
                value={values.phone}
                onChange={handleInputChange}
                required
              />
              <TextField
                id="start-date"
                variant="outlined"
                label="Date"
                type="date"
                name="date"
                value={values.date}
                onChange={handleInputChange}
                labelWidth={100}
                InputLabelProps={{ shrink: true }}
                placeholder=""
              />
              <TextField
                variant="outlined"
                type='text'
                label="Address"
                name="address"
                value={values.address}
                onChange={handleInputChange}
                required
              />
              <FormControl variant="outlined">
                <InputLabel id="modeOfPayment-label">Payment Mode: </InputLabel>
                <Select
                  variant="outlined"
                  labelId="paymentMode-label"
                  label="Mode of Payment"
                  id="modeOfPayment"
                  name="modeOfPayment"
                  value={values.modeOfPayment}
                  onChange={handleInputChange}
                  required
                >
                  <MenuItem value="Cash">Cash</MenuItem>
                  <MenuItem value="Razorpay credit card">Razorpay credit card</MenuItem>
                  <MenuItem value="Upi scanner">Upi scanner</MenuItem>
                  <MenuItem value="Razorpay link">Razorpay link</MenuItem>
                  <MenuItem value="Others">Others</MenuItem>
                </Select>
              </FormControl>



              <FormControl variant="outlined">
                <InputLabel id="discount-type-label">Products</InputLabel>
                <Select
                  variant="outlined"
                  labelId="product-label"
                  label="Products"
                  id="product"
                  name="product"
                  value={selectedProducts}
                  onChange={handleProductChange}
                  required
                >
                  {productList && productList.length > 0 ? (
                    productList.map((product) => (
                      <MenuItem
                        value={`${product.id} - ${product.name}`}
                        key={product.id}
                      >
                        {product.id} - {product.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="value">Enter</MenuItem>
                  )}
                </Select>
              </FormControl>



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
              disabled={isSubmitting}
              style={{
                width: '20%',
                marginTop: '30px',
                background: isSubmitting ? 'gray' : '#007BFF',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
              }}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </Grid>
        </form>
      </Paper>
    </>
  );
};

export default AddCoupon;
