import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
} from '@material-ui/core';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Chip from '@mui/material/Chip';

import { useNavigate } from 'react-router-dom';
import { getToken } from '../../../components/common/userLocalStorageUtils';
import axios from 'axios';

const PackageDetails = ({setPackagesSubmitted}) => {
  const [values, setValues] = useState({
    packageName: "",
    description: "",
    productId: "",
  });
  const apiUrl = process.env.REACT_APP_API_URL;

  const [personName, setPersonName] = useState([]);
  const [names, setNames] = useState([]);

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 280,
        width: 250,
      },
    },
  };

  const fetchData = async () => {
    const res = await axios.get(`${apiUrl}/api/v1/admin/product/list`, {
      headers: {
        Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
        token: getToken(),
      },
    });
    const product = await res.data.productList;
    setNames(product.map(obj => obj.id))
  }

  const navigate = useNavigate();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value === 'string' ? value.split(',') : value,
    );
    setValues({
      ...values,
      "productId": typeof value === 'string' ? value.split(',') : value,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      for (const key in values) {
        if (values[key] === '') {
          alert(`Please fill ${key} correctly.`);
          return;
        }
      }
      const formattedArray = values.productId.map(item => ({ productId: item }));

      const body = {
        packageName: values.packageName,
        description: values.description,
        products: formattedArray,
      };
      const response = await axios.post(
        `${apiUrl}/api/v1/admin/packages/create-package`,
        body,
      )
      if (response?.status?.code === 201 || response?.status?.code === 200) {
        setPackagesSubmitted(true)
        navigate('/packages');
      } else {
        alert('Something went wrong');
      }
    } catch (err) {
      alert(err?.response?.data?.status?.message);
    }
  };

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <h3 style={{ textAlign: 'center' }}>Package Details</h3>
      <TextField
        variant="outlined"
        label="Package Name"
        name="packageName"
        value={values.packageName}
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
      <FormControl sx={{ m: 1 }}>
        <InputLabel id="productID">ProductId*</InputLabel>
        <Select
          labelId="productID"
          multiple
          required
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {names?.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: "12px" }}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        style={{ width: '20%', marginTop: '30px' }}
      >
        Submit
      </Button>
    </>
  );
};

export default PackageDetails;
