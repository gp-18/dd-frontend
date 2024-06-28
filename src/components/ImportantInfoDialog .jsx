import React from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material'

const ImportantInfoDialog = ({ open, handleClose }) => {
  // Using the environment variable for the link, uncomment if you prefer using it
  // const link = process.env.REACT_APP_BACKEND_STORAGE_PATH;

  // For now, using a hardcoded link
  const link = 'http://127.0.0.1:8000/storage/'
  const files = [
    {
      name: 'Users With Managers Excel File',
      url: `${link}users-with-managers.xlsx`,
      openUrl: `${link}userManagers.png`
    },
    {
      name: 'Users With Incentives Excel File',
      url: `${link}users-with-incentives.xlsx`,
      openUrl: `${link}userIncentive.png`
    },
    {
      name: 'Naming Conventions In Mails',
      url: `${link}naming-convention-in-mail.docx`,
      openUrl: `${link}namingConvention.png`
    }
  ]

  const handleView = openUrl => {
    window.open(openUrl, '_blank')
  }

  const handleDownload = url => {
    const link = document.createElement('a')
    link.href = url
    link.download = url.split('/').pop()
    link.click()
  }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby='important-info-dialog-title'>
      <DialogTitle id='important-info-dialog-title'>Important Information</DialogTitle>
      <DialogContent>
        <Typography variant='body1' style={{ color: 'red' }}>
          Points that needs to be taken care of
        </Typography>
        <Typography variant='h6' sx={{ mt: 2 }}>
          Files
        </Typography>
        {files.map((file, index) => (
          <div key={index} style={{ marginTop: '10px' }}>
            <Typography variant='body1'>{file.name}</Typography>
            <Button variant='contained' color='primary' onClick={() => handleView(file.openUrl)} sx={{ mr: 1 }}>
              View
            </Button>
            <Button variant='outlined' color='success' onClick={() => handleDownload(file.url)}>
              Download
            </Button>
          </div>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='error'>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ImportantInfoDialog
