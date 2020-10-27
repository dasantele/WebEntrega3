import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useLocation, useParams } from 'react-router';
import { ultraUnsafeLogin } from '../../api/login';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://localhost:3000">
        Gaymers
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.light,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  cssLabel: {
    color: `white !important`,
  },

  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: `white !important`,
      boxShadow: "0 0 0 100px transparent inset !important",
    },
    boxShadow: "0 0 0 100px transparent inset !important"

  },

  field: {
    
  },

  labelFocused: {
    color: "#ffffff",
  },

  cssFocused: {
    boxShadow: "0 0 0 100px transparent inset !important"
  },

  notchedOutline: {
    borderWidth: '1px',
    borderColor: `white !important`,
    boxShadow: "0 0 0 100px transparent inset !important"
  },

  divider: {
    height: 28,
    margin: 4,
  },
  
  iconButton: {
    padding: 10,
  },
  
  txtField: {
    boxShadow: "0 0 0 100px transparent inset !important",
    WebkitBoxShadow: "0 0 0 100px transparent inset !important"
  }
}));

export default function SignIn({ user,setUser, redirectPrefix }) {
  const location = useLocation();
  const id = useParams().id;
  const redirectUrl = redirectPrefix ? `${redirectPrefix}/${id}` : undefined;
  const classes = useStyles();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  useEffect(() => {
    if(user) {
      if(redirectUrl) {
        window.location.assign(redirectUrl);
      } else {
        window.location.assign("/");
      }
    }
  }, []);
  const handleSignInPress = async() => {
    try {
      let user = await ultraUnsafeLogin({email, password});
      setUser(user);
      console.log("ok")
      if(redirectUrl) {
        console.log(redirectUrl);
        window.location.assign(redirectUrl);
      } else {
        window.location.assign("/");
      }
    } catch(error) {
      console.log(error);
      console.log("TODO: DISPLAY ERROR");
    }
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <div className={classes.form} noValidate>
          <TextField
            variant="outlined"
            backgroundColor="black"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoFocus
            className={classes.txtField}
            onChange={(event) => setEmail(event.target.value)}
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
              },
            }}
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
              },
              
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={(event) => setPassword(event.target.value)}
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
              },
            }}
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
              },
              
            }}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSignInPress}
          >
            Sign In
          </Button>
        </div>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}