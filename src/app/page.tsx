'use client';

import { Button } from "@/components/ui/button";
// import { Instagram, Sms } from "iconsax-reactjs";
import { FaInstagram, FaSms, FaRegEnvelope, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/client/layout/footer";
import { motion } from "framer-motion";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import Navbar from "@/components/client/layout/Navbar";
import Hero from "@/components/client/layout/hero";
import { useEffect } from "react";



export default function Home() {

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-reveal');
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -100px 0px" }
    );

    document.querySelectorAll('section').forEach((section) => {
      observer.observe(section);
    });

    return () => {
      document.querySelectorAll('section').forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="w-full overflow-hidden font-sans min-h-screen bg-[#E2F1FC]">
      <div className="fixed w-full z-50">
        <Navbar />
        {/* <NavMenu /> */}
      </div>

      <main className="h-full w-full flex flex-col gap-[32px] items-center justify-center pt-20">
        <Hero />
      </main>

      {/* footer */}
      <Footer />
    </div>
  );
}
