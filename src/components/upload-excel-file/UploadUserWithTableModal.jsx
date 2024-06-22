import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import axiosInstance from 'src/services/AxiosInterceptor';

const UploadUserWithTableModal = ({ open, onClose, onDataAdded }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCancel = () => {
    setFile(null);
    onClose();
  };

  const handleSubmit = async () => {
    if (!file) {
      setToast({ open: true, message: 'Please select an Excel file.', severity: 'warning' });
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);

    try {
      const response = await axiosInstance.post('/user/incentive/store/excel', formData);
      console.log(response.data);
      setToast({ open: true, message: 'File uploaded successfully!', severity: 'success' });
      handleCancel();
      onDataAdded();  // Call the callback function to refresh the data
    } catch (error) {
      console.error('Error uploading file:', error);
      setToast({ open: true, message: 'Failed to upload file.', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleToastClose = () => {
    setToast({ ...toast, open: false });
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 1,
          display: 'flex',
          flexDirection: 'column',
        }}>
          <h2>Upload Excel File</h2>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
            style={{ marginBottom: '16px' }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
            <Button variant="outlined" onClick={handleCancel} disabled={loading}>Cancel</Button>
            <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Upload'}
            </Button>
          </Box>
        </Box>
      </Modal>
      <Snackbar open={toast.open} autoHideDuration={6000} onClose={handleToastClose}>
        <Alert onClose={handleToastClose} severity={toast.severity} sx={{ width: '100%' }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default UploadUserWithTableModal;
