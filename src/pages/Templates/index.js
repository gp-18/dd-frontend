import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import TemplateEditor from 'src/components/quill-template/TemplateEditior'
import axiosInstance from 'src/services/AxiosInterceptor'
import { Card, CardContent, Typography, Grid } from '@mui/material'

const Index = () => {
  const [showEditor, setShowEditor] = useState(false)
  const [savedContent, setSavedContent] = useState('')
  const [templateName, setTemplateName] = useState('')
  const [recipientEmail, setRecipientEmail] = useState('')
  const [templates, setTemplates] = useState([])
  const [openDialog, setOpenDialog] = useState(false)
  const [dialogTitle, setDialogTitle] = useState('')
  const [dialogContent, setDialogContent] = useState('')
  const [role, setRole] = useState('')

  useEffect(() => {
    const userRole = localStorage.getItem('role')
    if (userRole) {
      setRole(userRole)
    }
    fetchTemplates()
  }, [])

  const handleOpenDialog = (template) => {
    setDialogTitle(template.name)
    setDialogContent(template.content)
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleDeleteTemplate = async (id) => {
    try {
      await axiosInstance.delete(`/templates/${id}`)
      setTemplates(templates.filter(template => template.id !== id))
    } catch (error) {
      console.error('Error deleting template:', error)
    }
  }

  const fetchTemplates = async () => {
    try {
      const response = await axiosInstance.get('/templates')
      setTemplates(response.data)
    } catch (error) {
      console.error('Error fetching templates:', error)
    }
  }

  const handleCreateTemplate = () => {
    setShowEditor(true)
  }

  const handleCancel = () => {
    setShowEditor(false)
  }

  const handleSaveTemplate = async (name, content) => {
    try {
      const response = await axiosInstance.post('/templates', {
        name,
        content
      })
      setTemplates([...templates, response.data])
      setTemplateName('')
      setSavedContent('')
      setShowEditor(false)
    } catch (error) {
      console.error('Error saving template:', error)
    }
  }

  const handleSendEmail = async () => {
    try {
      const response = await axiosInstance.post('/send-mail-template', {
        templateName,
        templateContent: savedContent,
        recipientEmail
      })
      console.log(response.data.message)
    } catch (error) {
      console.error('Error sending email:', error)
    }
  }

  return (
    <>
      <h1>Email Templates</h1>
      {role === 'A' && !showEditor && (
        <Button variant='contained' onClick={handleCreateTemplate} style={{ marginBottom: '20px' }}>
          Create Template
        </Button>
      )}
      {showEditor && (
        <TemplateEditor onSave={handleSaveTemplate} onCancel={handleCancel} />
      )}
      <Grid container spacing={3}>
        {templates.map(template => {
          const wordCount = template.content.split(' ').length
          const previewContent =
            wordCount > 30 ? template.content.split(' ').slice(0, 30).join(' ') + '...' : template.content
          return (
            <Grid item xs={12} sm={6} md={4} key={template.id}>
              <Card style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <CardContent>
                  <Typography variant='h5' component='div' gutterBottom>
                    {template.name}
                  </Typography>
                  <Typography variant='body2' color='textSecondary' dangerouslySetInnerHTML={{ __html: previewContent }} />
                  <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                    {wordCount > 30 && (
                      <Button variant='contained' color='primary' onClick={() => handleOpenDialog(template)} style={{ marginRight: '10px' }}>
                        Read More
                      </Button>
                    )}
                    {role === 'A' && (
                      <Button variant='contained' color='error' onClick={() => handleDeleteTemplate(template.id)}>
                        Delete
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Grid>
          )
        })}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby='dialog-title'>
        <DialogTitle id='dialog-title'>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText dangerouslySetInnerHTML={{ __html: dialogContent }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color='primary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Index
