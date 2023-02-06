import studentApi from "api/studentApi";
import StudentFilters from "../components/StudentFilters";
import StudentTable from "../components/StudentTable";
import { Box, Button, createTheme, LinearProgress, Pagination, Typography } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ListParams, Student } from "models";
import { makeStyles } from "@mui/styles";
import { selectCityList, selectCityMap } from "features/city/citySlice";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useEffect } from "react";
import {
  selectStudentFilter,
  selectStudentList,
  selectStudentLoading,
  selectStudentPagination,
  studentActions,
} from "../studentSlice";

const theme = createTheme();

const useStyles = makeStyles(() => ({
  root: {
    position: "relative",
  },

  titleContainer: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "space-between",
    alignItems: "center",

    marginBottom: theme.spacing(4),
  },
  loading: {
    position: "absolute",
    top: theme.spacing(-1),
    width: "100%",
  },
}));

export default function ListPage() {
  const match = useLocation();
  const navigate = useNavigate();

  const studentList = useAppSelector(selectStudentList);
  const pagination = useAppSelector(selectStudentPagination);
  const filter = useAppSelector(selectStudentFilter);
  const loading = useAppSelector(selectStudentLoading);
  const cityMap = useAppSelector(selectCityMap);
  const cityList = useAppSelector(selectCityList);

  const classes = useStyles();

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(studentActions.fetchStudentList(filter));
  }, [dispatch, filter]);

  const handlePageChange = (e: any, page: number) => {
    dispatch(
      studentActions.setFilter({
        ...filter,
        _page: page,
      })
    );
  };

  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilterWithDebounce(newFilter));
  };

  const handleFilterChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilter(newFilter));
  };

  const handleRemoveStudent = async (student: Student) => {
    console.log("handleRemoveStudent ~ student", student);
    try {
      // Remove student API
      await studentApi.remove(student.id || "");
      toast.success("Remove student successfully!!");

      // Trigger to re-fetch student list with current filter
      const newFilter = { ...filter };
      dispatch(studentActions.setFilter(newFilter));
    } catch (error) {
      console.log("handleRemoveStudent ~ error", error);
    }
  };

  const handleEditStudent = async (student: Student) => {
    navigate(`${match.pathname}/${student.id}`);
  };

  return (
    <Box className={classes.root}>
      <div className={classes.loading}>{loading && <LinearProgress />}</div>
      <Box className={classes.titleContainer}>
        <Typography variant="h4">Students</Typography>

        <Link to={`${match.pathname}/add`} style={{ textDecoration: "none" }}>
          <Button variant="contained" color="primary">
            Add new student
          </Button>
        </Link>
      </Box>

      <Box mb={3}>
        <StudentFilters
          filter={filter}
          citylist={cityList}
          onSearchChange={handleSearchChange}
          onChange={handleFilterChange}
        ></StudentFilters>
      </Box>

      <StudentTable
        studentList={studentList}
        cityMap={cityMap}
        onRemove={handleRemoveStudent}
        onEdit={handleEditStudent}
      ></StudentTable>

      <Box my={2} display="flex" justifyContent="center">
        <Pagination
          color="primary"
          count={Math.ceil(pagination._totalRows / pagination._limit)}
          page={pagination?._page}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
}
