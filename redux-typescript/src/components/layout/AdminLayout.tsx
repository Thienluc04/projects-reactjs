import { Box, createTheme } from "@mui/material";
import { Header, Sidebar } from "components/common";
import { makeStyles } from "@mui/styles";
import { Navigate, Outlet } from "react-router-dom";

const theme = createTheme();

const useStyles = makeStyles(() => ({
  root: {
    display: "grid",
    gridTemplateRows: "auto 1fr",
    gridTemplateColumns: "240px 1fr",
    gridTemplateAreas: `"header header" "sidebar main"`,

    minHeight: "100vh",
  },
  header: {
    gridArea: "header",
  },
  sidebar: {
    gridArea: "sidebar",
    borderRight: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
  },
  main: {
    gridArea: "main",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 3),
  },
}));

export function AdminLayout() {
  const classes = useStyles();

  const isLoggedIn = Boolean(localStorage.getItem("access_token"));
  if (!isLoggedIn) return <Navigate to={"/login"} />;

  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Header></Header>
      </Box>

      <Box className={classes.sidebar}>
        <Sidebar></Sidebar>
      </Box>

      <Box className={classes.main}>
        <Outlet></Outlet>
      </Box>
    </Box>
  );
}
