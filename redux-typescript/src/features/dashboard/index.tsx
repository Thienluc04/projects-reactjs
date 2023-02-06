import StatisticItem from "./components/StatisticItem";
import { Box, createTheme, Grid, LinearProgress, Typography } from "@mui/material";
import { Female, Male, PeopleAlt } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useEffect } from "react";
import {
  dashboardActions,
  selectDashboardLoading,
  selectDashboardStatistics,
  selectHighestStudentList,
  selectLowestStudentList,
  selectRankingByCityList,
} from "./dashboardSlice";
import Widget from "./components/Widget";
import StudentRanking from "./components/StudentRanking";

const theme = createTheme();

const useStyles = makeStyles(() => ({
  root: {
    position: "relative",
    paddingTop: theme.spacing(1),
  },

  loading: {
    position: "absolute",
    top: theme.spacing(-1),
    width: "100%",
  },
}));

export default function Dashboard() {
  const dispatch = useAppDispatch();

  const loading = useAppSelector(selectDashboardLoading);
  const statistics = useAppSelector(selectDashboardStatistics);
  const highestStudentList = useAppSelector(selectHighestStudentList);
  const lowestStudentList = useAppSelector(selectLowestStudentList);
  const rankingByCityList = useAppSelector(selectRankingByCityList);
  const classes = useStyles();

  useEffect(() => {
    dispatch(dashboardActions.fetchData());
  }, [dispatch]);

  return (
    <Box className={classes.root}>
      {/* Loading */}
      <div className={classes.loading}>{loading && <LinearProgress />}</div>

      {/* Statistic Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<Male fontSize="large" color="primary" />}
            label="male"
            value={statistics.maleCount}
          ></StatisticItem>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<Female fontSize="large" color="primary" />}
            label="female"
            value={statistics.femaleCount}
          ></StatisticItem>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<PeopleAlt fontSize="large" color="primary" />}
            label="mark >= 8"
            value={statistics.highMarkCount}
          ></StatisticItem>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<PeopleAlt fontSize="large" color="primary" />}
            label="mark <= 5"
            value={statistics.lowMarkCount}
          ></StatisticItem>
        </Grid>
      </Grid>

      {/* All students ranking */}
      <Box mt={5}>
        <Typography variant="h4">All students</Typography>

        <Box mt={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <Widget title="Student with highest mark">
                <StudentRanking studentList={highestStudentList}></StudentRanking>
              </Widget>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Widget title="Student with lowest mark">
                <StudentRanking studentList={lowestStudentList}></StudentRanking>
              </Widget>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Ranking by city */}
      <Box mt={5}>
        <Typography variant="h4">Ranking by city</Typography>

        <Box mt={2}>
          <Grid container spacing={3}>
            {rankingByCityList.map((ranking) => (
              <Grid key={ranking.cityId} item xs={12} md={6} lg={3}>
                <Widget title={ranking.cityName}>
                  <StudentRanking studentList={ranking.rankingList}></StudentRanking>
                </Widget>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
