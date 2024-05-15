import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import {
  TextField,
} from '@material-ui/core';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Chip from '@mui/material/Chip';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';


import { getToken } from '../../../components/common/userLocalStorageUtils';
import { Button } from '@mui/material';
import PackageItem from './PackageItem';

const PackageDetails = ({ setPackagesSubmitted }) => {
  const packageType = localStorage.getItem('packageDetail');
  const packageId = localStorage.getItem('packageEdit');
  const [checked, setChecked] = useState(false);
  const [customState, setCustomState] = useState("");

  const [values, setValues] = useState({
    packageName: "",
    description: "",
    productId: "",
    collectionName: "",
    noOfSession: "",
    packageProduct: ""
  });

  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const [personName, setPersonName] = useState([]);
  const [names, setNames] = useState([]);
  const [packageItems, setPackageItems] = useState([]);

  const addPackageItem = () => {
    setPackageItems([...packageItems, { productId: "", sessions: "" }]);
  };

  const handlePackageItemChange = (index, itemData) => {
    const updatedItems = [...packageItems];
    updatedItems[index] = itemData;
    setPackageItems(updatedItems);
  };

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
    setNames(product.map(obj => `${obj.id}. ${obj.name}`))
  }

  const fetchParticularData = async () => {
    const res = await axios.get(`${apiUrl}/api/v1/admin/package/detail/${packageId}`, {
      headers: {
        Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
        token: getToken(),
      },
    });

    setValues({
      packageName: res.data.data.packageName,
      description: res.data.data.packageDescription,
      products: res.data.data.products.map(obj => obj.productId),
    })
    setPersonName(
      res.data.data.products.map(obj => obj.productId)
    );
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
      const packageProduct = packageItems.map(item => ({
        productId: parseInt(item.productId.split(".")[0], 10),
        numberOfSessions: parseInt(item.sessions, 10)
      }));
      let body;
      
      if (customState === "") {
        body = {
          packageName: values.packageName,
          description: values.description,
          products: packageProduct,
          type: "fix"
        };
      } else {
      const formattedArray = values?.productId?.map(item => (parseInt(item.split(".")[0], 10)));

        body = {
          packageName: values.packageName,
          description: values.description,
          products: packageProduct,
          type: "custom",
          collection: {
            name: values.collectionName,
            numberOfSessions: parseInt(values.noOfSession,10),
            products: formattedArray,
          }
        };
      }

      const response = await axios.post(
        `${apiUrl}/api/v1/admin/package/create-package`, body, {
        headers: {
          token: getToken(),
        }
      }
      )
      console.log(response)

      if (response?.status === 201 || response?.status === 200) {
        setPackagesSubmitted(true)
        navigate('/packages');
      } else {
        alert('Something went wrong');
      }
    } catch (err) {
      alert(err);
    }
  };

  const handleEdit = async (event) => {
    event.preventDefault();
    try {
      for (const key in values) {
        if (values[key] === '') {
          alert(`Please fill ${key} correctly.`);
          return;
        }
      }
      console.log(values)
      const formattedArray = values.products.map(item => ({ productId: item }));

      const body = {
        packageName: values.packageName,
        description: values.description,
        products: formattedArray,
      };

      console.log(body)

      const response = await axios.patch(
        `${apiUrl}/api/v1/admin/package/${packageId}`, body, {
        headers: {
          token: getToken(),
        }
      }
      )

      if (response?.status === 201 || response?.status === 200) {
        setPackagesSubmitted(true)
        navigate('/packages');
      } else {
        alert('Something went wrong');
      }
    } catch (err) {
      alert(err?.response?.data?.status?.message);
    }
  };

  const handleCheckBoxChange = (event) => {
    setCustomState(event.target.checked ? "custom" : "")
    setChecked(event.target.checked);
  };

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (packageType === "edit") { fetchParticularData() }
  }, [packageType])

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
      <div>

        <FormControlLabel control={
          <Checkbox
            checked={checked}
            onChange={handleCheckBoxChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />} label="Custom" />
      </div>

      {packageItems.map((item, index) => (
        <PackageItem
          key={index}
          index={index}
          rule={item}
          names={names}
          onChange={handlePackageItemChange}
        />
      ))}

      <Button
        variant="contained"
        color="primary"
        onClick={addPackageItem}
        style={{ marginBottom: '20px', width: "25%" }}
      >
        Add Package Item
      </Button>

      {checked &&
        <>
          <div style={{ display: "flex", gap: "20px" }}>
            <TextField
              variant="outlined"
              label="Collection Name"
              name="collectionName"
              value={values.collectionName}
              onChange={handleInputChange}
              style={{ width: "700px" }}
            />

            <TextField
              variant="outlined"
              label="Number Of Sessions"
              name="noOfSession"
              type='number'
              value={values.noOfSession}
              onChange={handleInputChange}
            />
          </div>
          <FormControl sx={{ m: 1, width: "915px" }}>
            <InputLabel id="productID">ProductId*</InputLabel>
            <Select
              labelId="productID"
              multiple
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
        </>}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={packageType === "add" ? handleSubmit : handleEdit}
        style={{ width: '20%', marginTop: '30px' }}
      >
        Submit
      </Button>
    </>
  );
};

export default PackageDetails;
