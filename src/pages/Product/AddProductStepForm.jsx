import React, { useEffect, useState } from 'react';
import './AddProductStepForm.style.css';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  addStepTemplate,
  UpdateStepTemplate,
} from '../../store/actions/product.action';

const AddProductStepForm = () => {
  const navigate = useNavigate();
  let location = useLocation();
  const productDetails = location.state?.details;
  const productId = productDetails?.id;
  const productOrder = location.state?.productOrder + 1;
  const productStep = location.state?.productStep;
  const productStepId = productStep?.id;
  const [formData, setFormData] = useState({
    productId: productId,
    order: productOrder,
    title: '',
    type: '',
    description: '',
    incentive: '',
    remarks: '',
  });
  useEffect(() => {
    if (productStep) {
      setFormData({
        productId: productId,
        order: productStep.order,
        title: productStep.title,
        type: productStep.type,
        description: productStep.description,
        incentive: productStep.incentive,
        remarks: productStep?.remarks,
      });
    }
  }, [productStep]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = productStep
      ? await UpdateStepTemplate(formData, productStepId)
      : await addStepTemplate(formData);
    if (response?.status?.code === 201 || response?.status?.code === 200) {
      alert(response?.status?.message);
      navigate('/viewproductdetails', { state: { details: productDetails } });
    }
  };

  return (
    <form className="product-step-form" onSubmit={handleSubmit}>
      <h3>Add Product step</h3>
      <label>
        Title:
        <input
          type="text"
          name="title"
          placeholder="Enter product Step"
          required
          value={formData.title}
          onChange={handleChange}
        />
      </label>

      <label>
        Type:
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          <option value="image">Image</option>
          <option value="text">Text</option>
        </select>
      </label>

      <label>
        Incentive:
        <input
          type="number"
          name="incentive"
          placeholder="Enter incentive"
          required
          value={formData.incentive}
          onChange={handleChange}
        />
      </label>

      <label>
        Description:
        <textarea
          name="description"
          placeholder="Enter description"
          required
          value={formData.description}
          onChange={handleChange}
        />
      </label>

      <label>
        Enter Remarks:
        <textarea
          name="remarks"
          placeholder="Enter Remark"
          required
          value={formData.remarks}
          onChange={handleChange}
        />
      </label>
      <button type="submit" className="add-step-button">
        {productStep ? 'Update' : 'Submit'}
      </button>
    </form>
  );
};

export default AddProductStepForm;
