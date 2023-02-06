import { ChevronLeft } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import studentApi from "api/studentApi";
import { Student } from "models";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import StudentForm from "../components/StudentForm";

export default function AddEditPage() {
  const navigate = useNavigate();
  const { studentId } = useParams<{ studentId: string }>();
  const isEdit = Boolean(studentId);
  const [student, setStudent] = useState<Student>();

  useEffect(() => {
    if (!studentId) return;

    (async () => {
      try {
        const data: Student = await studentApi.getById(studentId);
        setStudent(data);
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [studentId]);

  const hanldeStudentFormSubmit = async (formValues: Student) => {
    if (isEdit) {
      await studentApi.update(formValues);
    } else {
      await studentApi.add(formValues);
    }

    toast.success("Save student successfully!!");

    navigate("/admin/students");
  };

  const initialValue: Student = {
    name: "",
    age: "",
    mark: "",
    gender: "male",
    city: "",
    ...student,
  } as Student;

  return (
    <Box>
      <Link to="/admin/students">
        <Typography variant="caption" style={{ display: "flex", alignItems: "center" }}>
          <ChevronLeft /> Back to student list
        </Typography>
      </Link>

      <Typography variant="h4">{isEdit ? "Update student info" : "Add new student"}</Typography>

      {(!isEdit || Boolean(student)) && (
        <Box mt={3}>
          <StudentForm
            initialValues={initialValue}
            onSubmit={hanldeStudentFormSubmit}
          ></StudentForm>
        </Box>
      )}
    </Box>
  );
}
