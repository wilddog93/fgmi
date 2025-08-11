import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import { FaInstagram, FaLinkedin, FaRegEnvelope, FaWhatsapp } from 'react-icons/fa';

const socialMedia = [
  {
    href: "mailto:info@fgmi.or.id",
    icon: FaRegEnvelope,
  },
  {
    href: "https://instagram.com/fgmindo",
    icon: FaInstagram,
  },
  {
    href: "https://www.linkedin.com/company/forum-geosaintis-muda-indonesia/",
    icon: FaLinkedin,
  },
  {
    href: "https://wa.me/6282114563860",
    icon: FaWhatsapp,
  },
];

const Footer = () => {
  return (
    <footer className="w-full row-start-3 flex flex-col gap-2 flex-wrap items-center justify-center text-xs">
      {/* Social Media & Copyright */}
      <div className="w-full flex gap-2 items-center flex-col">
        <div className="flex gap-1 flex-wrap items-center">
          {/* Social Media */}
          {socialMedia.map((item, index) => (
            <Link 
              key={index}
              href={item.href}
              className="flex items-center justify-center gap-2 p-0"
            >
              <Button
                variant='link'
                className="flex items-center gap-2 hover:cursor-pointer p-0 !px-1 focus:outline-none"
              >
                <item.icon className="h-5 w-5 px-0" />
              </Button>
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap font-normal text-center leading-snug font-sans text-ellipsis">
          Copyright © 2025 Indonesian Young Geoscientists Forum. All rights reserved.
        </div>
      </div>

      {/* Address */}
      <Link 
        className="flex items-center justify-center gap-2 text-xs text-center"
        target="_blank"
        rel="noopener noreferrer"
        href="https://maps.app.goo.gl/jjCpYFbpJxA7WR7x7"
      >
        SOHO Pancoran Tower Splendor – Lt.18 Unit 1817, Tebet Barat, Pancoran, Jakarta Selatan, DKI Jakarta 12810
      </Link>
    </footer>
  );
}

export default Footer;
