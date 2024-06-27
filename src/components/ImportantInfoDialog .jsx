import React from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material'

const ImportantInfoDialog = ({ open, handleClose }) => {
  const files = [
    { name: 'Users With Managers Excel File', url: "ExcelFiles/users-with-managers" },
    { name: 'Users With Incentives Excel File', url: "ExcelFiles/users-with-incentives" }
  ]

  const handleView = (url) => {
    window.open(url, '_blank')
  }

  const handleDownload = (url) => {
    const link = document.createElement('a')
    link.href = url
    link.download = url.split('/').pop()
    link.click()
  }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="important-info-dialog-title">
      <DialogTitle id="important-info-dialog-title">Important Information</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Points that needs to be taken care of 
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Files:
        </Typography>
        {files.map((file, index) => (
          <div key={index} style={{ marginTop: '10px' }}>
            <Typography variant="body1">{file.name}</Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleView(file.url)}
              sx={{ mr: 1 }}
            >
              View
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleDownload(file.url)}
            >
              Download
            </Button>
          </div>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ImportantInfoDialog
