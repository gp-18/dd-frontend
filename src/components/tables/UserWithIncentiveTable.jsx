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
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Backdrop from '@mui/material/Backdrop';
import EditUserIncentiveModal from '../users-with-table/EditUserIncentiveModal';
import { LuSendHorizonal } from "react-icons/lu";
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

const UserWithIncentiveTable = ({ userRole, rows, onDataAdded }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSendMailClick = async (user) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/templates');
      setTemplates(response.data);
      setSelectedUser(user);
      setDialogOpen(true);
    } catch (error) {
      console.error('Error fetching templates:', error);
      showSnackbar('Failed to fetch templates', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedTemplate(null);
    setSelectedUser(null);
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    showSnackbar(`You have selected ${template.name}`, 'info');
  };

  const handleSendMail = async () => {
    if (selectedTemplate && selectedUser) {
      console.log(selectedUser);
      setSending(true);
      try {
        await axiosInstance.post('/send-mail-template', {
          templateName: selectedTemplate.name,
          templateContent: selectedTemplate.content,
          recipientEmail: selectedUser.bo_email,
        });
        showSnackbar(`Email sent successfully with template ${selectedTemplate.name} to ${selectedUser.bo_name}`, 'success');
        handleCloseDialog();
      } catch (error) {
        console.error('Error sending email:', error);
        showSnackbar('Failed to send email', 'error');
      } finally {
        setSending(false);
      }
    }
  };

  const handleEditClick = (userId) => {
    setEditUserId(userId);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>SR No</StyledTableCell>
            <StyledTableCell>Bo_Name</StyledTableCell>
            <StyledTableCell>Bo_email</StyledTableCell>
            <StyledTableCell>Headquarter</StyledTableCell>
            <StyledTableCell align="right">abm_name</StyledTableCell>
            <StyledTableCell align="right">rsm_name</StyledTableCell>
            <StyledTableCell align="right">nsm_name</StyledTableCell>
            <StyledTableCell align="right">gpm_name</StyledTableCell>
            <StyledTableCell align="right">April-May-June Target</StyledTableCell>
            <StyledTableCell align="right">July-Aug-Sept Target</StyledTableCell>
            <StyledTableCell align="right">Oct-Nov-Dec Target</StyledTableCell>
            <StyledTableCell align="right">April-May-June Incentive</StyledTableCell>
            <StyledTableCell align="right">July-Aug-Sept Incentive</StyledTableCell>
            <StyledTableCell align="right">Oct-Nov-Dec Incentive</StyledTableCell>
            {userRole === 'A' && <StyledTableCell align="right">Send Mail</StyledTableCell>}
            {userRole === 'A' && <StyledTableCell align="right">Actions</StyledTableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {index + 1}
              </StyledTableCell>
              <StyledTableCell>{row.bo_name}</StyledTableCell>
              <StyledTableCell>{row.bo_email}</StyledTableCell>
              <StyledTableCell>{row.headquarter}</StyledTableCell>
              <StyledTableCell align="right">{row.user.abm_name}</StyledTableCell>
              <StyledTableCell align="right">{row.user.rsm_name}</StyledTableCell>
              <StyledTableCell align="right">{row.user.nsm_name}</StyledTableCell>
              <StyledTableCell align="right">{row.user.gpm_name}</StyledTableCell>
              <StyledTableCell align="right">{row.april_may_june_target}</StyledTableCell>
              <StyledTableCell align="right">{row.july_aug_sept_target}</StyledTableCell>
              <StyledTableCell align="right">{row.oct_nov_dec_target}</StyledTableCell>
              <StyledTableCell align="right">{row.april_may_june_incentive}</StyledTableCell>
              <StyledTableCell align="right">{row.july_aug_sept_incentive}</StyledTableCell>
              <StyledTableCell align="right">{row.oct_nov_dec_incentive}</StyledTableCell>
              {userRole === 'A' && (
                <StyledTableCell align="right">
                  <Button
                    color="primary"
                    onClick={() => handleSendMailClick(row)}
                    style={{ textTransform: 'none' }}
                  >
                    Send Mail
                  </Button>
                </StyledTableCell>
              )}
              {userRole === 'A' && (
                <StyledTableCell align="right">
                  <IconButton color="primary" aria-label="edit" onClick={() => handleEditClick(row.id)}>
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
          {loading ? (
            <Backdrop open={loading}>
              <CircularProgress color="inherit" />
            </Backdrop>
          ) : (
            templates.map((template) => (
              <Button key={template.id} onClick={() => handleTemplateSelect(template)}>
                {template.name}
              </Button>
            ))
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="error">
            Cancel
          </Button>
          <Button onClick={handleSendMail} color="success" variant="contained" disabled={sending}>
            {sending ? <CircularProgress size={24} /> : <LuSendHorizonal />}
          </Button>
        </DialogActions>
      </Dialog>
      {editModalOpen && (
        <EditUserIncentiveModal open={editModalOpen} onClose={handleEditModalClose} userId={editUserId} onDataAdded={onDataAdded} />
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </TableContainer>
  );
};

export default UserWithIncentiveTable;
