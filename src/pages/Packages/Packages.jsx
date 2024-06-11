import React, { useEffect, useState } from 'react';

import TableComponent from '../../components/common/TableComponent/TableComponent';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { listPackages } from '../../store/actions/packages.action';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getToken } from '../../components/common/userLocalStorageUtils';

const apiUrl = process.env.REACT_APP_API_URL;

const Packages = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [packageLength, setPackagelength] = useState(0);

  let packageList = useSelector((state) => state.packages.packagesList?.packages);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/v1/admin/package/list`, {

        headers: {
          Authorization: `Basic ${process.env.REACT_APP_ADMIN_APP_KEY}`,
          token: getToken(),
        },
      });
      const data = await res.data.data.packages?.length;
      setPackagelength(data)
    }
    catch (error) {
      console.error('Error in Partner:', error);
      throw error;
    }
  }

  const handleEdit = (e) => {
    localStorage.setItem('packageEdit', e.id);
    localStorage.setItem('packageDetail', 'edit');
    navigate('packagesteps')
  }

  const handlePagination = (event) => {
    const pageNumber = parseInt(event.target.innerHTML.split("")[0], 10);
    setPage(pageNumber);
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    dispatch(listPackages(page));
  }, [dispatch, page]);

  return (
    <div>
      <h3>Packages</h3>
      <Button
        concentrixUservariant="contained"
        color="primary"
        style={{
          margin: '10px',
          backgroundColor: '#384456',
          color: 'white',
          transition: 'transform 0.3s,background-color 0.3s',
        }}
        onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
        onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        onClick={() => {
          navigate("/packages/packagesteps");
          localStorage.setItem('packageDetail', 'add');
        }}
      >
        Add Package
      </Button>

      <TableComponent
        hiddenFields={["products", "packageFinalPrice", "packagePrice", "numberOfSessions"]}
        data={packageList}
        viewButton={'Edit'}
        viewDetails={handleEdit}
      />

      <div style={{ marginTop: "20px", float: "right" }}>
        <Pagination
          count={Math.ceil(packageLength / 10)}
          color="primary"
          onChange={handlePagination}
        />
      </div>
    </div>
  );
};

export default Packages;
