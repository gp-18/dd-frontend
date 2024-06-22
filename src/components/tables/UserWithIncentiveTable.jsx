import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import { styled } from '@mui/material/styles';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import { GrEdit } from 'react-icons/gr';
import { RiDeleteBinLine } from 'react-icons/ri';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditUserIncentiveModal from '../users-with-table/EditUserIncentiveModal';
import axiosInstance from 'src/services/AxiosInterceptor';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.common.black
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  '&:last-of-type td, &:last-of-type th': {
    border: 0
  }
}));

const createData = (
  srNo,
  bo_name,
  bo_email,
  headquarter,
  april_may_june_target,
  july_aug_sept_target,
  oct_nov_dec_target,
  april_may_june_incentive,
  july_aug_sept_incentive,
  oct_nov_dec_incentive,
  user
) => {
  return {
    srNo,
    bo_name,
    bo_email,
    headquarter,
    april_may_june_target,
    july_aug_sept_target,
    oct_nov_dec_target,
    april_may_june_incentive,
    july_aug_sept_incentive,
    oct_nov_dec_incentive,
    user
  };
};

const UserWithIncentiveTable = ({ userRole, rows ,onDataAdded}) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editUserId, setEditUserId] = useState(null);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((row) => row.srNo);
      setSelectedRows(newSelecteds);
    } else {
      setSelectedRows([]);
    }
  };

  const handleCheckboxClick = (srNo) => {
    const selectedIndex = selectedRows.indexOf(srNo);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedRows, srNo);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedRows.slice(1));
    } else if (selectedIndex === selectedRows.length - 1) {
      newSelected = newSelected.concat(selectedRows.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selectedRows.slice(0, selectedIndex), selectedRows.slice(selectedIndex + 1));
    }

    setSelectedRows(newSelected);
  };

  const handleSendMailClick = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setDialogOpen(false);
  };

  const handleEditClick = (userId) => {
    setEditUserId(userId);
    console.log(userId);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const dataAdded = () =>{
    onDataAdded();
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell padding='checkbox'>
              <Checkbox
                indeterminate={selectedRows.length > 0 && selectedRows.length < rows.length}
                checked={rows.length > 0 && selectedRows.length === rows.length}
                onChange={handleSelectAllClick}
              />
            </StyledTableCell>
            <StyledTableCell>SR No</StyledTableCell>
            <StyledTableCell>Bo_Name</StyledTableCell>
            <StyledTableCell>Bo_email</StyledTableCell>
            <StyledTableCell>Headquarter</StyledTableCell>
            <StyledTableCell align='right'>abm_name</StyledTableCell>
            <StyledTableCell align='right'>rsm_name</StyledTableCell>
            <StyledTableCell align='right'>nsm_name</StyledTableCell>
            <StyledTableCell align='right'>gpm_name</StyledTableCell>
            <StyledTableCell align='right'>April-May-June Target</StyledTableCell>
            <StyledTableCell align='right'>July-Aug-Sept Target</StyledTableCell>
            <StyledTableCell align='right'>Oct-Nov-Dec Target</StyledTableCell>
            <StyledTableCell align='right'>April-May-June Incentive</StyledTableCell>
            <StyledTableCell align='right'>July-Aug-Sept Incentive</StyledTableCell>
            <StyledTableCell align='right'>Oct-Nov-Dec Incentive</StyledTableCell>
            {userRole === 'A' && <StyledTableCell align='right'>Send Mail</StyledTableCell>}
            {userRole === 'A' && <StyledTableCell align='right'>Actions</StyledTableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row,index) => (
            <StyledTableRow key={row.srNo} selected={selectedRows.indexOf(row.srNo) !== -1}>
              <StyledTableCell padding='checkbox'>
                <Checkbox
                  checked={selectedRows.indexOf(row.srNo) !== -1}
                  onChange={() => handleCheckboxClick(row.srNo)}
                />
              </StyledTableCell>
              <StyledTableCell component='th' scope='row'>
                {index + 1}
              </StyledTableCell>
              <StyledTableCell>{row.bo_name}</StyledTableCell>
              <StyledTableCell>{row.bo_email}</StyledTableCell>
              <StyledTableCell>{row.headquarter}</StyledTableCell>
              <StyledTableCell align='right'>{row.user.abm_name}</StyledTableCell>
              <StyledTableCell align='right'>{row.user.rsm_name}</StyledTableCell>
              <StyledTableCell align='right'>{row.user.nsm_name}</StyledTableCell>
              <StyledTableCell align='right'>{row.user.gpm_name}</StyledTableCell>
              <StyledTableCell align='right'>{row.april_may_june_target}</StyledTableCell>
              <StyledTableCell align='right'>{row.july_aug_sept_target}</StyledTableCell>
              <StyledTableCell align='right'>{row.oct_nov_dec_target}</StyledTableCell>
              <StyledTableCell align='right'>{row.april_may_june_incentive}</StyledTableCell>
              <StyledTableCell align='right'>{row.july_aug_sept_incentive}</StyledTableCell>
              <StyledTableCell align='right'>{row.oct_nov_dec_incentive}</StyledTableCell>
              {userRole === 'A' && (
                <StyledTableCell align='right'>
                  <Button
                    variant='variant'
                    color='primary'
                    onClick={handleSendMailClick}
                    style={{ textTransform: 'none' }}
                  >
                    Send Mail
                  </Button>
                </StyledTableCell>
              )}
              {userRole === 'A' && (
                <StyledTableCell align='right'>
                  <IconButton color='primary' aria-label='edit' onClick={() => handleEditClick(row.id)}>
                    <GrEdit />
                  </IconButton>
                </StyledTableCell>
              )}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Select Mail Template</DialogTitle>
        <DialogContent>
          {/* Replace the following with your template selection logic */}
          <Button onClick={() => handleTemplateSelect('Template 1')}>Template 1</Button>
          <Button onClick={() => handleTemplateSelect('Template 2')}>Template 2</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color='primary'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      {editModalOpen && (
        <EditUserIncentiveModal open={editModalOpen} onClose={handleEditModalClose} userId={editUserId} onDataAdded={onDataAdded} />
      )}
    </TableContainer>
  );
};

export default UserWithIncentiveTable;
