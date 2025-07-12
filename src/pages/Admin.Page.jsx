import React from 'react';
import DefaultLayoutHoc from '../layout/Default.layout';
import AdminPanel from '../components/Admin/AdminPanel.Component';

const AdminPage = () => {
  return <AdminPanel />;
};

export default DefaultLayoutHoc(AdminPage);