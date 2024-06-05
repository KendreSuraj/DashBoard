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

  const stringifiedUser = localStorage.getItem("userData")
  const userData = stringifiedUser? JSON.parse(stringifiedUser):null
  const concentrixUser = userData && userData.user && userData.user.concentrixUser? userData.user.concentrixUser:false 

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  return (
    concentrixUser? <h1>You do not have access for this.</h1>:<div>
    <h3>Product Details</h3>
    <>
      {productList?.length > 0 ? (
        <TableComponent
          data={productList}
          hiddenFields={['image', 'description', 'slug']}
          viewButton={'view'}
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
