// components/sections/tech-stack.tsx
"use client";

import { motion, Variants } from "framer-motion";
import { useState } from "react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiPython,
  SiFigma,
  SiGit,
  SiPostgresql,
  SiSupabase,
  SiFramer,
  SiThreedotjs,
  SiStripe,
} from "react-icons/si";

const technologies = [
  { name: "React", icon: SiReact, color: "#61dafb" },
  { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178c6" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06b6d4" },
  { name: "Python", icon: SiPython, color: "#3776ab" },
  { name: "Figma", icon: SiFigma, color: "#f24e1e" },
  { name: "Git", icon: SiGit, color: "#f1502f" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
  { name: "Supabase", icon: SiSupabase, color: "#3ecf8e" },
  { name: "Framer Motion", icon: SiFramer, color: "#0055ff" },
  { name: "Three.js", icon: SiThreedotjs, color: "#ffffff" },
  { name: "Stripe", icon: SiStripe, color: "#635bff" },
];

const TechIcon = ({ tech }: { tech: (typeof technologies)[0] }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = tech.icon;

  return (
    <motion.div
      className="flex flex-col items-center gap-3 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.1, y: -5 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="w-20 h-20 rounded-xl bg-white/5 backdrop-blur-sm flex items-center justify-center border border-white/10 transition-all duration-300"
        animate={
          isHovered
            ? {
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                borderColor: "rgba(59, 130, 246, 0.3)",
                boxShadow: "0 0 20px rgba(59, 130, 246, 0.2)",
              }
            : {}
        }
      >
        <Icon size={36} color={tech.color} />
      </motion.div>
      <motion.span
        className="text-sm font-medium text-gray-300 text-center"
        initial={{ opacity: 0, y: 5 }}
        animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0.7, y: 5 }}
        transition={{ duration: 0.2 }}
      >
        {tech.name}
      </motion.span>
    </motion.div>
  );
};

export function TechStack() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <section
      id="stack"
      className="relative min-h-screen py-20 sm:py-32 px-4 sm:px-6 lg:px-8"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/20 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-balance">
            <span className="bg-clip-text text-transparent bg-linear-to-r from-slate-500 via-sky-600 to-slate-700 dark:from-white dark:via-purple-200 dark:to-cyan-300">
              Tech Stack
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-500 dark:text-gray-300 max-w-3xl mx-auto transition-all">
            The tools and technologies I use to build modern, scalable, and
            beautiful digital products.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {technologies.map((tech) => (
            <motion.div key={tech.name} variants={itemVariants}>
              <TechIcon tech={tech} />
            </motion.div>
          ))}
        </motion.div>

        {/* Skills Summary */}
        <motion.div
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {[
            {
              title: "Frontend Development",
              description:
                "Building responsive, accessible, and performant user interfaces with React, Next.js, and modern CSS.",
              icon: "💻",
            },
            {
              title: "AI & Machine Learning",
              description:
                "Integrating generative AI models and machine learning solutions into web applications.",
              icon: "🤖",
            },
            {
              title: "UI/UX Design",
              description:
                "Creating beautiful, intuitive designs with a focus on user experience and accessibility.",
              icon: "🎨",
            },
          ].map((skill, idx) => (
            <motion.div
              key={idx}
              className="group p-8 rounded-2xl backdrop-blur-sm bg-white/5 border border-white/10 hover:border-cyan-500/30 hover:bg-white/10 transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl mb-4">{skill.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-cyan-300 transition-colors">
                {skill.title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {skill.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
