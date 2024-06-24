import React, { useEffect, useState } from 'react';
import {
  Grid,
  Paper,
  
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
import DropdownWithCheckBox from '../../components/common/DropdownWithCheckBox/DropdownWithCheckBox';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import PaymentOtpModal from './PaymentOtpModal';
import { Box, display, width } from '@mui/system';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Chip } from '@mui/material';
import ImageModal from './ImagesModal';

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

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


const AddAdvancePayments = () => {
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

  const [selectedProducts, setSelectedProducts] = useState([]);
  const classes = useStyles();
  const navigate = useNavigate();
  const [callersList, setCallersList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [selectedCaller, setSelectedCaller] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [openImageModal, setOpenImageModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const fetchCaller = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/admin/booking/caller-list`, {
        headers: {
          Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
          token: getToken(),
        },
      });
      const callersList = response.data?.callers || [];
      setCallersList(callersList);
    } catch (err) {
      console.log("ERR: callersList......", err);
    }
  };

  const fetchProdutsData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/admin/product/list`, {
        headers: {
          Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
          token: getToken(),
        },
      });
      const data = res.data.productList;
      setProductList(data);
      console.log(data);
    } catch (error) {
      console.log("ERR: productList......", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const dummyReqBody = {
        name: values.name,
        phone: values.phone,
        gender: values.gender,
        amountPaid: Number(values.amountPaid),
        date: moment(values.date).format("YYYY-MM-DD"),
        // productId: Number(selectedProducts.split(" - ")[0]),
        // productName: selectedProducts.split(" - ")[1],
        image: values.image,
        city: values.city,
        callerId: Number(selectedCaller.split(" - ")[0]),
        modeOfPayment: values.modeOfPayment,
        address: values.address,
      };

      const reqBodyData = () => {
        const data = {};
        for (const key in dummyReqBody) {
          const value = dummyReqBody[key];
          if (value !== "" && value !== 0 && value !== undefined) {
            data[key] = value;
          }
        }
        return data;
      };

      const reqBody = reqBodyData();

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/admin/advance-payment/add-payment`,
        reqBody,
        {
          headers: {
            Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
            token: getToken(),
          },
        });

      if (response?.status === 201 || response?.status === 200) {
        toast.success('Payment added successfully!');
        navigate("/advance-payments");
      }

    } catch (err) {
      toast.error(err?.response?.data?.status?.message || 'An error occurred while adding the payment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      const acceptedTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!acceptedTypes.includes(file.type)) {
        alert("Please select only image files (JPEG, JPG, PNG).");
        window.location.reload();
        return;
      }
      const reader = new FileReader();
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
      setValues({ ...values, [name]: value });
    }
  };

  const handleCallerChange = (event) => {
    setSelectedCaller(event.target.value);
  };


  const handleProductsChange = (event, value) => {
    console.log(value);
    setSelectedProducts(value);
  };



  useEffect(() => {
    const hasReloaded = localStorage.getItem('hasReloaded');
    if (!hasReloaded) {
      localStorage.setItem('hasReloaded', 'true');
      window.location.reload();
    }
  }, []);

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

              
                <FormControl>
                <Autocomplete
                  onChange={(event, value) => handleProductsChange(event, value)}
                  multiple
                  limitTags={2}
                  id="checkboxes-tags-demo"
                  options={productList}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.title?option.title:option.name}
                  value={selectedProducts}
                  renderOption={(props, option, { selected }) => (
                    <li {...props} key={option.id} >
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.title?option.title:option.name}
                    </li>
                  )}

                  renderTags={(selected, getTagProps) => 
                    selected.map((option, index) => (
                      <Chip
                        key={option.id}
                        label={option.title ? option.title : option.name}
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                  
                  renderInput={(params) => <TextField {...params} label={"Select Products"} style={{width: "100%", margin: 0}}/>}
                />
                <Button size='small' onClick={() => setOpenImageModal(true)}>Show image</Button>
                </FormControl>
                <ImageModal open={openImageModal} handleClose={() => setOpenImageModal(false)} products={selectedProducts}/>
                 
              
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
      <ToastContainer />
    </>
  );
};

export default AddAdvancePayments;
