import { Card, CardAction, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import React, { FC } from 'react';

interface FooterProps extends React.ComponentProps<'div'> {
  title: string;
  description: string;
  actions?: React.ReactNode;
}

const FooterPolicy:FC<FooterProps> = ({ title, description, actions, className, ...props }) => {
  return (
    <Card {...props} className={cn("bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg text-center gap-1 border-none shadow-accent", className)}>
      <CardHeader className="text-xl font-semibold">{title}</CardHeader>
      <CardContent className="text-muted-foreground mb-4">
        {description}
      </CardContent>
      <CardFooter className={cn("flex flex-col", !!actions ? "" : "hidden")}>
        {actions}
      </CardFooter>
    </Card>
  );
}

export default FooterPolicy;
