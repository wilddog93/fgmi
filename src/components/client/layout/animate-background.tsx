
import React from 'react';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-white">
      {/* Boxed rectangular shape with rounded corners and space from sides */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[80vh] bg-gray-100 rounded-[40px]" />
    </div>
  );
};

export default AnimatedBackground;
