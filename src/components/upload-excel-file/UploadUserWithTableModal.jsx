import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const UploadUserWithTableModal = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
        <h2>Upload Excel File</h2>
      </Box>
    </Modal>
  );
};

export default UploadUserWithTableModal;
