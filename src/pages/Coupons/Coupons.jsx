import React, { useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCoupon, fetchCoupon } from '../../store/actions/couponsAction';
// import { fetchCoupon } from '../../store/actions/couponsAction';
import TableComponent from '../../components/common/TableComponent/TableComponent';
import LoaderComponent from '../../components/common/LoaderComponent/LoaderComponent';
import moment from 'moment';
import {
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router';
import ConfirmDialog from '../../components/common/Dialog/ConfirmDialog';


const Coupons = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [openDialog, setOpenDialog] = useState(false);
  const [deleteCouponData, setDeleteCouponData] = useState({})
  const couponList = useSelector((state) => state.coupons.couponList);

  useEffect(() => {
    dispatch(fetchCoupon());
  }, [dispatch]);

  // Function to format start dates using moment
  const formatDate = (date) => {
    return moment(date).format('MMMM Do YYYY, h:mm:ss a');
  };

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
    setDeleteCouponData(couponData)
    setOpenDialog(true);
  }


  const addCouponClickHandler = () => {
    navigate('/add-coupon')
  }
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirm = ()=>{
    
    const id = deleteCouponData.ID
    deleteCoupon(id).then(response=> {
      if (response?.status?.code === 200) {
        setDeleteCouponData({})
        window.location.reload()
      } else {
        alert("Can not delete coupon")
      }
    }).catch(err=>{
      alert(err)
    })
    
  }

  const stringifiedUser = localStorage.getItem("userData")
  const userData = stringifiedUser? JSON.parse(stringifiedUser):null
  const hasCouponAccess = userData && userData.user && userData.user.hasCouponAccess? userData.user.hasCouponAccess:false 

  return (
    <>
    <ConfirmDialog isOpen = {openDialog}
                    onClose={handleCloseDialog}
                    onConfirm = {handleConfirm}
                    />
      {
        hasCouponAccess? (
          <div>
    
          <div>
    
            <h3>Coupons</h3>
            <>
            
              <Button
                concentrixUservariant="contained"
                color="primary"
                style={{ margin: '10px' ,backgroundColor:'#384456',
                color: 'white',
                transition: 'transform 0.3s,background-color 0.3s'
            
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')
            }
              onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            
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
      }
    </>


  );
};

export default Coupons;
