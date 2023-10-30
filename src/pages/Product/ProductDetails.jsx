import React from 'react';
import './ProductDetails.style.css';
import TableComponent from '../../components/common/TableComponent/TableComponent';

const ProductDetails = () => {
  let data = [];
  return (
    <div>
      <h3>Product Details</h3>
      <TableComponent data={data} />
    </div>
  );
};

export default ProductDetails;
