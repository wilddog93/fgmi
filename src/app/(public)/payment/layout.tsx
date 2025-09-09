import React from 'react';

const LayoutPayment = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='min-h-screen bg-gradient-to-br flex items-center justify-center p-4'>
      {children}
    </div>
  );
}

export default LayoutPayment;
