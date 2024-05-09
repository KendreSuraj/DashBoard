import React, {useEffect}from 'react';

import TableComponent from '../../components/common/TableComponent/TableComponent';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { listPackages } from '../../store/actions/packages.action';

const Packages = () => {
  const dispatch = useDispatch();

  let packageList = useSelector((state) => state.packages.packagesList?.packages);

  useEffect(() => {
    dispatch(listPackages());
  }, [dispatch]);


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
        onClick={null}
      >
        Add Package
      </Button>

      <TableComponent 
      hiddenFields={["products"]}
      data={packageList} 
      viewPackagesButton={'view'}
      />
    </div>
  );
};

export default Packages;
