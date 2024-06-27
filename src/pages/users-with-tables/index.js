import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import UploadUserWithTableModal from 'src/components/upload-excel-file/UploadUserWithTableModal'
import ManualUserWithTable from 'src/components/users-with-table/ManualUserWithTable'
import UserWithIncentiveTable from 'src/components/tables/UserWithIncentiveTable'
import axiosInstance from '../../services/AxiosInterceptor'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

const Index = () => {
  const [isUploadModalOpen, setUploadModalOpen] = useState(false)
  const [isAddManuallyModalOpen, setAddManuallyModalOpen] = useState(false)
  const [userRole, setUserRole] = useState(null)
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState('success')

  useEffect(() => {
    const role = localStorage.getItem('role')
    if (role) {
      setUserRole(role)
    }
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await axiosInstance.get("/alluserincentive")
      if (Array.isArray(response.data.users)) {
        setRows(response.data.users)
      } else {
        console.error('Expected array but received:', response.data)
        setRows([])
      }
    } catch (e) {
      console.error(e)
      setSnackbarOpen(true)
      setSnackbarMessage('Error fetching data')
      setSnackbarSeverity('error')
    } finally {
      setLoading(false)
    }
  }

  const handleUploadClick = () => {
    setUploadModalOpen(true)
  }

  const handleAddManuallyClick = () => {
    setAddManuallyModalOpen(true)
  }

  const handleCloseUploadModal = () => {
    setUploadModalOpen(false)
  }

  const handleCloseAddManuallyModal = () => {
    setAddManuallyModalOpen(false)
  }

  const handleDataAdded = () => {
    fetchData()
  }

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackbarOpen(false)
  }

  return (
    <>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MuiAlert elevation={6} variant='filled' onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {userRole === 'A' && (
        <div style={{ marginBottom: '10px' }}>
          <Button variant='contained' onClick={handleUploadClick} style={{ marginRight: '10px' }}>
            Upload Excel File
          </Button>
          <Button variant='outlined' onClick={handleAddManuallyClick}>
            Add Manually
          </Button>
        </div>
      )}

      <UserWithIncentiveTable userRole={userRole} rows={rows} onDataAdded={handleDataAdded} />

      <UploadUserWithTableModal open={isUploadModalOpen} onClose={handleCloseUploadModal} onDataAdded={handleDataAdded} />
      <ManualUserWithTable open={isAddManuallyModalOpen} onClose={handleCloseAddManuallyModal} onDataAdded={handleDataAdded} />
    </>
  )
}

export default Index
