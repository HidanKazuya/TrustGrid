import React from 'react';
import WalletConnectComponent from './components/WalletConnectComponent';
import { CssBaseline, Container, Typography } from '@mui/material';

function App() {
  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Typography variant="h2" component="h1" gutterBottom>
        TrustGrid
      </Typography>
      <WalletConnectComponent />
    </Container>
  );
}

export default App;
