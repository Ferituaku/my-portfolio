"use client"

import { motion, Variants } from "framer-motion"
import { useState } from "react"
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
} from "react-icons/si"

const technologies = [
  { name: "React", icon: SiReact, color: "#61dafb" },
  { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178c6" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06b6d4" },
  { name: "Python", icon: SiPython, color: "#3776ab" },
  { name: "Figma", icon: SiFigma, color: "#f24e1e" },
  { name: "Git", icon: SiGit, color: "#f1502f" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
  { name: "Supabase", icon: SiSupabase, color: "#3ecf8e" },
  { name: "Framer Motion", icon: SiFramer, color: "#0055ff" },
  { name: "Three.js", icon: SiThreedotjs, color: "#000000" },
  { name: "Stripe", icon: SiStripe, color: "#635bff" },
]

const TechIcon = ({ tech }: { tech: (typeof technologies)[0] }) => {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = tech.icon

  return (
    <motion.div
      className="flex flex-col items-center gap-3 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center border border-border/50 hover:border-accent/50 transition-colors"
        animate={isHovered ? { backgroundColor: "rgba(0, 102, 255, 0.1)" } : {}}
      >
        <Icon size={32} color={tech.color} />
      </motion.div>
      <motion.span
        className="text-sm font-medium text-foreground/70 text-center"
        initial={{ opacity: 0, y: 5 }}
        animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 5 }}
        transition={{ duration: 0.2 }}
      >
        {tech.name}
      </motion.span>
    </motion.div>
  )
}

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
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        type: ("spring" as any),
        stiffness: 100,
      },
    },
  }

  return (
    <section id="stack" className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-balance">Tech Stack</h2>
          <p className="text-lg text-foreground/60 max-w-2xl">
            The tools and technologies I use to build modern, scalable, and beautiful digital products.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {technologies.map((tech) => (
            <motion.div key={tech.name} variants={itemVariants}>
              <TechIcon tech={tech} />
            </motion.div>
          ))}
        </motion.div>

        {/* Skills Summary */}
        <motion.div
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="p-6 rounded-lg border border-border/50 hover:border-accent/50 transition-colors">
            <h3 className="text-lg font-semibold mb-2">Frontend Development</h3>
            <p className="text-foreground/60 text-sm">
              Building responsive, accessible, and performant user interfaces with React, Next.js, and modern CSS.
            </p>
          </div>
          <div className="p-6 rounded-lg border border-border/50 hover:border-accent/50 transition-colors">
            <h3 className="text-lg font-semibold mb-2">AI & Machine Learning</h3>
            <p className="text-foreground/60 text-sm">
              Integrating generative AI models and machine learning solutions into web applications.
            </p>
          </div>
          <div className="p-6 rounded-lg border border-border/50 hover:border-accent/50 transition-colors">
            <h3 className="text-lg font-semibold mb-2">UI/UX Design</h3>
            <p className="text-foreground/60 text-sm">
              Creating beautiful, intuitive designs with a focus on user experience and accessibility.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
