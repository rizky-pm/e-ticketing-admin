import React, { forwardRef } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const SnackbarComponent = ({ snackbarData, setSnackbarData }) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarData((prevState) => ({
      ...prevState,
      isOpen: false,
    }));
  };
  return (
    <Snackbar
      open={snackbarData.isOpen}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={snackbarData.type}
        sx={{ width: '100%' }}
      >
        {snackbarData.message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarComponent;
