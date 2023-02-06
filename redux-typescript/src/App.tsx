import AddEditPage from "features/students/pages/AddEditPage";
import Dashboard from "features/dashboard";
import ListPage from "features/students/pages/ListPage";
import LoginPage from "features/auth/pages/LoginPage";
import StudentFeature from "features/students";
import { AdminLayout } from "components/layout";
import { NotFound } from "components/common";
import { Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path={"/login"} element={<LoginPage></LoginPage>}></Route>
        <Route path={"/admin/*"} element={<AdminLayout></AdminLayout>}>
          <Route path="dashboard" element={<Dashboard />}></Route>
          <Route path="students/*" element={<StudentFeature />}>
            <Route path="" element={<ListPage />}></Route>
            <Route path="add" element={<AddEditPage />}></Route>
            <Route path=":studentId" element={<AddEditPage />}></Route>
          </Route>
        </Route>
        <Route path="*" element={<NotFound></NotFound>}></Route>
      </Routes>
    </>
  );
}

export default App;
