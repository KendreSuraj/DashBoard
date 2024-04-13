import React from 'react'
import TableComponent from '../../components/common/TableComponent/TableComponent'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
const CenterListing = () => {
    const navigate=useNavigate()
    const arrayOfObjects = [
        { field1: 'value1', field2: 'value2', field3: 'value3', field4: 'value4', field5: 'value5' },
        { field1: 'value6', field2: 'value7', field3: 'value8', field4: 'value9', field5: 'value10' },
        { field1: 'value11', field2: 'value12', field3: 'value13', field4: 'value14', field5: 'value15' },
        { field1: 'value16', field2: 'value17', field3: 'value18', field4: 'value19', field5: 'value20' },
        { field1: 'value21', field2: 'value22', field3: 'value23', field4: 'value24', field5: 'value25' },
        { field1: 'value26', field2: 'value27', field3: 'value28', field4: 'value29', field5: 'value30' },
        { field1: 'value31', field2: 'value32', field3: 'value33', field4: 'value34', field5: 'value35' },
        { field1: 'value36', field2: 'value37', field3: 'value38', field4: 'value39', field5: 'value40' },
        { field1: 'value41', field2: 'value42', field3: 'value43', field4: 'value44', field5: 'value45' },
        { field1: 'value46', field2: 'value47', field3: 'value48', field4: 'value49', field5: 'value50' }
    ];
    const handleEdit = (data) => {
        if (data) {
          navigate("/addedit-center", {
            state: {data:{arrayOfObjects}},
          });
        }
      };

    return (
        <div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',margin:"30px" }}>
                <h3 style={{ margin: '0 auto' }}>All Centers</h3>
                <Button variant="contained" color="primary" onClick={()=>navigate("/addedit-center")}>Add Center</Button>
            </div>
            <TableComponent data={arrayOfObjects}
              viewButton={<EditIcon/>}
              viewDetails={handleEdit}
            />
        </div>
    )
}

export default CenterListing