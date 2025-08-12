import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React, { FC } from 'react';

interface HeaderProps extends React.ComponentProps<'header'> {
  className?: string;
}

const Header:FC<HeaderProps> = ({ className, ...props }) => {
  return (
    <header {...props} className={cn("font-sans bg-white shadow-sm border-b", className)}>
      <div className="container mx-auto px-4 py-6">
        <div className='flex flex-col items-center gap-3 text-center'>
          <Image
            className="dark:invert"
            src="/img/fgmi-header-logo.png"
            alt="FGMI header logo"
            width={140}
            height={38}
            priority
          />
          <div>
            <h1 className="text-2xl font-bold text-primary">Indonesian Young Geoscientists Forum</h1>
            <p className="text-gray-600 text-sm italic">&quot;Eksplorasi tanpa batas, inovasi tanpa henti untuk bumi lestari.&quot;</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
