import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import UploadUserWithTableModal from 'src/components/upload-excel-file/UploadUserWithTableModal'
import ManualUserWithTable from 'src/components/users-with-table/ManualUserWithTable'
import UserWithIncentiveTable from 'src/components/tables/UserWithIncentiveTable'
import axiosInstance from '../../services/AxiosInterceptor'

const Index = () => {
  const [isUploadModalOpen, setUploadModalOpen] = useState(false)
  const [isAddManuallyModalOpen, setAddManuallyModalOpen] = useState(false)
  const [userRole, setUserRole] = useState(null)
  const [rows, setRows] = useState([])

  useEffect(() => {
    const role = localStorage.getItem('role')
    if (role) {
      setUserRole(role)
    }
    fetchData();
  }, [])

  const fetchData = async() =>{
    try{
      const response = await axiosInstance.get("/alluserincentive") ;
      if (Array.isArray(response.data.users)) {
        setRows(response.data.users)
      } else {
        console.error('Expected array but received:', response.data)
        setRows([])
      }
    }catch(e){
      console.error(e);
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

  return (
    <>
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
