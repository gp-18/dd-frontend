import React, { useState } from 'react'
import Button from '@mui/material/Button'
import TemplateEditor from 'src/components/quill-template/TemplateEditior'
import axiosInstance from 'src/services/AxiosInterceptor'

const Index = () => {
  const [showEditor, setShowEditor] = useState(false)
  const [savedContent, setSavedContent] = useState('')
  const [templateName, setTemplateName] = useState('')
  const [recipientEmail, setRecipientEmail] = useState('')

  const handleCreateTemplate = () => {
    setShowEditor(true)
  }

  const handleCancel = () => {
    setShowEditor(false)
  }

  const handleSaveTemplate = (name, content) => {
    console.log('Saved template content:', content)
    setTemplateName(name)
    setSavedContent(content)
    setShowEditor(false)
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
      <h1>Email Template Creator</h1>
      {!showEditor ? (
        <Button variant='contained' onClick={handleCreateTemplate}>
          Create Template
        </Button>
      ) : (
        <TemplateEditor onSave={handleSaveTemplate} onCancel={handleCancel} />
      )}
      {savedContent && (
        <div>
          <h2>Saved Template Content:</h2>
          <div dangerouslySetInnerHTML={{ __html: savedContent }} />
          <input
            type="email"
            placeholder="Enter recipient email"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            style={{ marginBottom: '10px', padding: '5px', width: '100%' }}
          />
          <Button variant='contained' color='primary' onClick={handleSendEmail}>
            Send Email
          </Button>
        </div>
      )}
    </>
  )
}

export default Index
