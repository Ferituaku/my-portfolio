// components/sections/projects.tsx
"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "ASTRA Generative AI Monitoring Dashboard",
    description:
      "A generative AI tool for creating high-quality content with customizable parameters and real-time preview.",
    tags: [
      "React",
      "Next.js",
      "Python",
      "TypeScript",
      "Tailwind CSS",
      "AI",
      "Langchain",
    ],
    github: "https://github.com/Ferituaku",
    demo: "#",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    title: "Sistem Informasi Terpadu (SIT) prototype admission website",
    description:
      "A prototype admission website for a university, featuring user-friendly navigation and responsive design.",
    github: "https://github.com/Ferituaku",
    demo: "#",
    gradient: "from-blue-500 to-sky-500",
  },
  {
    id: 3,
    title: "Infografis Dashboard Siaga Bencana Tembalang",
    description:
      " An interactive dashboard visualizing disaster preparedness data for Tembalang district.",
    tags: ["Next.js", "Recharts", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/Ferituaku",
    demo: "#",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    id: 4,
    title: "WASKITA by STOPHiva (HIV/AIDS education and support app)",
    description:
      " A webisite providing education and support for HIV/AIDS awareness and prevention.",
    tags: ["Next.js", "Framer", "TypeScript", "Tailwind CSS", "MySQL"],
    github: "https://github.com/Ferituaku",
    demo: "#",
    gradient: "from-red-500 to-rose-500",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Projects() {
  return (
    <section
      id="projects"
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
            <span className="bg-clip-text text-transparent bg-linear-to-r from-slate-500 via-blue-950 to-slate-500 dark:from-white dark:via-purple-200 dark:to-cyan-300">
              Featured Projects
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 transition-colors max-w-3xl mx-auto">
            A selection of my recent work showcasing my expertise in design,
            development, and AI integration.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              <Card className="group h-full flex flex-col overflow-hidden backdrop-blur-sm bg-slate-700 dark:bg-white/5 dark:border-white/10 hover:border-white hover:bg-slate-500 dark:hover:border-white/20 dark:hover:bg-white/10 transition-all duration-300">
                {/* Gradient header */}
                <div
                  className={`h-2 bg-linear-to-r ${project.gradient} opacity-80 group-hover:opacity-100 transition-opacity`}
                />

                <div className="flex-1 p-6 flex flex-col">
                  <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-6 flex-1 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags?.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-xs bg-white/10 text-gray-200 border-white/20 hover:bg-white/20"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="px-6 pb-6 flex gap-4 border-t border-white/10 pt-4">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-cyan-300 transition-colors"
                    whileHover={{ x: 2 }}
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </motion.a>
                  <motion.a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-cyan-300 transition-colors"
                    whileHover={{ x: 2 }}
                  >
                    <ExternalLink className="w-4 h-4" />
                    Demo
                  </motion.a>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
