import React from 'react';
import { useNavigation } from '../lib/navigationContext';
import { Header } from './Header';
import { EmployeeHeader } from './EmployeeHeader';
import { GerantHeader } from './GerantHeader';
import { AdminHeader } from './AdminHeader';

export function HeaderWrapper() {
  const { currentPage, navigate } = useNavigation();

  const handleNavigate = (page: string) => {
    const cleanPage = page.startsWith('/') ? page.substring(1) : page;
    navigate(cleanPage || 'home');
  };

  const isEmployeePage = currentPage.startsWith('employee');
  const isGerantPage = currentPage.startsWith('gerant');
  const isAdminPage = currentPage.startsWith('admin');

  if (isAdminPage) {
    return <AdminHeader currentPage={currentPage as any} onNavigate={handleNavigate} />;
  } else if (isGerantPage) {
    return <GerantHeader currentPage={currentPage as any} onNavigate={handleNavigate} />;
  } else if (isEmployeePage) {
    return <EmployeeHeader currentPage={currentPage as any} onNavigate={handleNavigate} />;
  } else {
    return <Header currentPage={currentPage as any} onNavigate={handleNavigate} />;
  }
}
