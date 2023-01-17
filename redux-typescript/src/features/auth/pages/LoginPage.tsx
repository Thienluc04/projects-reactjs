import { Button, createTheme, makeStyles, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';

const theme = createTheme();

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  box: {
    padding: theme.spacing(2),
  },
});

export default function LoginPage() {
  // const classes = useStyles();

  return (
    <div className="">
      <Paper elevation={1} className="">
        <Typography variant="h5" component="h1">
          Student Managment
        </Typography>
        <Box mt={4}>
          <Button variant="contained" color="primary">
            Fake Login
          </Button>
        </Box>
      </Paper>
    </div>
  );
}
