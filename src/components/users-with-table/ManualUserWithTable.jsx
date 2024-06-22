import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import axiosInstance from 'src/services/AxiosInterceptor';

const ManualUserWithTable = ({ open, onClose, onDataAdded }) => {
  const [formData, setFormData] = useState({
    bo_name: '',
    bo_email: '',
    headquarter: '',
    april_may_june_target: '',
    july_aug_sept_target: '',
    oct_nov_dec_target: '',
    april_may_june_incentive: '',
    july_aug_sept_incentive: '',
    oct_nov_dec_incentive: ''
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCancel = () => {
    setFormData({
      bo_name: '',
      bo_email: '',
      headquarter: '',
      april_may_june_target: '',
      july_aug_sept_target: '',
      oct_nov_dec_target: '',
      april_may_june_incentive: '',
      july_aug_sept_incentive: '',
      oct_nov_dec_incentive: ''
    });
    onClose();
  };

  const handleSubmit = async () => {
    const {
      bo_name,
      bo_email,
      headquarter,
      april_may_june_target,
      july_aug_sept_target,
      oct_nov_dec_target,
      april_may_june_incentive,
      july_aug_sept_incentive,
      oct_nov_dec_incentive
    } = formData;

    if (!bo_name || !bo_email || !headquarter || !april_may_june_target || !july_aug_sept_target || !oct_nov_dec_target || !april_may_june_incentive || !july_aug_sept_incentive || !oct_nov_dec_incentive) {
      setToast({ open: true, message: 'Please fill out all fields.', severity: 'warning' });
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.post('/user/incentive/store/manual', formData);
      console.log(response.data);
      setToast({ open: true, message: 'Data submitted successfully!', severity: 'success' });
      handleCancel();
      onDataAdded();  // Call the callback function to refresh the data
    } catch (error) {
      console.error('Error submitting data:', error);
      setToast({ open: true, message: 'Failed to submit data.', severity: 'error' });
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
          maxHeight: '90vh',
          overflowY: 'auto',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 1,
          display: 'flex',
          flexDirection: 'column',
        }}>
          <h2>Add Manually</h2>
          <TextField name="bo_name" label="BO Name" fullWidth margin="normal" value={formData.bo_name} onChange={handleChange} />
          <TextField name="bo_email" label="BO Email" fullWidth margin="normal" value={formData.bo_email} onChange={handleChange} />
          <TextField name="headquarter" label="Headquarter" fullWidth margin="normal" value={formData.headquarter} onChange={handleChange} />
          <TextField name="april_may_june_target" label="April-May-June Target" fullWidth margin="normal" value={formData.april_may_june_target} onChange={handleChange} />
          <TextField name="july_aug_sept_target" label="July-Aug-Sept Target" fullWidth margin="normal" value={formData.july_aug_sept_target} onChange={handleChange} />
          <TextField name="oct_nov_dec_target" label="Oct-Nov-Dec Target" fullWidth margin="normal" value={formData.oct_nov_dec_target} onChange={handleChange} />
          <TextField name="april_may_june_incentive" label="April-May-June Incentive" fullWidth margin="normal" value={formData.april_may_june_incentive} onChange={handleChange} />
          <TextField name="july_aug_sept_incentive" label="July-Aug-Sept Incentive" fullWidth margin="normal" value={formData.july_aug_sept_incentive} onChange={handleChange} />
          <TextField name="oct_nov_dec_incentive" label="Oct-Nov-Dec Incentive" fullWidth margin="normal" value={formData.oct_nov_dec_incentive} onChange={handleChange} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
            <Button variant="outlined" onClick={handleCancel} disabled={loading}>Close</Button>
            <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Submit'}
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

export default ManualUserWithTable;
