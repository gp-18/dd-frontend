import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Button, TextField, Box } from '@mui/material';

const TemplateEditor = ({ onSave, onCancel }) => {
  const editorRef = useRef(null);
  const [templateName, setTemplateName] = useState('');
  const [nameError, setNameError] = useState(false);

  const handleSave = () => {
    if (!templateName.trim()) {
      setNameError(true);
      return;
    }
    setNameError(false);
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      onSave(templateName, content);
      onCancel();
    }
  };

  return (
    <Box sx={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <TextField
        label="Template Name"
        placeholder="Enter template name"
        value={templateName}
        onChange={(e) => setTemplateName(e.target.value)}
        error={nameError}
        helperText={nameError ? 'Template name is required' : ''}
        fullWidth
        variant="outlined"
        sx={{ marginBottom: '20px' }}
      />
      <Editor
        apiKey='7z0egkg21c0y46rdlphm26xfw274s87t0rstd27uj4ylagwm'
        onInit={(_evt, editor) => (editorRef.current = editor)}
        initialValue='<p>Create Your Mail Template Here</p>'
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'code',
            'help',
            'wordcount',
            'table', 
            'image'  
          ],
          toolbar:
            'undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | table | image | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          image_title: true, 
          automatic_uploads: true,
          file_picker_types: 'image',
          file_picker_callback: (cb, value, meta) => {
            if (meta.filetype === 'image') {
              const input = document.createElement('input');
              input.setAttribute('type', 'file');
              input.setAttribute('accept', 'image/*');

              input.onchange = function () {
                const file = this.files[0];
                const reader = new FileReader();
                reader.onload = function () {
                  const id = 'blobid' + (new Date()).getTime();
                  const blobCache = editorRef.current.editorUpload.blobCache;
                  const base64 = reader.result.split(',')[1];
                  const blobInfo = blobCache.create(id, file, base64);
                  blobCache.add(blobInfo);
                  cb(blobInfo.blobUri(), { title: file.name });
                };
                reader.readAsDataURL(file);
              };

              input.click();
            }
          }
        }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
        <Button 
          variant="contained" 
          color="success"  
          onClick={handleSave} 
          sx={{ marginRight: '10px' }}
        >
          Save
        </Button>
        <Button 
          variant="outlined" 
          color="error" 
          onClick={onCancel}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default TemplateEditor;
