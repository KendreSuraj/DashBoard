import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCoupon, fetchCoupon } from '../../store/actions/couponsAction';
import TableComponent from '../../components/common/TableComponent/TableComponent';
import LoaderComponent from '../../components/common/LoaderComponent/LoaderComponent';
import moment from 'moment';
import {
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router';

const Coupons = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const couponList = useSelector((state) => state.coupons.couponList);

  useEffect(() => {
    dispatch(fetchCoupon());
  }, [dispatch]);

  // Function to format start dates using moment
  const formatDate = (date) => {
    return moment(date).format('MMMM Do YYYY, h:mm:ss a');
  };

  // Function to modify each object in the couponList array and format start dates
  const modifyCouponList = (originalList) => {
    const formattedCouponList = originalList.map((coupon) => {
      const obj = {
        ID: coupon.id,
        'Coupon Code': coupon.code,
        Description: coupon.description,
        'Coupon Type': coupon.type,
        'Contact Number': coupon.phoneNumber,
        'Discount Amount': coupon.discount,
        'Minimum Cart Discount': coupon.minCartDiscount,
        'Maximum Cart Discount': coupon.maxCartDiscount,
        'Discount Type': coupon.discountType,
        'Start Date': formatDate(coupon.startDate),
        'Expiry Date': formatDate(coupon.expiryDate),
      };
      return obj;
    });
    return formattedCouponList;
  };
  const modifiedCouponList = modifyCouponList(couponList);
  const handleDeleteCoupon = async (couponData) => {

    const id = couponData.ID
    const response = await deleteCoupon(id)
    if (response?.status?.code === 200) {
      window.location.reload()
    } else {
      alert("Can not delete coupon")
    }



  }

  const addCouponClickHandler = () => {
    navigate('/add-coupon')
  }

  const stringifiedUser = localStorage.getItem("userData")
  const userData = stringifiedUser? JSON.parse(stringifiedUser):null
  const hasCouponAccess = userData && userData.user && userData.user.hasCouponAccess? userData.user.hasCouponAccess:false 

  return (
    hasCouponAccess? (
      <div>

      <div>

        <h3>Coupons</h3>
        <>
          <Button
            concentrixUservariant="contained"
            color="primary"
            style={{ margin: '10px' ,backgroundColor:'#4C4CFF',color:'white'}}
            onClick={addCouponClickHandler}
          >
            Add Coupon
          </Button>
          {modifiedCouponList?.length > 0 ? (
            <TableComponent
              data={modifiedCouponList}
              deleteCouponButton={'delete'}
              deleteCoupon={handleDeleteCoupon}
            />
          ) : (
            <LoaderComponent />
          )}

        </>
      </div>
    </div>
    ):<h1>You do not have access for coupons</h1>


  );
};

export default Coupons;
