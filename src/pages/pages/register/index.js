// ** React Imports
import { useState } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import LinearProgress from '@mui/material/LinearProgress'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'

import axiosInstance from 'src/services/AxiosInterceptor'

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const RegisterPage = () => {
  // ** States
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    showPassword: false,
    showPasswordConfirmation: false
  })

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: ''
  })

  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState({ open: false, severity: '', message: '' })

  // ** Hook
  const theme = useTheme()
  const router = useRouter()

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleClickShowPasswordConfirmation = () => {
    setValues({ ...values, showPasswordConfirmation: !values.showPasswordConfirmation })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const validate = () => {
    let tempErrors = {}
    tempErrors.username = values.username ? '' : 'Username is required'
    tempErrors.email = values.email ? '' : 'Email is required'
    tempErrors.password = values.password ? '' : 'Password is required'
    tempErrors.password_confirmation = values.password_confirmation ? '' : 'Password confirmation is required'

    if (values.email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      tempErrors.email = emailPattern.test(values.email) ? '' : 'Email is not valid'
    }

    if (values.password && values.password_confirmation) {
      tempErrors.password_confirmation = values.password === values.password_confirmation ? '' : 'Passwords do not match'
    }

    setErrors(tempErrors)
    return Object.values(tempErrors).every(x => x === '')
  }

  const handleSubmit = async () => {
    if (validate()) {
      setLoading(true)
      try {
        const response = await axiosInstance.post('user/register', {
          name: values.username,
          email: values.email,
          password: values.password,
          'password_confirmation': values.password_confirmation
        })
        setLoading(false)
        setAlert({ open: true, severity: 'success', message: 'Registration successful!' })
        router.push('/pages/login')
      } catch (err) {
        setLoading(false)
        setAlert({ open: true, severity: 'error', message: 'Registration failed. Please try again.' })
        console.error(err)
      }
    }
  }

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false })
  }

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
              REGISTER YOURSELF
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Adventure starts here 🚀
            </Typography>
            <Typography variant='body2'>Make your management easy and fun!</Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
            <TextField
              autoFocus
              fullWidth
              id='username'
              label='Username'
              value={values.username}
              onChange={handleChange('username')}
              error={Boolean(errors.username)}
              helperText={errors.username}
              sx={{ marginBottom: 4 }}
            />
            <TextField
              fullWidth
              type='email'
              id='email'
              label='Email'
              value={values.email}
              onChange={handleChange('email')}
              error={Boolean(errors.email)}
              helperText={errors.email}
              sx={{ marginBottom: 4 }}
            />
            <FormControl fullWidth sx={{ marginBottom: 4 }}>
              <InputLabel htmlFor='auth-register-password'>Password</InputLabel>
              <OutlinedInput
                label='Password'
                value={values.password}
                id='auth-register-password'
                onChange={handleChange('password')}
                type={values.showPassword ? 'text' : 'password'}
                error={Boolean(errors.password)}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label='toggle password visibility'
                    >
                      {values.showPassword ? <EyeOutline fontSize='small' /> : <EyeOffOutline fontSize='small' />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {errors.password && (
                <Typography variant='body2' color='error' sx={{ mt: 1 }}>
                  {errors.password}
                </Typography>
              )}
            </FormControl>
            <FormControl fullWidth>
              <InputLabel htmlFor='auth-register-password-confirmation'>Confirm Password</InputLabel>
              <OutlinedInput
                label='Confirm Password'
                value={values.password_confirmation}
                id='auth-register-password-confirmation'
                onChange={handleChange('password_confirmation')}
                type={values.showPasswordConfirmation ? 'text' : 'password'}
                error={Boolean(errors.password_confirmation)}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowPasswordConfirmation}
                      onMouseDown={handleMouseDownPassword}
                      aria-label='toggle password visibility'
                    >
                      {values.showPasswordConfirmation ? <EyeOutline fontSize='small' /> : <EyeOffOutline fontSize='small' />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {errors.password_confirmation && (
                <Typography variant='body2' color='error' sx={{ mt: 1 }}>
                  {errors.password_confirmation}
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
              Sign up
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography variant='body2' sx={{ marginRight: 2 }}>
                Already have an account?
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
  )
}

RegisterPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default RegisterPage
