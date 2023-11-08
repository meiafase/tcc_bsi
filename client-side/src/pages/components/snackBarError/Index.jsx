import React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackbarError(props) {
 
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    props.setOpenSnackBarError(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={props.openSnackBarError} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {props.mensagemSnackBarError}
        </Alert>
      </Snackbar>
    </Stack>
  );
}