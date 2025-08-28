
import React, { useRef } from 'react';
import AnimatedBackground from './animate-background';
import { ArrowRight, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import PlatformDemo from './hero/platform-demo';
import StatsSection from './hero/stats-section';
import Link from 'next/link';

const Hero = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }
    }
  };

  return (
    <section className="w-full relative min-h-screen pt-20 pb-32 overflow-hidden">
      {/* <AnimatedBackground /> */}
      
      <div className="container-section relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-5xl mx-auto text-center"
        >
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6"
          >
            <Zap className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium font-inter tracking-wide">Wadah Kolaborasi Geosaintis Muda Indonesia</span>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="font-inter font-bold text-4xl md:text-5xl lg:text-7xl tracking-tight max-w-4xl mx-auto mb-6 text-[var(--convrt-dark-blue)] leading-[1.1]"
          >
            Menjadi <span className="text-primary font-extrabold">Geosaintis</span> saling Kolaborasi
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="font-inter text-xl text-[var(--convrt-dark-blue)]/80 max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            Menghubungkan geosaintis muda melalui kolaborasi, pengetahuan, dan program berkelanjutan.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16"
          >
            <Link href="/register/program" className="button-primary flex items-center group font-inter font-medium">
              Daftar Bootcamp FGMI
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
          
          {/* Modern Platform Showcase */}
          {/* <motion.div 
            ref={demoRef}
            variants={itemVariants}
          >
            <PlatformDemo />
          </motion.div> */}
          
          {/* Stats Section - Enhanced with better styling and icons */}
          <StatsSection ref={statsRef} />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
