import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableComponent from '../../components/common/TableComponent/TableComponent';
import * as XLSX from 'xlsx';
import { Button, Box } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { getVirtualconsultations } from '../../store/actions/Virtualconsultations.action';
import VirtualConsultationTable from './VirtualConsultationTable';
import { hasAdminAndSuperAdminAccess } from '../../components/common/UserRolesConfig';

const VirtualConsultations = () => {
  const role = JSON.parse(localStorage.getItem('userData'))?.user?.role;
  const dispatch = useDispatch();
  const virtualConsultations = useSelector(
    (state) => state?.VirtualConsultation?.VirtualConsulationList
  );
  useEffect(() => {
    const fetchVirtualConsultations = async () => {
      await dispatch(getVirtualconsultations());
    };
    fetchVirtualConsultations();
  }, [dispatch]);

  const handleDownload = () => {
    const xlsxData = [
      ["Id", "Name", "Phone", "Time", "Date", "Status"]
    ];
    virtualConsultations.forEach((item) => {
      xlsxData.push([
        item.id,
        item?.name,
        item?.phone,
        item?.time,
        item?.date,
        item.status
      ]);
    });
    const worksheet = XLSX.utils.aoa_to_sheet(xlsxData);
    const columnWidths = xlsxData[0].map(column => ({ width: column.length + 4 }));
    worksheet['!cols'] = columnWidths;
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'virtualConsultations Sheet');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'virtualConsultations.xlsx';
    link.click();
  }

  return (
    <div>
      <h5 style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: "20px", fontSize: "1.5rem" }}>Virtual consultation list</h5>
      {/* <TableComponent data={virtualConsultations} /> */}
     {hasAdminAndSuperAdminAccess(role)&& <Button
          style={{ display: 'flex', justifyContent: 'flex-end', float: 'right',marginBottom:'20px' }}
          variant="contained"
          color="primary"
          endIcon={<DownloadIcon />}
          onClick={handleDownload}
        >
          Virtual consultation
        </Button>}
      <VirtualConsultationTable data={virtualConsultations}/>
    </div>
  );
};

export default VirtualConsultations;
