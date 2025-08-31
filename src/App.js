import React, { useState, useEffect } from 'react';
import { Button, TextField, Container, Box, Switch, Typography, Card } from '@mui/material';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Modern MUI theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#00bcd4' },
    background: { default: '#121212', paper: '#1e1e1e' },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    h1: { fontWeight: 700, fontSize: '3rem' },
    h2: { fontWeight: 600, fontSize: '2.5rem' },
    body1: { fontWeight: 400, fontSize: '1rem' },
  },
});

function App({ darkMode, setDarkMode }) {
  const [prompt, setPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [history, setHistory] = useState([]);
  const [bgColor, setBgColor] = useState(darkMode ? '#333' : '#f0f0f0');
  const [textColor, setTextColor] = useState(darkMode ? '#fff' : '#111');
  const [error, setError] = useState(''); // ✅ error state

  // Load history from localStorage
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('history')) || [];
    setHistory(savedHistory);
  }, []);

  // ✅ Updated handleGenerate with validation
  const handleGenerate = (customPrompt) => {
    const finalPrompt = customPrompt || prompt;

    if (!finalPrompt || finalPrompt.trim().length < 3) {
      setError('Please enter at least 3 characters to describe your UI.');
      return;
    }

    setError(''); // clear error if valid

    const generated = `<div style={{ padding: "20px", backgroundColor: "${bgColor}", color: "${textColor}" }}>
      <h1>${finalPrompt}</h1>
    </div>`;

    setGeneratedCode(generated);

    const newHistory = [finalPrompt, ...history];
    setHistory(newHistory);
    localStorage.setItem('history', JSON.stringify(newHistory));
  };

  const copyToClipboard = () => {
    if (!generatedCode) return;
    navigator.clipboard.writeText(generatedCode);
  };

  const downloadJSX = () => {
    if (!generatedCode) return;
    const blob = new Blob([generatedCode], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'GeneratedComponent.js';
    a.click();
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        sx={{
          mt: 4,
          fontFamily: 'Inter, sans-serif',
          minHeight: '100vh',
          background: darkMode
            ? 'linear-gradient(135deg, #1e1e1e, #2c2c2c)'
            : 'linear-gradient(135deg, #f9f9f9, #e6e6e6)',
          transition: 'all 0.3s ease',
          paddingBottom: 4,
        }}
      >

        {/* Hero Section */}
        <Box
          sx={{
            height: '180px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            color: darkMode ? 'white' : '#111',
            mb: 4,
            transition: 'all 0.3s ease'
          }}
        >
          <Typography variant="h1" sx={{ color: darkMode ? '#fff' : '#111' }}>AI UI Generator</Typography>
          <Typography variant="body1" sx={{ mt: 1, color: darkMode ? '#ccc' : '#333' }}>
            Generate modern UI components instantly
          </Typography>
        </Box>

        {/* Header with Dark Mode Toggle */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4" fontWeight="bold" sx={{ color: darkMode ? '#fff' : '#111' }}>AI UI Generator</Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography sx={{ color: darkMode ? '#fff' : '#111' }}>Dark Mode</Typography>
            <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
          </Box>
        </Box>

        {/* Input Card */}
        <Card sx={{
          mt: 2, p: 3, borderRadius: 3, boxShadow: 3,
          background: darkMode ? '#2b2b2b' : '#fff',
          transition: 'all 0.3s ease',
          '&:hover': { transform: 'translateY(-5px)', boxShadow: 6 }
        }}>
          <TextField
            fullWidth
            label="Describe your UI"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            sx={{ input: { color: darkMode ? '#fff' : '#111' }, label: { color: darkMode ? '#ccc' : '#333' } }}
          />
          {/* ✅ Error Message */}
          {error && <Typography sx={{ color: 'red', mt: 1 }}>{error}</Typography>}

          <Box mt={2} display="flex" gap={2} flexWrap="wrap">
            <Button
              variant="contained"
              sx={{
                borderRadius: 2, boxShadow: 3, textTransform: 'none',
                fontWeight: 600, background: darkMode ? '#4f9cff' : '#1976d2',
                transition: '0.3s',
                '&:hover': { background: darkMode ? '#6faeff' : '#1565c0', transform: 'scale(1.05)' }
              }}
              onClick={() => handleGenerate()}
            >
              Generate UI
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderRadius: 2, boxShadow: 1, textTransform: 'none', fontWeight: 500,
                color: darkMode ? '#fff' : '#111',
                borderColor: darkMode ? '#555' : '#ccc',
                '&:hover': { transform: 'scale(1.05)', boxShadow: 3 }
              }}
              onClick={copyToClipboard}
            >
              Copy JSX
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderRadius: 2, boxShadow: 1, textTransform: 'none', fontWeight: 500,
                color: darkMode ? '#fff' : '#111',
                borderColor: darkMode ? '#555' : '#ccc',
                '&:hover': { transform: 'scale(1.05)', boxShadow: 3 }
              }}
              onClick={downloadJSX}
            >
              Export JSX
            </Button>
          </Box>

          {/* Color Pickers */}
          <Box mt={2} display="flex" alignItems="center" gap={2}>
            <Typography fontWeight={500} sx={{ color: darkMode ? '#fff' : '#111' }}>Background:</Typography>
            <TextField
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              sx={{ width: 50, height: 40, borderRadius: 1 }}
            />
            <Typography fontWeight={500} sx={{ color: darkMode ? '#fff' : '#111' }}>Text:</Typography>
            <TextField
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              sx={{ width: 50, height: 40, borderRadius: 1 }}
            />
          </Box>
        </Card>

        {/* Live Preview Card */}
        <Card sx={{
          mt: 4, p: 3, borderRadius: 3, boxShadow: 3,
          background: darkMode ? '#1f1f1f' : '#fafafa',
          transition: 'all 0.3s ease',
          '&:hover': { transform: 'translateY(-3px)', boxShadow: 6 }
        }}>
          <Typography variant="h6" sx={{ color: darkMode ? '#ccc' : '#333' }}>Generated JSX:</Typography>
          <LiveProvider code={generatedCode || '<div>Nothing to preview yet</div>'} scope={{ React }}>
            <LiveEditor />
            <LiveError />
            <Typography mt={2} variant="subtitle1" sx={{ color: darkMode ? '#ccc' : '#333' }}>Preview:</Typography>
            <Box sx={{ transition: 'all 0.3s ease', borderRadius: 2 }}>
              <LivePreview />
            </Box>
          </LiveProvider>
        </Card>

        {/* History Card */}
        <Card sx={{
          mt: 4, p: 2, borderRadius: 3, boxShadow: 2,
          maxHeight: 220, overflowY: 'auto',
          background: darkMode ? '#2a2a2a' : '#fff',
          transition: 'all 0.3s ease'
        }}>
          <Typography variant="h6" sx={{ color: darkMode ? '#ccc' : '#333' }}>History:</Typography>
          <ul>
            {history.map((item, index) => (
              <li
                key={index}
                style={{
                  cursor: 'pointer',
                  padding: '6px 8px',
                  borderRadius: 2,
                  marginBottom: 4,
                  color: darkMode ? '#fff' : '#111',
                  transition: 'all 0.2s ease',
                }}
                onClick={() => { setPrompt(item); handleGenerate(item); }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = darkMode ? '#3a3a3a' : '#f1f1f1'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                {item}
              </li>
            ))}
          </ul>
        </Card>

      </Container>
    </ThemeProvider>
  );
}

export default App;
