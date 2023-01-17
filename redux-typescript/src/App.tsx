import './App.css';
import { AdminLayout } from 'components/layout';
import { Route, Routes } from 'react-router-dom';
import cityApi from 'api/cityApi';
import LoginPage from 'features/auth/pages/LoginPage';
import React, { useEffect } from 'react';
import { NotFound, PrivateRoute } from 'components/common';

function App() {
  useEffect(() => {
    cityApi.getAll().then((response) => console.log(response));
  });
  return (
    <Routes>
      <Route path={'/login'} element={<LoginPage></LoginPage>}></Route>
      <Route path={'/admin'} element={<AdminLayout></AdminLayout>}></Route>
      <Route path="*" element={<NotFound></NotFound>}></Route>
    </Routes>
  );
}

export default App;
