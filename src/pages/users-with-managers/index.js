import React, { useState, useEffect } from 'react'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import UploadExcelFile from '../../components/upload-excel-file/UploadExcelFile'
import UserWithManagerTable from 'src/components/tables/UserWithManagerTable'
import axiosInstance from '../../services/AxiosInterceptor'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import Backdrop from '@mui/material/Backdrop'

const Index = () => {
  const [openFileDialog, setOpenFileDialog] = useState(false)
  const [openManualDialog, setOpenManualDialog] = useState(false)
  const [manualData, setManualData] = useState({
    bo_name: '',
    bo_email: '',
    abm_name: '',
    abm_email: '',
    rsm_name: '',
    rsm_email: '',
    nsm_name: '',
    nsm_email: '',
    gpm_name: '',
    gpm_email: ''
  })
  const [rows, setRows] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [role, setRole] = useState('')
  const [editUserId, setEditUserId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState('success')
  const [selected, setSelected] = useState([])
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const storedRole = localStorage.getItem('role')
    setRole(storedRole)
    fetchTableData()
  }, [page, rowsPerPage])

  const fetchTableData = async () => {
    try {
      setLoading(true)
      const response = await axiosInstance.get(`allusers?page=${page + 1}&per_page=${rowsPerPage}`)
      if (Array.isArray(response.data.users)) {
        setRows(response.data.users)
      } else {
        console.error('Expected array but received:', response.data)
        setRows([])
      }
    } catch (error) {
      console.error('Error fetching table data:', error)
      setSnackbarOpen(true)
      setSnackbarMessage('Error fetching table data')
      setSnackbarSeverity('error')
    } finally {
      setLoading(false)
    }
  }

  const handleFileClickOpen = () => {
    setOpenFileDialog(true)
  }

  const handleManualClickOpen = () => {
    resetManualData()
    setOpenManualDialog(true)
  }

  const handleCloseManualDialog = () => {
    resetManualData()
    setOpenManualDialog(false)
  }

  const resetManualData = () => {
    setManualData({
      bo_name: '',
      bo_email: '',
      abm_name: '',
      abm_email: '',
      rsm_name: '',
      rsm_email: '',
      nsm_name: '',
      nsm_email: '',
      gpm_name: '',
      gpm_email: ''
    })
    setEditUserId(null)
    setErrors({})
  }

  const handleManualChange = event => {
    const { name, value } = event.target
    setManualData({
      ...manualData,
      [name]: value
    })
  }

  const handleManualSubmit = async () => {
    if (!isManualDataValid()) {
      return
    }

    try {
      setLoading(true)
      if (editUserId) {
        await axiosInstance.post(`user/update/${editUserId}`, manualData)
      } else {
        await axiosInstance.post('user/store/manual', manualData)
      }
      fetchTableData()
      handleCloseManualDialog()
      setSnackbarOpen(true)
      setSnackbarMessage(`${editUserId ? 'User updated' : 'User added'} successfully`)
      setSnackbarSeverity('success')
    } catch (error) {
      console.error('Error submitting manual data:', error)
      setSnackbarOpen(true)
      setSnackbarMessage('Error occurred while submitting user data')
      setSnackbarSeverity('error')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = async id => {
    try {
      const response = await axiosInstance.get(`user/show/${id}`)
      const userData = response.data.user
      setManualData(userData)
      setOpenManualDialog(true)
      setEditUserId(id)
    } catch (error) {
      console.error('Error fetching user data for edit:', error)
    }
  }

  const handleDelete = async id => {
    try {
      setLoading(true)
      await axiosInstance.delete(`user/delete/${id}?force_delete=1`)
      fetchTableData()
      setSnackbarOpen(true)
      setSnackbarMessage('User deleted successfully')
      setSnackbarSeverity('success')
    } catch (error) {
      console.error('Error deleting user:', error)
      setSnackbarOpen(true)
      setSnackbarMessage('Error occurred while deleting user')
      setSnackbarSeverity('error')
    } finally {
      setLoading(false)
    }
  }

  const isManualDataValid = () => {
    const newErrors = {}
    let valid = true

    if (!validateName(manualData.bo_name)) {
      newErrors.bo_name = 'Invalid name'
      valid = false
    }
    if (!validateName(manualData.abm_name)) {
      newErrors.abm_name = 'Invalid name'
      valid = false
    }
    if (!validateName(manualData.rsm_name)) {
      newErrors.rsm_name = 'Invalid name'
      valid = false
    }
    if (!validateName(manualData.nsm_name)) {
      newErrors.nsm_name = 'Invalid name'
      valid = false
    }
    if (!validateName(manualData.gpm_name)) {
      newErrors.gpm_name = 'Invalid name'
      valid = false
    }
    if (!validateEmail(manualData.bo_email)) {
      newErrors.bo_email = 'Invalid email'
      valid = false
    }
    if (!validateEmail(manualData.abm_email)) {
      newErrors.abm_email = 'Invalid email'
      valid = false
    }
    if (!validateEmail(manualData.rsm_email)) {
      newErrors.rsm_email = 'Invalid email'
      valid = false
    }
    if (!validateEmail(manualData.nsm_email)) {
      newErrors.nsm_email = 'Invalid email'
      valid = false
    }
    if (!validateEmail(manualData.gpm_email)) {
      newErrors.gpm_email = 'Invalid email'
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const validateName = name => {
    const re = /^[a-zA-Z\s]+$/
    return re.test(name)
  }

  const validateEmail = email => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.id)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1))
    }

    setSelected(newSelected)
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

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          {role === 'A' ? (
            <Stack direction='row' spacing={2}>
              <Button variant='contained' color='primary' onClick={handleFileClickOpen}>
                Upload Excel
              </Button>
              <Button variant='outlined' color='primary' onClick={handleManualClickOpen}>
                Add Manually
              </Button>
            </Stack>
          ) : null}
        </Box>
      )}

      <UploadExcelFile open={openFileDialog} onClose={() => setOpenFileDialog(false)} fetchTableData={fetchTableData} />

      <UserWithManagerTable
        rows={rows}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleSelectAllClick={handleSelectAllClick}
        handleClick={handleClick}
        selected={selected}
        role={role}
      />

      <Dialog open={openManualDialog} onClose={handleCloseManualDialog} maxWidth='sm' fullWidth>
        <DialogTitle>{editUserId ? 'Edit User' : 'Add User'}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} mt={1}>
            <TextField
              name='bo_name'
              label='BO Name'
              value={manualData.bo_name}
              onChange={handleManualChange}
              fullWidth
              error={Boolean(errors.bo_name)}
              helperText={errors.bo_name}
            />
            <TextField
              name='bo_email'
              label='BO Email'
              value={manualData.bo_email}
              onChange={handleManualChange}
              fullWidth
              error={Boolean(errors.bo_email)}
              helperText={errors.bo_email}
            />
            <TextField
              name='abm_name'
              label='ABM Name'
              value={manualData.abm_name}
              onChange={handleManualChange}
              fullWidth
              error={Boolean(errors.abm_name)}
              helperText={errors.abm_name}
            />
            <TextField
              name='abm_email'
              label='ABM Email'
              value={manualData.abm_email}
              onChange={handleManualChange}
              fullWidth
              error={Boolean(errors.abm_email)}
              helperText={errors.abm_email}
            />
            <TextField
              name='rsm_name'
              label='RSM Name'
              value={manualData.rsm_name}
              onChange={handleManualChange}
              fullWidth
              error={Boolean(errors.rsm_name)}
              helperText={errors.rsm_name}
            />
            <TextField
              name='rsm_email'
              label='RSM Email'
              value={manualData.rsm_email}
              onChange={handleManualChange}
              fullWidth
              error={Boolean(errors.rsm_email)}
              helperText={errors.rsm_email}
            />
            <TextField
              name='nsm_name'
              label='NSM Name'
              value={manualData.nsm_name}
              onChange={handleManualChange}
              fullWidth
              error={Boolean(errors.nsm_name)}
              helperText={errors.nsm_name}
            />
            <TextField
              name='nsm_email'
              label='NSM Email'
              value={manualData.nsm_email}
              onChange={handleManualChange}
              fullWidth
              error={Boolean(errors.nsm_email)}
              helperText={errors.nsm_email}
            />
            <TextField
              name='gpm_name'
              label='GPM Name'
              value={manualData.gpm_name}
              onChange={handleManualChange}
              fullWidth
              error={Boolean(errors.gpm_name)}
              helperText={errors.gpm_name}
            />
            <TextField
              name='gpm_email'
              label='GPM Email'
              value={manualData.gpm_email}
              onChange={handleManualChange}
              fullWidth
              error={Boolean(errors.gpm_email)}
              helperText={errors.gpm_email}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseManualDialog}>Cancel</Button>
          <Button onClick={handleManualSubmit} variant='contained' color='success'>
            {editUserId ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Index
