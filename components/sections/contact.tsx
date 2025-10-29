"use client"

import { motion } from "framer-motion"
import { Mail, Linkedin, Github, ArrowRight } from "lucide-react"

export function Contact() {
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

  return (
    <section id="contact" className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-balance">Let's Build Something Amazing</h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            I'm always interested in hearing about new projects and opportunities. Feel free to reach out!
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Email */}
          <motion.a
            href="mailto:contact@alferro.dev"
            variants={itemVariants}
            className="group p-6 rounded-lg border border-border/50 hover:border-accent/50 transition-all hover:shadow-lg"
            whileHover={{ y: -4 }}
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <Mail className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold">Email</h3>
            </div>
            <p className="text-foreground/60 text-sm mb-3">contact@alferro.dev</p>
            <div className="flex items-center gap-2 text-accent text-sm font-medium group-hover:gap-3 transition-all">
              Send Email <ArrowRight className="w-4 h-4" />
            </div>
          </motion.a>

          {/* LinkedIn */}
          <motion.a
            href="https://linkedin.com/in/alferro"
            target="_blank"
            rel="noopener noreferrer"
            variants={itemVariants}
            className="group p-6 rounded-lg border border-border/50 hover:border-accent/50 transition-all hover:shadow-lg"
            whileHover={{ y: -4 }}
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <Linkedin className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold">LinkedIn</h3>
            </div>
            <p className="text-foreground/60 text-sm mb-3">Connect with me</p>
            <div className="flex items-center gap-2 text-accent text-sm font-medium group-hover:gap-3 transition-all">
              Visit Profile <ArrowRight className="w-4 h-4" />
            </div>
          </motion.a>

          {/* GitHub */}
          <motion.a
            href="https://github.com/Ferituaku"
            target="_blank"
            rel="noopener noreferrer"
            variants={itemVariants}
            className="group p-6 rounded-lg border border-border/50 hover:border-accent/50 transition-all hover:shadow-lg"
            whileHover={{ y: -4 }}
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <Github className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold">GitHub</h3>
            </div>
            <p className="text-foreground/60 text-sm mb-3">View my projects</p>
            <div className="flex items-center gap-2 text-accent text-sm font-medium group-hover:gap-3 transition-all">
              Visit GitHub <ArrowRight className="w-4 h-4" />
            </div>
          </motion.a>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="mailto:contact@alferro.dev"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground rounded-lg font-semibold hover:shadow-lg transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Available for Freelance Projects
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
