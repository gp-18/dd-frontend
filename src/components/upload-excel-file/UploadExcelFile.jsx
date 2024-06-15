import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import axiosInstance from 'src/services/AxiosInterceptor';

const UploadExcelFile = ({ open, onClose, fetchTableData }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileSubmit = async () => {
    try {
      if (file) {
        const formData = new FormData();
        formData.append('file', file);

        await axiosInstance.post('user/store/excel', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        fetchTableData(); // Call fetchTableData after successfully submitting the file
        onClose(); // Close the dialog
      } else {
        alert('Please select a file.');
      }
    } catch (error) {
      console.error('Error submitting file:', error);
    }
  };

  const handleClose = () => {
    setFile(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Upload Excel File</DialogTitle>
      <DialogContent>
        <input accept='.xlsx, .xls' type='file' onChange={handleFileChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button onClick={handleFileSubmit} variant='contained' color='primary' disabled={!file}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadExcelFile;
