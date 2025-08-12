import React from 'react';
import Header from '@/components/client/layout/bootcamp/header';
import Footer from '@/components/client/layout/footer';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="overflow-auto min-h-screen flex flex-col font-sans">
      <Header/>
      {children}
      <Footer className='pb-8' />
    </div>
  );
}

export default Layout;
