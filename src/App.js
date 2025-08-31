import React, { useState } from 'react';
import { Button, TextField, Container, Box } from '@mui/material';

function App() {
  const [prompt, setPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');

  const handleGenerate = async () => {
    // Placeholder for AI API call
    setGeneratedCode('<div>Sample generated UI</div>');
  };

  return (
    <Container>
      <Box mt={4}>
        <TextField
          fullWidth
          label="Describe your UI"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <Button variant="contained" onClick={handleGenerate} sx={{ mt: 2 }}>
          Generate UI
        </Button>
      </Box>
      <Box mt={4}>
        <h3>Generated JSX:</h3>
        <pre>{generatedCode}</pre>
      </Box>
    </Container>
  );
}

export default App;
