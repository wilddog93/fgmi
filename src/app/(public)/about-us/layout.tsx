'use client';

import Footer from "@/components/client/layout/footer";
import Navbar from "@/components/client/layout/Navbar";
import { useEffect } from "react";



export default function LayoutAboutUs({ children }: React.PropsWithChildren) {
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
      {children}
      <Footer />
    </div>
  );
}
