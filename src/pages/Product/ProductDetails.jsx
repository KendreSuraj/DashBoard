import React, { useEffect } from 'react';
import './ProductDetails.style.css';
import TableComponent from '../../components/common/TableComponent/TableComponent';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../../store/actions/product.action';
import { useNavigate } from 'react-router-dom';
import LoaderComponent from '../../components/common/LoaderComponent/LoaderComponent';

const ProductDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product.productList);

  const handleUpdateDetails = (id) => {
    console.log(`Product with ID ${id} updated`);
  };
  const handleViewDetails = (details) => {
    navigate('/viewproductdetails', { state: { details } });
  };

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  return (
    <div>
      <h3>Product Details</h3>
      <>
        {productList?.length > 0 ? (
          <TableComponent
            data={productList}
            hiddenFields={['image', 'description']}
            viewButton={true}
            updateDetails={handleUpdateDetails}
            viewDetails={handleViewDetails}
          />
        ) : (
          <LoaderComponent />
        )}
      </>
    </div>
  );
};

export default ProductDetails;
