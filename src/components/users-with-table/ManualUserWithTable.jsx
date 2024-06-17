import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const ManualUserWithTable = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
        <h2>Add Manually</h2>
        <TextField label="BO Name" fullWidth />
        <TextField label="Headquarter" fullWidth />
        <TextField label="April-May-June Target" fullWidth />
        <TextField label="July-Aug-Sept Target" fullWidth />
        <TextField label="Oct-Nov-Dec Target" fullWidth />
        <TextField label="April-May-June Incentive" fullWidth />
        <TextField label="July-Aug-Sept Incentive" fullWidth />
        <TextField label="Oct-Nov-Dec Incentive" fullWidth />
        <TextField label="BO Email" fullWidth />
        {/* Add your input fields for other data */}
      </Box>
    </Modal>
  );
};

export default ManualUserWithTable;
