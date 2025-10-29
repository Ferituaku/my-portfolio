"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "AI Content Generator",
    description:
      "A generative AI tool for creating high-quality content with customizable parameters and real-time preview.",
    tags: ["React", "Next.js", "AI/ML", "TypeScript"],
    github: "https://github.com/Ferituaku",
    demo: "#",
  },
  {
    id: 2,
    title: "Design System UI Kit",
    description:
      "Comprehensive component library with 50+ reusable components, built with accessibility and performance in mind.",
    tags: ["React", "Tailwind CSS", "Storybook", "TypeScript"],
    github: "https://github.com/Ferituaku",
    demo: "#",
  },
  {
    id: 3,
    title: "Interactive Dashboard",
    description:
      "Real-time analytics dashboard with data visualization, featuring smooth animations and responsive design.",
    tags: ["Next.js", "Recharts", "Framer Motion", "PostgreSQL"],
    github: "https://github.com/Ferituaku",
    demo: "#",
  },
  {
    id: 4,
    title: "3D Web Experience",
    description: "Immersive 3D web experience using Three.js and React Three Fiber with interactive elements.",
    tags: ["Three.js", "React Three Fiber", "WebGL", "GLSL"],
    github: "https://github.com/Ferituaku",
    demo: "#",
  },
  {
    id: 5,
    title: "Mobile App Design",
    description: "End-to-end mobile app design with prototyping, user research, and design system documentation.",
    tags: ["Figma", "UI/UX", "Prototyping", "Design System"],
    github: "https://github.com/Ferituaku",
    demo: "#",
  },
  {
    id: 6,
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.",
    tags: ["Next.js", "Stripe", "Supabase", "TypeScript"],
    github: "https://github.com/Ferituaku",
    demo: "#",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export function Projects() {
  return (
    <section id="projects" className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-balance">Featured Projects</h2>
          <p className="text-lg text-foreground/60 max-w-2xl">
            A selection of my recent work showcasing my expertise in design, development, and AI integration.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <Card className="group h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-border/50 hover:border-accent/50">
                <div className="flex-1 p-6 flex flex-col">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-foreground/60 text-sm mb-4 flex-1">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="px-6 pb-6 flex gap-3 border-t border-border/50 pt-4">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-accent transition-colors"
                    whileHover={{ x: 2 }}
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </motion.a>
                  <motion.a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-accent transition-colors"
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
  )
}
