import { cn } from '@/lib/utils';
import Image from 'next/image';
import React, { FC } from 'react';

interface HeaderProps extends React.ComponentProps<'header'> {
  className?: string;
}

const Header:FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn('row-start-1 flex gap-[24px] flex-wrap items-center justify-center', className)}>
      <Image
        className="dark:invert"
        src="/img/fgmi-header-logo.png"
        alt="FGMI header logo"
        width={180}
        height={38}
        priority
      />
    </header>
  );
}

export default Header;
