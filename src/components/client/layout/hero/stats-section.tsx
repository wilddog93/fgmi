
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, BarChart2, Award } from 'lucide-react';
import StatCard from './stat-card';
import { cn } from '@/lib/utils';

interface StatsSectionProps extends React.ComponentProps<'div'> {
  className?: string;
}

const StatsSection: React.FC<StatsSectionProps> = ({ className, ...props }) => {
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
      transition: { duration: 0.7, ease: "easeInOut" as const }
    }
  };

  return (
    <motion.div 
      ref={props.ref}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={cn("grid grid-cols-1 md:grid-cols-3 gap-8", className)}
    >
      <motion.div variants={itemVariants}>
        <StatCard 
          title="Ekstraksi"
          description="Mengembangkan ilmu eksplorasi energi, mineral, dan sumber daya geologi untuk kemajuan bangsa." 
          icon={<TrendingUp className="w-8 h-8" />} 
        />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <StatCard 
          title='Konservasi'
          description="Melestarikan warisan geologi dan lingkungan melalui edukasi, geopark, serta pelindungan alam." 
          icon={<BarChart2 className="w-8 h-8" />} 
        />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <StatCard 
          title='Mitigasi'
          description="Meningkatkan kesadaran dan kesiapsiagaan terhadap bencana geologi untuk keselamatan masyarakat." 
          icon={<Award className="w-8 h-8" />} 
        />
      </motion.div>
    </motion.div>
  );
};

export default StatsSection;
