import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import {
  TextField,
} from '@material-ui/core';
import FormControl from "@mui/material/FormControl";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Button } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import Autocomplete from '@mui/material/Autocomplete';
import { Editor } from '@tinymce/tinymce-react';

import { getToken } from '../../../components/common/userLocalStorageUtils';
import PackageItem from './PackageItem';

const bodyparts = ["Hands", "Chest", "Legs", "Abdomen", "Head"];

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
  const [parts, setParts] = useState([]);
  const [names, setNames] = useState([]);
  const [packageItems, setPackageItems] = useState([]);
  const [Radiovalue, setRadioValue] = React.useState('female');
  const [discount, setDiscount] = useState('flat')
  const [price, setPrice] = useState(0);
  const [discountValue, setDiscountValue] = useState(0)
  const [finalPrice, setFinalPrice] = useState(0);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [packageImage, setPackageImage] = useState();
  const [initialContent, setInitialContent] = useState("");
  const [editImage, setEditImage] = useState(false);

  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
  };

  const handleDiscountChange = (event) => {
    setDiscount(event.target.value);
  };

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
    setNames(product.filter((item) => item.categoryGender === Radiovalue).map(obj => `${obj.id}. ${obj.name}`));
  };

  const fetchParticularData = async () => {
    const res = await axios.get(`${apiUrl}/api/v1/admin/package/detail/${packageId}`, {
      headers: {
        Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
        token: getToken(),
      },
    });
    if (!res.data.data.bodyParts) {
      setCustomState("");
      const items = res.data.data.products.map(obj => ({
        productId: `${obj.productId}. ${obj.name}`,
        sessions: obj.numberOfSessions
      }));
      setPackageItems(items);
      setValues({
        packageName: res.data.data.packageName,
        description: res.data.data.packageDescription,
      });
      setInitialContent(res.data.data.packageDescription);
      setPrice(res.data.data.price);
      setFinalPrice(res.data.data.finalPrice)
      setDiscountValue(res.data.data.packagePriceType === "flat" ? res.data.data.price - res.data.data.finalPrice : 0)
      setDiscountPercent(res.data.data.packagePriceType === "flat" ? res.data.data.price - res.data.data.finalPrice : res.data.data.discount)
      setDiscount(res.data.data.packagePriceType)
      setChecked(false);
      setPackageImage(res.data.data.image)
    }
    else {
      setCustomState("custom");

      setChecked(true);
      setValues({
        packageName: res.data.data.packageName,
        description: res.data.data.packageDescription,
        noOfSession: res.data.data.numberOfSessions,
      });
      setInitialContent(res.data.data.packageDescription);
      setPersonName(res.data.data.products.map(obj => `${obj.id}. ${obj.name}`));
      setParts(res.data.data.bodyParts)
      setDiscountPercent(res.data.data.discount)
      setPackageImage(res.data.data.image)

    }
  };

  const handleChange = (event) => {
    const {
      target: { innerHTML },
    } = event;
    setPersonName([...personName, innerHTML]);
    setValues({
      ...values,
      "productId": [...personName, innerHTML.split(".")[0]],
    });
  };

  const handleBodyParts = (event) => {
    const {
      target: { innerHTML },
    } = event;
    setParts([...new Set(parts), innerHTML]);
    setValues({
      ...values,
    });
  }

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
        if (packageProduct.length < 2) {
          alert("Please select atleast 2 products")
          return;
        }
        body = {
          packageName: values.packageName,
          description: values.description,
          products: packageProduct,
          price,
          finalPrice: Math.ceil(finalPrice),
          packagePriceType: discount,
          discount: discountPercent,
          image: packageImage,
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
          products: formattedArray,
          numberOfSessions: parseInt(values.noOfSession, 10),
          bodyParts: parts,
          discount: discountPercent,
          image: packageImage,

        };
        response = await axios.post(
          `${apiUrl}/api/v1/admin/package/create-custom-package`, body, {
          headers: {
            token: getToken(),
          }
        });
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
        productId: parseInt(item.productId.split(".")[0], 10),
        numberOfSessions: parseInt(item.sessions, 10)
      }));
      let body;
      let response;

      if (customState === "") {
        if (packageProduct.length < 2) {
          alert("Please select atleast 2 products")
          return;
        }
        if (discount === "flat") {
          setDiscountPercent(parseInt((discountValue / price) * 100))
        }
        else {
          setDiscountPercent(parseInt(discountValue))
        }
        body = {
          packageName: values.packageName,
          description: values.description,
          products: packageProduct,
          price: parseInt(price, 10),
          finalPrice: Math.ceil(finalPrice),
          packagePriceType: discount,
          discount: parseInt(discountPercent, 10),
          image: packageImage,

        };
        response = await axios.patch(
          `${apiUrl}/api/v1/admin/package/fix/${packageId}`, body, {
          headers: {
            token: getToken(),
          }
        });
      } else {
        const formattedArray = personName?.map(item => (parseInt(item.split(".")[0], 10)));

        body = {
          packageName: values.packageName,
          description: values.description,
          products: formattedArray,
          numberOfSessions: parseInt(values.noOfSession, 10),
          bodyParts: parts,
          discount: parseInt(discountPercent, 10),
          image: packageImage,
        };

        response = await axios.patch(
          `${apiUrl}/api/v1/admin/package/custom/${packageId}`, body, {
          headers: {
            token: getToken(),
          }
        });
      }

      if (response?.status === 201 || response?.status === 200) {
        setPackagesSubmitted(true);
      } else {
        alert('Something went wrong');
      }
    } catch (err) {
      alert(err);
    }
  };

  const handleDiscountValue = (event) => {
    if (discount === "flat") {

      setDiscountValue(event.target.value)
      setDiscountPercent(parseInt(event.target.value))
    }
    else {
      setDiscountValue((event.target.value * price) / 100)
      setDiscountPercent(parseInt(event.target.value))
    }
  }

  const handleImageChange = (event) => {
    const { files } = event.target;
    const file = files[0];
    console.log(file)
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
        setPackageImage(
          compressedDataURL
        );
      };
    };
    reader.readAsDataURL(file);
  }

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      setValues({
        ...values,
        description: editorRef.current.getContent(),
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [Radiovalue]);

  useEffect(() => {
    if (packageType === "edit") {
      fetchParticularData();
    }
  }, [packageType]);

  useEffect(() => {
    if (price - discountValue < 0) {
      alert("Please Enter valid Discount")
    } else {
      setFinalPrice(price - discountValue)
    }
  }, [price, discountValue])

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

      {/* <TextField
        variant="outlined"
        label="Description"
        name="description"
        value={values.description}
        onChange={handleInputChange}
        required
      /> */}

      <Editor
        apiKey='1s2mvrmfdfu3iaw5yvt1n3mek2e2zds78tm3b2mzbihysqw0'
        onInit={(_evt, editor) => editorRef.current = editor}
        initialValue={initialContent}
        init={{
          height: 500,
          menubar: false,
          plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker permanentpen powerpaste advtable advcode editimage tableofcontents mergetags inlinecss',
          toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
        // onChange={log}
        onEditorChange={(content) => setValues({ ...values, description: content })}
      />
      <div className="add-payment-form-group">
        <label className="add-payment-label" htmlFor="image">Package Image:</label>
        {packageType !== "edit" && <input
          className="add-payment-input"
          type="file"
          id="image"
          name="image"
          // accept="image/*"
          accept=".jpeg, .jpg, .png"
          onChange={handleImageChange}
          required
        />}

        {!editImage && packageType === "edit" &&
          <div style={{ display: "flex", flexDirection: "column", width: "max-content", gap: "10px" }}>
            <img src={packageImage} alt={values.packageName} width={200} height={200} />
            <button type='button' onClick={() => { setEditImage(true); }}>Remove Image</button>
          </div>}

          {editImage && packageType === "edit" && <input
          className="add-payment-input"
          type="file"
          id="image"
          name="image"
          // accept="image/*"
          accept=".jpeg, .jpg, .png"
          onChange={handleImageChange}
          required
        />}
      </div>
      <div>
        <FormControlLabel control={
          <Checkbox
            checked={checked}
            onChange={handleCheckBoxChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />} label="Custom" />
      </div>

      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group" sx={{ color: "black" }}>Select Gender</FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={Radiovalue}
          onChange={handleRadioChange}
        >
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
        </RadioGroup>
      </FormControl>

      {!checked && packageItems.map((item, index) => (
        <PackageItem
          key={index}
          index={index}
          rule={item}
          names={names}
          onChange={handlePackageItemChange}
          price={price}
          setPrice={setPrice}
        />
      ))}

      {!checked && <Button
        variant="contained"
        color="primary"
        onClick={addPackageItem}
        style={{ marginBottom: '20px', width: "25%" }}
      >
        Add Package Item
      </Button>}

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
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={names}
                value={personName}
                onChange={handleChange}
                multiple
                renderInput={(params) => <TextField {...params} label="Products" />}
              />
            </FormControl>
            <FormControl sx={{ width: "330px" }}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={bodyparts}
                value={parts}
                onChange={handleBodyParts}
                multiple
                renderInput={(params) => <TextField {...params} label="Body Parts" />}
              />
            </FormControl>
          </div>
        </>}

      <div style={{ fontSize: "20px" }}>

        {!checked && <p>Price: {price}</p>}

        {price > 0 && <>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={discount}
              style={{ display: "flex", flexDirection: "row" }}
              onChange={handleDiscountChange}
            >
              <FormControlLabel value="flat" control={<Radio />} label="Flat" />
              <FormControlLabel value="percent" control={<Radio />} label="%" />
            </RadioGroup>
          </FormControl><br />

          {discount === "flat" &&
            <TextField
              variant="outlined"
              label="Flat Discount"
              name="flatDiscount"
              type='number'
              value={discountPercent}
              onChange={handleDiscountValue}
              required />}

          {discount === "percent" &&
            <TextField
              variant="outlined"
              label="Discount Percentage"
              name="percentageDiscount"
              onChange={handleDiscountValue}
              value={discountPercent}
              type='number'
              required />}

          {!checked && <p>Final Price: {finalPrice === 0 ? price : Math.ceil(finalPrice)}</p>}
        </>}

        {checked && <TextField
          variant="outlined"
          label="Discount Percentage"
          name="percentageDiscount"
          onChange={handleDiscountValue}
          type='number'
          value={discountPercent}
          required />}
      </div>
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
