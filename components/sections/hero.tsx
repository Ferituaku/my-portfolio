// components/sections/hero.tsx
"use client";

import { motion } from "framer-motion";
import { LiquidMeshScene } from "@/components/3d/liquid-mesh";
import { ArrowDown } from "lucide-react";

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeInOut", // or any other valid easing function
      },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background - Fixed for scroll effect */}
      <div className="fixed inset-0 -z-10">
        <LiquidMeshScene />
      </div>

      {/* Gradient Overlay for better text readability */}
      <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/40 to-black/50 dark:from-black/30 dark:via-black/50 dark:to-black/80 pointer-events-none" />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 pb-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-block px-4 py-2 rounded-full bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 text-blue-300 text-sm font-medium">
            Welcome to my portfolio
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-6 text-balance"
        >
          <span className="text-white">Al Ferro Putra</span>
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">
            Yusanda
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl sm:text-2xl lg:text-3xl text-gray-200 mb-8 max-w-3xl mx-auto text-balance font-light"
        >
          UI/UX Designer & Generative AI Engineer
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg lg:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Crafting beautiful, interactive digital experiences with modern design
          principles and cutting-edge technology.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.a
            href="#projects"
            className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all relative overflow-hidden"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">View My Work</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.a>
          <motion.a
            href="#contact"
            className="px-8 py-4 border-2 border-white/30 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/10 hover:border-white/50 transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Get in Touch
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-xs text-white/60 font-medium tracking-wider uppercase">
          Scroll
        </span>
        <ArrowDown className="w-5 h-5 text-white/60" />
      </motion.div>
    </section>
  );
}
