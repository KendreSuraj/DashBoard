import React from 'react';
import { useLocation } from 'react-router-dom';
import TableComponent from '../../components/common/TableComponent/TableComponent';

const ViewProductDetails = () => {
  let location = useLocation();
  const allProductDetails = location.state?.details;

  return (
    <div>
      <h3>Product All Details</h3>
      <TableComponent
        data={[allProductDetails]}
        hiddenFields={['description', 'image']}
      />
      <br />
      <div>
        <img src={allProductDetails.image} alt="image not found" />
      </div>
    </div>
  );
};

export default ViewProductDetails;
