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
import { Button } from '@mui/material';

import { getToken } from '../../../components/common/userLocalStorageUtils';
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
    noOfSession: "",
    packageProduct: ""
  });
  const [personName, setPersonName] = useState([]);
  const [names, setNames] = useState([]);
  const [packageItems, setPackageItems] = useState([]);
  const [collectionID, setCollectionID] = useState();

  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 280,
        width: 250,
      },
    },
  };

  const addPackageItem = () => {
    setPackageItems([...packageItems, { productId: "", sessions: "" }]);
  };

  const handlePackageItemChange = (index, itemData) => {
    const updatedItems = [...packageItems];
    updatedItems[index] = itemData;
    setPackageItems(updatedItems);
  };

  const fetchData = async () => {
    const res = await axios.get(`${apiUrl}/api/v1/admin/product/list`, {
      headers: {
        Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
        token: getToken(),
      },
    });
    const product = await res.data.productList;
    setNames(product.map(obj => `${obj.id}. ${obj.name}`));
  };

  const fetchParticularData = async () => {
    const res = await axios.get(`${apiUrl}/api/v1/admin/package/detail/${packageId}`, {
      headers: {
        Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
        token: getToken(),
      },
    });
    // if (type === "fix") {
      const items = res.data.data.products.map(obj => ({
        productId: obj.productId,
        sessions: obj.numberOfSessions
      }));
      setPackageItems(items);
      setValues({
        packageName: res.data.data.packageName,
        description: res.data.data.packageDescription,
      });
      setChecked(false);
    // } 
    // else {
    //   setChecked(true);
    //   const collectionId = res.data.data.collection.id;
    //   setCollectionID(parseInt(collectionId, 10));
    //   setValues({
    //     packageName: res.data.data.packageName,
    //     description: res.data.data.packageDescription,
    //     noOfSession: res.data.data.collection?.numberOfSessions,
    //     productId: res.data.data.collection?.products.map(obj => obj),
    //   });
    //   setPersonName(res.data.data.collection?.products.map(obj => obj));
    // }
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === 'string' ? value.split(',') : value);
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

  const handleCheckBoxChange = (event) => {
    setCustomState(event.target.checked ? "custom" : "");
    setChecked(event.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const packageProduct = packageItems.map(item => ({
        productId: parseInt(item.productId.split(".")[0], 10),
        numberOfSessions: parseInt(item.sessions, 10)
      }));
      let body;
      let response;

      if (customState === "") {
        body = {
          packageName: values.packageName,
          description: values.description,
          products: packageProduct,
        };
        response = await axios.post(
          `${apiUrl}/api/v1/admin/package/create-fix-package`, body, {
          headers: {
            token: getToken(),
          }
        });
      } else {
        const formattedArray = values?.productId?.map(item => (parseInt(item.split(".")[0], 10)));
        body = {
          packageName: values.packageName,
          description: values.description,
          products: packageProduct,
          type: "custom",
          collection: {
            id: collectionID,
            numberOfSessions: parseInt(values.noOfSession, 10),
            products: formattedArray,
          }
        };
      }


      const id = response.data.data.id;
      localStorage.setItem('packageId', id);

      if (response?.status === 201 || response?.status === 200) {
        setPackagesSubmitted(true);
      } else {
        alert('Something went wrong');
      }
    } catch (err) {
      alert(err);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const packageProduct = packageItems.map(item => ({
        productId: typeof item.productId==="number"?item.productId:parseInt(item.productId.split(".")[0], 10),
        numberOfSessions: parseInt(item.sessions, 10)
      }));

      let body;

      // if (customState === "") {
        body = {
          packageName: values.packageName,
          description: values.description,
          products: packageProduct,
        };

        console.log(body)
      // } 
      // else {
      //   const formattedArray = values?.productId?.map(item => typeof item === "string" ? (parseInt(item.split(".")[0], 10)) : item);

      //   body = {
      //     packageName: values.packageName,
      //     description: values.description,
      //     products: packageProduct,
      //     type: "custom",
      //     collection: {
      //       numberOfSessions: parseInt(values.noOfSession, 10),
      //       products: formattedArray,
      //     }
      //   };
      // }

      const response = await axios.patch(
        `${apiUrl}/api/v1/admin/package/fix/${packageId}`, body, {
        headers: {
          token: getToken(),
        }
      });

      if (response?.status === 201 || response?.status === 200) {
        setPackagesSubmitted(true);
      } else {
        alert('Something went wrong');
      }
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (packageType === "edit") {
      fetchParticularData();
    }
  }, [packageType]);

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
          <TextField
            variant="outlined"
            label="Number Of Sessions"
            name="noOfSession"
            type='number'
            value={values.noOfSession}
            onChange={handleInputChange}
          />
          <div style={{ display: "flex", gap: "20px" }}>
            <FormControl sx={{ width: "850px" }}>
              <InputLabel id="productID">Products*</InputLabel>
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
            <FormControl sx={{ width: "330px" }}>
              <InputLabel id="productID">Body Parts*</InputLabel>
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
          </div>
        </>}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={packageType === "add" ? handleSubmit : handleUpdate}
        style={{ width: '20%', marginTop: '30px' }}
      >
        Submit
      </Button>
    </>
  );
};

export default PackageDetails;
