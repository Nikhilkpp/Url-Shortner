import React, { useState } from 'react';
import { shortenUrl } from '../services/api';
import { Box, TextField, Button, Typography, Alert, Snackbar } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const UrlForm = () => {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Basic URL validation
  const validateUrl = (value) => {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i');
    return !!pattern.test(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setShortUrl('');

    if (!validateUrl(url)) {
      setError('Please enter a valid URL.');
      return;
    }

    setLoading(true);
    try {
      const res = await shortenUrl(url);
      setShortUrl(res.data.shortUrl);
    } catch (err) {
      setError('Failed to shorten URL. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(`${import.meta.env.VITE_FRONTEND_URI}/${shortUrl}`);
      setCopySuccess(true);
    }
  };

  const handleCloseSnackbar = () => {
    setCopySuccess(false);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 500, m: 4, mx: 'auto', p: 3, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper' }}
    >
      <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', color: '#1976d2' }}>
        URL Shortener
      </Typography>

      <TextField
        label="Enter URL"
        type="url"
        fullWidth
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://example.com"
        required
        error={!!error}
        helperText={error}
        disabled={loading}
        margin="normal"
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={loading}
        sx={{ mt: 2, mb: 2 }}
      >
        {loading ? 'Shortening...' : 'Shorten'}
      </Button>

      {shortUrl && (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: '#e3f2fd', px: 2, py: 1, borderRadius: 1 }}>
          <Typography sx={{ wordBreak: 'break-all', color: '#0d47a1' }}>
            <a href={`/${shortUrl}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
              {shortUrl}
            </a>
          </Typography>
          <Button onClick={handleCopy} color="primary" startIcon={<ContentCopyIcon />} size="small">
            Copy
          </Button>
        </Box>
      )}

      <Snackbar
        open={copySuccess}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        message="Copied to clipboard"
      />
    </Box>
  );
};

export default UrlForm;
