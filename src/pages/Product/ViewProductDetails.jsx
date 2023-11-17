import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TableComponent from '../../components/common/TableComponent/TableComponent';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchProductStepsTemplates } from '../../store/actions/product.action';

const ViewProductDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let location = useLocation();
  const productDetails = location.state?.details;
  const prodcutId = productDetails?.id;

  const productSteps = useSelector(
    (state) => state.product.productSteptemplates.stepTemplates,
  );
  const addProductStep = () => {
    navigate('/addproductstep', {
      state: {
        details: productDetails,
        productOrder: productSteps.length,
      },
    });
  };

  const handleEdit = (productStep) => {
    if (productStep) {
      navigate('/addproductstep', {
        state: { productStep: productStep, details: productDetails },
      });
    }
  };

  useEffect(() => {
    dispatch(fetchProductStepsTemplates(prodcutId));
  }, []);

  return (
    <div>
      <h3>Product Details</h3>
      <TableComponent
        data={[productDetails]}
        hiddenFields={['description', 'image']}
      />
      <br />
      <div>
        {/* <img src={productDetails.image} alt="image not found" /> */}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: '10px',
          marginRight: '20px',
        }}
      >
        <Button variant="contained" onClick={() => addProductStep()}>
          Add Step
        </Button>
      </div>
      <h3>{productDetails.name} Product Steps</h3>
      <TableComponent
        data={productSteps}
        hiddenFields={['productId']}
        viewButton={'Edit'}
        viewDetails={handleEdit}
      />
    </div>
  );
};

export default ViewProductDetails;
