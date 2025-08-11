import { Button } from "@/components/ui/button";
// import { Instagram, Sms } from "iconsax-reactjs";
import { FaInstagram, FaSms, FaRegEnvelope, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <header className="row-start-1 flex gap-[24px] flex-wrap items-center justify-center">
        <Image
          className="dark:invert"
          src="/img/fgmi-header-logo.png"
          alt="FGMI header logo"
          width={180}
          height={38}
          priority
        />
      </header>
      <main className="flex flex-col gap-[32px] row-start-2 items-center justify-center">
        <Image
          className="dark:invert"
          src="/img/fgmi-logo.png"
          alt="FGMI logo"
          width={140}
          height={38}
          priority
        />
        <div className="font-mono list-inside list-decimal text-md/6 text-center">
          <div className="mb-2 tracking-[-.01em] text-2xl sm:text-4xl font-bold">
            We&lsquo;ll be back soon!
          </div>
          <div className="mb-2 tracking-[-.01em]">
            Sorry for the inconvenience,<br/> we&lsquo;re performing some maintenance at the moment.<br/> We&lsquo;ll be back online shortly!
          </div>
        </div>

        <div className="flex gap-2 items-center flex-col">
          <div className="flex gap-2 items-center flex-col sm:flex-row">
            <Link
              className="flex items-center gap-2 hover:cursor-pointer"
              href="/register-bootcamp-geoscience"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant='default'
                className="flex items-center gap-2 hover:cursor-pointer rounded-2xl"
              >
                Bootcamp Geoscience
              </Button>
            </Link>
          </div>

          <div className="flex gap-2 items-center flex-col sm:flex-row">
            <Link
              className="flex items-center gap-2 hover:cursor-pointer"
              href="https://mail.fgmi.or.id/mail/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant='outline'
                className="flex items-center gap-2 hover:cursor-pointer rounded-2xl min-w-[158px]"
              >
                FGMI Mail
              </Button>
            </Link>
            <Link
              className="flex items-center gap-2 hover:cursor-pointer"
              href="/qr-generator"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant='outline'
                className="flex items-center gap-2 hover:cursor-pointer rounded-2xl min-w-[158px]"
              >
                QR Generator
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* footer */}
      <footer className="overflow-hidden row-start-3 flex flex-col gap-2 flex-wrap items-center justify-center text-xs">
        {/* Social Media & Copyright */}
        <div className="flex gap-2 items-center flex-col">
          <div className="flex gap-1 flex-wrap items-center">
            <Link 
              href="mailto:info@fgmi.or.id"
              className="flex items-center justify-center gap-2 p-0"
            >
              <Button
                variant='link'
                className="flex items-center gap-2 hover:cursor-pointer p-0 !px-1"
              >
                <FaRegEnvelope className="h-5 w-5 px-0" />
              </Button>
            </Link>
            <Link 
              href="https://instagram.com/fgmindo"
              className="flex items-center justify-center gap-2"
            >
              <Button
                variant='link'
                className="flex items-center gap-2 hover:cursor-pointer p-0 !px-1"
              >
                <FaInstagram className="h-5 w-5 px-0" />
              </Button>
            </Link>
            <Link 
              href="https://www.linkedin.com/company/forum-geosaintis-muda-indonesia/"
              className="flex items-center justify-center gap-2"
            >
              <Button
                variant='link'
                className="flex items-center gap-2 hover:cursor-pointer p-0 !px-1"
              >
                <FaLinkedin className="h-5 w-5 px-0" />
              </Button>
            </Link>
            <Link 
              href="https://wa.me/6282114563860"
              className="flex items-center justify-center gap-2"
            >
              <Button
                variant='link'
                className="flex items-center gap-2 hover:cursor-pointer p-0 !px-1"
              >
                <FaWhatsapp className="h-5 w-5 px-0" />
              </Button>
            </Link>
          </div>
          <div className="font-normal text-center leading-snug font-sans text-ellipsis">
            Copyright © 2025 Indonesian Young Geoscientists Forum. All rights reserved.
          </div>
        </div>

        {/* Address */}
        <Link 
          className="flex items-center justify-center gap-2"
          target="_blank"
          rel="noopener noreferrer"
          href="https://maps.app.goo.gl/jjCpYFbpJxA7WR7x7"
          >
            <Button 
              variant='link'
              className="flex items-center gap-2 hover:cursor-pointer hover:no-underline p-0 !px-1 text-center text-inherit text-xs font-normal text-ellipsis"
            >
              SOHO Pancoran Tower Splendor – Lt.18 Unit 1817, Tebet Barat, Pancoran, Jakarta Selatan, DKI Jakarta 12810
            </Button>
          </Link>
      </footer>
    </div>
  );
}
