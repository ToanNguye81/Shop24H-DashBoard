import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate, logout } from '../../../actions/login.actions';
import Cookies from 'js-cookie';

// ----------------------------------------------------------------------

export default function LoginForm() {

  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("")
  const navigate = useNavigate()
  const [password, setPassword] = useState("")
  const { isAuthenticated } = useSelector((reduxData) => reduxData.loginReducers);

  const handleClick = () => {
    // navigate('/dashboard', { replace: true });
    dispatch(authenticate(email, password))
    console.log({ email, password })
  };

  const handleClickLockOut = () => {
    console.log("Log Out")
    dispatch(logout())
  };

  const handleClickGoHome=()=>{
    navigate("/dashboard")
  }

  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address" onChange={e => setEmail(e.target.value)} />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          onChange={e => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      {
        isAuthenticated ?
          <>
            <LoadingButton fullWidth size="large" variant="contained" onClick={handleClickLockOut}>
              Logout
            </LoadingButton>
              <Button onClick={handleClickGoHome} size="large" variant="contained" sx={{mt:1,backgroundColor:"#DF3E30"}}>
                Go to Home
              </Button>
          </>
          :
          <LoadingButton fullWidth size="large" variant="contained" onClick={handleClick}>
            Login
          </LoadingButton>
      }


    </>
  );
}
