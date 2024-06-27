import React, { useEffect, useState } from 'react';
import axiosInstance from 'src/services/AxiosInterceptor';
import { Card, CardContent, Typography, Grid, Box, Alert, Backdrop, CircularProgress, Snackbar } from '@mui/material';
import { IoMailSharp } from 'react-icons/io5';
import { PiUsersFourFill } from 'react-icons/pi';
import { FaUserTie, FaUserMd, FaUserNurse, FaUserGraduate, FaUserCog } from 'react-icons/fa';

const Dashboard = () => {
  const [totalUserAndTemplates, setTotalUserAndTemplates] = useState({
    total_bo: "0",
    total_abm: "0",
    total_rsm: "0",
    total_nsm: "0",
    total_gpm: "0",
    total_templates: "0"
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsersAndTemplates = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('totalUserAndTemplates');
        console.log(response.data.total_user_and_templates);
        setTotalUserAndTemplates(response.data.total_user_and_templates);
      } catch (e) {
        console.error(e);
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchUsersAndTemplates();
  }, []);

  const totalUsers = [
    { label: 'Total BO', value: totalUserAndTemplates.total_bo, icon: <FaUserTie size={40} style={{ color: '#4CAF50' }} /> },
    { label: 'Total ABM', value: totalUserAndTemplates.total_abm, icon: <FaUserMd size={40} style={{ color: '#2196F3' }} /> },
    { label: 'Total RSM', value: totalUserAndTemplates.total_rsm, icon: <FaUserNurse size={40} style={{ color: '#FFC107' }} /> },
    { label: 'Total NSM', value: totalUserAndTemplates.total_nsm, icon: <FaUserGraduate size={40} style={{ color: '#E91E63' }} /> },
    { label: 'Total GPM', value: totalUserAndTemplates.total_gpm, icon: <FaUserCog size={40} style={{ color: '#9C27B0' }} /> }
  ];

  const calculateTotalUsers = () => {
    return totalUsers.reduce((sum, user) => sum + parseInt(user.value), 0);
  };

  return (
    <>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ minHeight: '100vh', py: 5 }}>
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={() => setError('')}
        >
          <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <Card sx={{ borderRadius: '15px', boxShadow: 5 }}>
              <CardContent>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item>
                    <IoMailSharp size={50} style={{ color: '#ff9800' }} />
                  </Grid>
                  <Grid item>
                    <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                      Total Email Templates
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                      {totalUserAndTemplates.total_templates}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card sx={{ borderRadius: '15px', boxShadow: 5 }}>
              <CardContent>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item>
                    <PiUsersFourFill size={50} style={{ color: '#4caf50' }} />
                  </Grid>
                  <Grid item>
                    <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                      Total Users
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                      {calculateTotalUsers()}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          {totalUsers.map((user, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card sx={{ borderRadius: '15px', boxShadow: 5, '&:hover': { boxShadow: 10 } }}>
                <CardContent>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item>
                      {user.icon}
                    </Grid>
                    <Grid item>
                      <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
                        {user.label}
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                        {user.value}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;
