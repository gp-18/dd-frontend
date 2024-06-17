import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import { styled } from '@mui/material/styles';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Button from '@mui/material/Button';

import UploadUserWithTableModal from 'src/components/upload-excel-file/UploadUserWithTableModal';
import ManualUserWithTable from 'src/components/users-with-table/ManualUserWithTable';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-of-type td, &:last-of-type th': {
    border: 0,
  },
}));

const createData = (name, calories, fat, carbs, protein) => {
  return { name, calories, fat, carbs, protein };
};

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const TableCustomized = () => {
  const [isUploadModalOpen, setUploadModalOpen] = useState(false);
  const [isAddManuallyModalOpen, setAddManuallyModalOpen] = useState(false);
  const [userRole, setUserRole] = useState(null); 

  useEffect(() => {
    const role = localStorage.getItem('role');
    setUserRole(role);
  }, []);

  const handleUploadClick = () => {
    setUploadModalOpen(true);
  };

  const handleAddManuallyClick = () => {
    setAddManuallyModalOpen(true);
  };

  const handleCloseUploadModal = () => {
    setUploadModalOpen(false);
  };

  const handleCloseAddManuallyModal = () => {
    setAddManuallyModalOpen(false);
  };

  return (
    <>
      {userRole === 'A' && ( 
        <div style={{ marginBottom: '10px' }}>
          <Button variant="contained" onClick={handleUploadClick} style={{ marginRight: '10px' }}>Upload Excel File</Button>
          <Button variant="contained" onClick={handleAddManuallyClick}>Add Manually</Button>
        </div>
      )}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>SR No</StyledTableCell>
              <StyledTableCell align='right'>Calories</StyledTableCell>
              <StyledTableCell align='right'>Fat (g)</StyledTableCell>
              <StyledTableCell align='right'>Carbs (g)</StyledTableCell>
              <StyledTableCell align='right'>Protein (g)</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component='th' scope='row'>
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align='right'>{row.calories}</StyledTableCell>
                <StyledTableCell align='right'>{row.fat}</StyledTableCell>
                <StyledTableCell align='right'>{row.carbs}</StyledTableCell>
                <StyledTableCell align='right'>{row.protein}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <UploadUserWithTableModal open={isUploadModalOpen} onClose={handleCloseUploadModal} />
      <ManualUserWithTable  open={isAddManuallyModalOpen} onClose={handleCloseAddManuallyModal} />
    </>
  );
};

export default TableCustomized;
