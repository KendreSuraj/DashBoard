import React, { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { fetchFAQ,deleteFAQ } from '../../store/actions/faq.action';
import TableComponent from '../../components/common/TableComponent/TableComponent';

const FAQ = () => {
    const dispatch = useDispatch();
    const navigate= useNavigate();
    const faqsList = useSelector(state=> 
        // console.log(state))
        state.faq.faqList.faqs);
        
        const addFAQClickHandler = () => {
            navigate('/add-faq');
          }; 

    const handleDeleteFAQ = async (FAQData) => {
      // console.log(FAQData);
      deleteFAQ(FAQData.id)
      .then((response) => {
        if (response?.status?.code === 200) {
          window.location.reload();
        } else {
          alert('Can not delete faq');
        }
      })
      .catch((err) => {
        alert("Something went wrong!");
      });
        // setDeleteCouponData(couponData);
        // setOpenDialog(true);
        //faq.faqList.faqs
        // state.coupons.couponList
      };
    
    useEffect(() => {
        dispatch(fetchFAQ());
      }, [dispatch]);
      

  return (
    <div>
        <h3>FAQs</h3>
        <Button
        color="primary"
        style={{
          cursor:'pointer',
          margin: '8px',
          padding:'8px',
          backgroundColor: '#384456',
          color: 'white',
          fontSize:'18px',
          borderRadius:'5px',
          transition: 'transform 0.3s,background-color 0.3s',

        }}
        onMouseOver={(e) =>
          (e.currentTarget.style.transform = 'scale(1.1)')
        }
        onMouseOut={(e) =>
          (e.currentTarget.style.transform = 'scale(1)')
        }
          
         onClick={addFAQClickHandler}>Add FAQs</Button>
        <TableComponent 
        data={faqsList} 
        hiddenFields={[
          'createdAt',
          'updatedAt',
          'deletedAt',
        ]}
        deleteFAQButton={'delete'}
        deleteFAQ={handleDeleteFAQ}
        />

    </div>
  )
}

export default FAQ;