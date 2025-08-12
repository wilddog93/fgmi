import { Button } from "@/components/ui/button";
// import { Instagram, Sms } from "iconsax-reactjs";
import { FaInstagram, FaSms, FaRegEnvelope, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/client/layout/footer";

export default function Home() {
  return (
    <div className="w-full overflow-hidden font-sans grid grid-rows-1 items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
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
              href="/register"
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
      <Footer />
    </div>
  );
}
