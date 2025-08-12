import React from 'react';
import Header from '@/components/client/layout/bootcamp/header';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="overflow-auto min-h-screen flex flex-col font-sans">
      <Header/>
      {children}
    </div>
  );
}

export default Layout;
