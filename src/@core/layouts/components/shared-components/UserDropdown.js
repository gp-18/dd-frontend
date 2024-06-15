// ** React Imports
import { useState, Fragment, useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Icons Imports
import CogOutline from 'mdi-material-ui/CogOutline'
import LogoutVariant from 'mdi-material-ui/LogoutVariant'

import axiosInstance from 'src/services/AxiosInterceptor'
import { ConsoleLine } from 'mdi-material-ui'

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const UserDropdown = () => {
  // ** States
  const [anchorEl, setAnchorEl] = useState(null)
  const [userData, setUserData] = useState({ name: '', role: '' })

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    const data = localStorage.getItem('userData')
    if (data) {
      setUserData(JSON.parse(data))
    }
  }, [])

  const handleDropdownOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = url => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }

  const styles = {
    py: 2,
    px: 4,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'text.primary',
    textDecoration: 'none',
    '& svg': {
      fontSize: '1.375rem',
      color: 'text.secondary'
    }
  }

  const handleChangePassword = () => {
    router.push('/pages/changePassword')
  }

  const handlelogout = () => {
    try {
      const token = localStorage.getItem('token')
      if (token) {
        axiosInstance
          .post('user/logout')
          .then(res => {
            localStorage.removeItem('token')
            localStorage.removeItem('userData')
            router.push('/pages/login')
          })
          .catch(err => {
            console.error(err)
          })
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Fragment>
      <Avatar
        alt={userData.name}
        onClick={handleDropdownOpen}
        sx={{ width: 40, height: 40 }}
        src={userData.avatar || '/images/avatars/1.png'}
      />

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { width: 230, marginTop: 4 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box sx={{ pt: 2, pb: 3, px: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Badge
              overlap='circular'
              badgeContent={<BadgeContentSpan />}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
              <Avatar
                alt='user'
                src={userData.avatar || '/images/avatars/1.png'}
                sx={{ width: '2.5rem', height: '2.5rem' }}
              />
            </Badge>
            <Box sx={{ display: 'flex', marginLeft: 3, alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography sx={{ fontWeight: 600 }}>{userData.name}</Typography>
              <Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.disabled' }}>
                {userData.role === 'A' ? 'Admin' : 'User'}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider />
        <MenuItem sx={{ p: 0 }} onClick={handleChangePassword}>
          <Box sx={styles}>
            <CogOutline sx={{ marginRight: 2 }} />
            Change Password
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem sx={{ py: 2 }} onClick={handlelogout}>
          <LogoutVariant sx={{ marginRight: 2, fontSize: '1.375rem', color: 'text.secondary' }} />
          Logout
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default UserDropdown
