import React, { useEffect, useState } from 'react';
import TableComponent from '../../components/common/TableComponent/TableComponent';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchIncentiveSteps,
  finalIncentiveSubmit,
  submitIncentive,
} from '../../store/actions/incentive.action';
import { useLocation } from 'react-router-dom';
import './ViewUncheckedIncentive.style.css';
import { Button } from '@mui/material';
import moment from 'moment';

export default function ViewUncheckedIncentive() {
  const dispatch = useDispatch();
  const location = useLocation();
  const incentiveDetails = location.state?.details;
  const { sessionId, sessionSchedulesId, partnerId, productId } =
    incentiveDetails || {};
  const incentiveSteps = useSelector((state) => state.incentive.incentiveSteps);
  const [isEditing, setIsEditing] = useState(false);
  const adminData = JSON.parse(localStorage.getItem('userData') || '{}');
  let adminId = adminData?.user?.id;

  const [editedData, setEditedData] = useState([...incentiveSteps]);
  const handleInputChange = (index, field, value) => {
    setEditedData((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, [field]: parseInt(value) } : item,
      ),
    );
  };
  const handleEdit = (index) => {
    setIsEditing(index);
  };

  const updateIncentive = async (e, item, index) => {
    e.preventDefault();
    const updatedData = editedData[index] ?? {};
    if (updatedData) {
      dispatch(
        submitIncentive({
          adminId: adminId,
          partnerStepId: item.partnerStepId,
          partnerStepIncentiveId: item.partnerStepIncentiveId,
          amount: updatedData.allottedIncentive,
        }),
      );
    }
  };

  useEffect(() => {
    dispatch(
      fetchIncentiveSteps({
        sessionId,
        sessionSchedulesId,
        partnerId,
        productId,
      }),
    );
  }, [dispatch, sessionId, sessionSchedulesId, partnerId, productId]);

  useEffect(() => {
    setEditedData(incentiveSteps);
  }, [incentiveSteps]);

  const handleFinalSubmit = async () => {
    if (incentiveSteps.some((step) => !step.isIncentive)) {
      alert('Please Submit All Incentive');
    } else {
      const isConfirmed = window.confirm(
        'Are you sure you want to Final submit ??',
      );

      if (isConfirmed) {
        dispatch(
          finalIncentiveSubmit({
            adminId,
            sessionSchedulesId,
          }),
        );
      }
    }
  };

  return (
    <div>
      <h3>View Unchecked Incentive</h3>
      <TableComponent data={[incentiveDetails]}
        hiddenFields={[
          'order_id',
          'order_detail_id',
          'address_id',
          'product_id',
          'gender',
          'compound_code',
          'area',
          'state',
          'place_id',
          'addressId',
          'sessionSchedulesId',
          'sessionId',
          'clientId',
          'orderid',
          'orderDetailId',
          'placeId',
          'productId',
          'partnerId',
        ]} />
      <h3>All Incentive Steps</h3>
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Partner ID</th>
              <th>Product ID</th>
              <th>Session Id</th>
              <th>Session Schedules ID</th>
              <th>Partner Step Incentive Id</th>
              <th>Partner Step ID</th>
              <th>Date/Time</th>
              <th>Title</th>
              <th>Description</th>
              <th>Image</th>
              <th>Remarks</th>
              <th>Type</th>
              <th>Allocated Incentive</th>
            </tr>
          </thead>
          <tbody>
            {incentiveSteps?.length > 0 ? (
              incentiveSteps.map((item, index) => (
                <tr key={index}>
                  <td>{item.partnerId}</td>
                  <td>{item.productId}</td>
                  <td>{item.sessionId}</td>
                  <td>{item.sessionSchedulesId}</td>
                  <td>{item.partnerStepIncentiveId}</td>
                  <td>{item.partnerStepId}</td>
                  <td>{moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>
                    <img
                      className="view-unchecked-img"
                      src={`${item.image}?w=100&h=100&fit=crop`}
                      onClick={() => window.open(item.image, '_blank')}
                      style={{
                        cursor: 'pointer',
                        maxWidth: '100%',
                        maxHeight: '100%',
                      }}
                      alt="img"
                    />
                  </td>
                  <td>{item.remarks}</td>
                  <td>{item.type}</td>
                  <td>
                    <form
                      onSubmit={(e) => updateIncentive(e, item, index)}
                      className="inline-form"
                    >
                      <input
                        type="number"
                        value={
                          editedData[index]?.allottedIncentive ??
                          item.allottedIncentive
                        }
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            'allottedIncentive',
                            e.target.value,
                          )
                        }
                        className="min-width-input"
                        disabled={item.isIncentive && index !== isEditing}
                        required
                      />
                      {item.isIncentive && index !== isEditing ? (
                        <Button
                          type="button"
                          onClick={() => handleEdit(index)}
                          style={{
                            color: 'white',
                            background: 'blue',
                            marginTop: '-5px',
                          }}
                        >
                          Edit
                        </Button>
                      ) : (
                        <button
                          type="submit"
                          className="incentive-edit-form-button button-green"
                        >
                          SUBMIT
                        </button>
                      )}
                    </form>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="14"
                  style={{ textAlign: 'center', fontWeight: 'bold' }}
                >
                  Incentive Not Added
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {incentiveSteps?.length > 0 && (
        <div className="center">
          <button
            className="final-submit-button"
            onClick={() => handleFinalSubmit()}
          >
            Final Submit
          </button>
        </div>
      )}
    </div>
  );
}
