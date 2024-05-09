import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Chip from '@mui/material/Chip';

import { getToken } from '../../../components/common/userLocalStorageUtils';
import { Button } from '@mui/material';

const RulesStep = ({ setPackagesSubmitted }) => {
  const [values, setValues] = useState({
    packageName: "",
    productId: "",
  });

  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

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
        products: formattedArray,
      };

      const response = await axios.post(
        `${apiUrl}/api/v1/admin/package/update-package`, body, {
        headers: {
          token: getToken(),
        }
      }
      )
      console.log(response)

      if (response?.status === 201 || response?.status === 200) {
        setPackagesSubmitted(true)
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
      <h3 style={{ textAlign: 'center' }}>Rules Details</h3>
     <div style={{display:"flex", gap:"20px"}}>
     <FormControl style={{width:"200px"}}>
        <InputLabel id="demo-simple-select-label">ProductId*</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={values.packageName}
          label="Age"
          onChange={handleChange}
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
      <FormControl style={{width:"900px"}}>
        <InputLabel id="productID">Not Included*</InputLabel>
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
        style={{ width: '10%' }}
      >
        Add
      </Button>
     </div>

      
    </>
  );
};

export default RulesStep;
