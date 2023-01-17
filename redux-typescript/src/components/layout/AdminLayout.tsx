import * as React from 'react';
import { Navigate } from 'react-router-dom';

export interface AdminLayoutProps {}

export function AdminLayout(props: AdminLayoutProps) {
  const isLoggedIn = Boolean(localStorage.getItem('access_token'));
  if (!isLoggedIn) return <Navigate to={'/login'} />;

  return <div>Admin Layout</div>;
}
