import { Button, CircularProgress, createTheme, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { useAppDispatch, useAppSelector } from "app/hooks";
import * as React from "react";
import { Navigate } from "react-router-dom";
import { authActions } from "../authSlice";

const theme = createTheme();

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  },
  box: {
    padding: theme.spacing(2),
  },
}));

export default function LoginPage() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const isLogging = useAppSelector((state) => state.auth.logging);
  const handleLoginClick = () => {
    dispatch(
      authActions.login({
        username: "",
        password: "",
      })
    );
  };

  const isLoggedIn = Boolean(localStorage.getItem("access_token"));
  if (isLoggedIn) return <Navigate to={"/admin/dashboard"} />;

  return (
    <div className={classes.root}>
      <Paper elevation={1} className={classes.box}>
        <Typography variant="h5" component="h1">
          Student Managment
        </Typography>
        <Box mt={4}>
          <Button fullWidth variant="contained" color="primary" onClick={handleLoginClick}>
            {isLogging && <CircularProgress size={20} color="secondary" />} &nbsp; Fake Login
          </Button>
        </Box>
      </Paper>
    </div>
  );
}
