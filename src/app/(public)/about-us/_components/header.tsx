import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowLeft, FileText } from 'lucide-react';
import Link from 'next/link';
import React, { FC } from 'react';

interface HeaderProps extends React.ComponentProps<'div'> {
  title: string;
  subTitle: string;
  description: string;
}

const HeaderPolicy:FC<HeaderProps> = ({ title, subTitle, description, className, ...props }) => {
  return (
    <div {...props} className={cn("bg-gradient-to-br from-primary/10 to-accent/10 py-16 px-4", className)} >
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">{title}</h1>
        <h2 className="text-xl text-muted-foreground mb-6 text-pretty">
          {subTitle}
        </h2>
        <p className="text-lg text-foreground/80 max-w-3xl mx-auto text-pretty">
          {description}
        </p>
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <Link href="/about-us/faqs">
            <Button variant="outline" className="gap-2 bg-transparent">
              <FileText className="h-4 w-4" />
              FAQs
            </Button>
          </Link>
          <Link href="/about-us/terms-and-conditions">
            <Button variant="outline" className="gap-2 bg-transparent">
              <FileText className="h-4 w-4" />
              Terms & Conditions
            </Button>
          </Link>
          <Link href="/about-us/refund-policy">
            <Button variant="outline" className="gap-2 bg-transparent">
              <FileText className="h-4 w-4" />
              Refund Policy
            </Button>
          </Link>
        </div>
        <div className='mt-6 flex justify-center'>
          <Link href="/">
            <Button variant="outline" className="gap-2 bg-transparent">
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Halaman depan
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HeaderPolicy;
