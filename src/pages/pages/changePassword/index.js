// ** React Imports
import { useState } from 'react';

// ** Next Imports
import Link from 'next/link';
import { useRouter } from 'next/router';

// ** MUI Components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled, useTheme } from '@mui/material/styles';
import MuiCard from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline';
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline';

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout';

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration';

import axiosInstance from 'src/services/AxiosInterceptor';

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}));

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}));

const ChangePasswordPage = () => {
  // ** States
  const [values, setValues] = useState({
    current_password: '',
    new_password: '',
    new_password_confirmation: '',
    showCurrentPassword: false,
    showNewPassword: false,
    showNewPasswordConfirmation: false
  });

  const [errors, setErrors] = useState({
    current_password: '',
    new_password: '',
    new_password_confirmation: ''
  });

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, severity: '', message: '' });

  // ** Hook
  const theme = useTheme();
  const router = useRouter();

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = field => () => {
    setValues({ ...values, [field]: !values[field] });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.current_password = values.current_password ? '' : 'Current password is required';
    tempErrors.new_password = values.new_password ? '' : 'New password is required';
    tempErrors.new_password_confirmation = values.new_password_confirmation ? '' : 'New password confirmation is required';

    if (values.new_password && values.new_password_confirmation) {
      tempErrors.new_password_confirmation = values.new_password === values.new_password_confirmation ? '' : 'Passwords do not match';
    }

    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === '');
  };

  const handleSubmit = async () => {
    if (validate()) {
      setLoading(true);
      try {
        const response = await axiosInstance.post('user/changepassword', {
          current_password: values.current_password,
          new_password: values.new_password,
          new_password_confirmation: values.new_password_confirmation
        });
        setLoading(false);
        setAlert({ open: true, severity: 'success', message: 'Password change successful!' });
        router.push('/pages/login');
      } catch (err) {
        setLoading(false);
        setAlert({ open: true, severity: 'error', message: 'Password change failed. Please try again.' });
        console.error(err);
      }
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <Box className='content-center'>
      {loading && <LinearProgress />}
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography
              variant='h6'
              sx={{
                ml: 3,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '1.5rem !important'
              }}
            >
              CHANGE PASSWORD
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Secure your account 🔒
            </Typography>
            <Typography variant='body2'>Change your password to keep your account secure.</Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
            <FormControl fullWidth sx={{ marginBottom: 4 }}>
              <InputLabel htmlFor='current-password'>Current Password</InputLabel>
              <OutlinedInput
                label='Current Password'
                value={values.current_password}
                id='current-password'
                onChange={handleChange('current_password')}
                type={values.showCurrentPassword ? 'text' : 'password'}
                error={Boolean(errors.current_password)}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowPassword('showCurrentPassword')}
                      onMouseDown={handleMouseDownPassword}
                      aria-label='toggle password visibility'
                    >
                      {values.showCurrentPassword ? <EyeOutline fontSize='small' /> : <EyeOffOutline fontSize='small' />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {errors.current_password && (
                <Typography variant='body2' color='error' sx={{ mt: 1 }}>
                  {errors.current_password}
                </Typography>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 4 }}>
              <InputLabel htmlFor='new-password'>New Password</InputLabel>
              <OutlinedInput
                label='New Password'
                value={values.new_password}
                id='new-password'
                onChange={handleChange('new_password')}
                type={values.showNewPassword ? 'text' : 'password'}
                error={Boolean(errors.new_password)}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowPassword('showNewPassword')}
                      onMouseDown={handleMouseDownPassword}
                      aria-label='toggle password visibility'
                    >
                      {values.showNewPassword ? <EyeOutline fontSize='small' /> : <EyeOffOutline fontSize='small' />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {errors.new_password && (
                <Typography variant='body2' color='error' sx={{ mt: 1 }}>
                  {errors.new_password}
                </Typography>
              )}
            </FormControl>
            <FormControl fullWidth>
              <InputLabel htmlFor='new-password-confirmation'>Confirm New Password</InputLabel>
              <OutlinedInput
                label='Confirm New Password'
                value={values.new_password_confirmation}
                id='new-password-confirmation'
                onChange={handleChange('new_password_confirmation')}
                type={values.showNewPasswordConfirmation ? 'text' : 'password'}
                error={Boolean(errors.new_password_confirmation)}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowPassword('showNewPasswordConfirmation')}
                      onMouseDown={handleMouseDownPassword}
                      aria-label='toggle password visibility'
                    >
                      {values.showNewPasswordConfirmation ? <EyeOutline fontSize='small' /> : <EyeOffOutline fontSize='small' />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {errors.new_password_confirmation && (
                <Typography variant='body2' color='error' sx={{ mt: 1 }}>
                  {errors.new_password_confirmation}
                </Typography>
              )}
            </FormControl>
            <Button
              fullWidth
              size='large'
              type='submit'
              variant='contained'
              onClick={handleSubmit}
              sx={{ marginBottom: 7, marginTop: 2 }}
              disabled={loading}
            >
              Change Password
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography variant='body2' sx={{ marginRight: 2 }}>
                Remembered your password?
              </Typography>
              <Typography variant='body2'>
                <Link passHref href='/pages/login'>
                  <LinkStyled>Sign in instead</LinkStyled>
                </Link>
              </Typography>
            </Box>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
      <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

ChangePasswordPage.getLayout = page => <BlankLayout>{page}</BlankLayout>;

export default ChangePasswordPage;
