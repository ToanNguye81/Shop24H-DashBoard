import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const SnackBarAlert = ({ status,openSnackBar }) => {
  const [open, setOpen] = React.useState(false);

  React.useEffect(()=>{
    openSnackBar? setOpen(true):setOpen(false)
  },[status,openSnackBar])
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        {status ? <Alert onClose={handleClose} severity={status} sx={{ width: '100%' }}>
          This is a {status} update!
        </Alert> : null}
      </Snackbar>
    </Stack>
  );
}