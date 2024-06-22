import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import axiosInstance from 'src/services/AxiosInterceptor';

const EditUserIncentiveModal = ({ open, onClose, userId , onDataAdded}) => {
  const [formData, setFormData] = useState({
    bo_name: '',
    bo_email: '',
    headquarter: '',
    april_may_june_target: '',
    july_aug_sept_target: '',
    oct_nov_dec_target: '',
    april_may_june_incentive: '',
    july_aug_sept_incentive: '',
    oct_nov_dec_incentive: '',
    user: {
      abm_name: '',
      rsm_name: '',
      nsm_name: '',
      gpm_name: ''
    }
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`user/incentive/show/${userId}`);
        setFormData(response.data.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleCancel = () => {
    onClose();
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      await axiosInstance.post(`user/incentive/update/${userId}`, formData);
      setToast({ open: true, message: 'Data updated successfully!', severity: 'success' });
      onClose();
      onDataAdded();
    } catch (error) {
      console.error('Error updating data:', error);
      setToast({ open: true, message: 'Failed to update data.', severity: 'error' });
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
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, maxHeight: '90vh', overflowY: 'auto', bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 1 }}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <h2>Edit User</h2>
              <TextField name="bo_name" label="BO Name" fullWidth margin="normal" value={formData.bo_name} onChange={handleChange} disabled/>
              <TextField name="bo_email" label="BO Email" fullWidth margin="normal" value={formData.bo_email} onChange={handleChange} disabled/>
              <TextField name="headquarter" label="Headquarter" fullWidth margin="normal" value={formData.headquarter} onChange={handleChange} />
              <TextField name="april_may_june_target" label="April-May-June Target" fullWidth margin="normal" value={formData.april_may_june_target} onChange={handleChange} />
              <TextField name="july_aug_sept_target" label="July-Aug-Sept Target" fullWidth margin="normal" value={formData.july_aug_sept_target} onChange={handleChange} />
              <TextField name="oct_nov_dec_target" label="Oct-Nov-Dec Target" fullWidth margin="normal" value={formData.oct_nov_dec_target} onChange={handleChange} />
              <TextField name="april_may_june_incentive" label="April-May-June Incentive" fullWidth margin="normal" value={formData.april_may_june_incentive} onChange={handleChange} />
              <TextField name="july_aug_sept_incentive" label="July-Aug-Sept Incentive" fullWidth margin="normal" value={formData.july_aug_sept_incentive} onChange={handleChange} />
              <TextField name="oct_nov_dec_incentive" label="Oct-Nov-Dec Incentive" fullWidth margin="normal" value={formData.oct_nov_dec_incentive} onChange={handleChange} />
              <TextField name="user.abm_name" label="ABM Name" fullWidth margin="normal" value={formData.user.abm_name} onChange={handleChange} disabled />
              <TextField name="user.rsm_name" label="RSM Name" fullWidth margin="normal" value={formData.user.rsm_name} onChange={handleChange} disabled />
              <TextField name="user.nsm_name" label="NSM Name" fullWidth margin="normal" value={formData.user.nsm_name} onChange={handleChange} disabled />
              <TextField name="user.gpm_name" label="GPM Name" fullWidth margin="normal" value={formData.user.gpm_name} onChange={handleChange} disabled />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                <Button variant="outlined" onClick={handleCancel} disabled={loading}>Close</Button>
                <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
                  {loading ? <CircularProgress size={24} /> : 'Update'}
                </Button>
              </Box>
            </>
          )}
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

export default EditUserIncentiveModal;
