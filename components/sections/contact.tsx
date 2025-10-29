// components/sections/contact.tsx
"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github, ArrowRight } from "lucide-react";

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
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen py-20 sm:py-32 px-4 sm:px-6 lg:px-8 flex items-center"
    >
      {/* Background linear */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/30 to-black/50 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-balance">
            <span className="bg-clip-text text-transparent bg-linear-to-r from-white via-pink-200 to-orange-300">
              Let's Build Something Amazing
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            I'm always interested in hearing about new projects and
            opportunities. Feel free to reach out!
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
            className="group p-8 rounded-2xl backdrop-blur-sm bg-white/5 border border-white/10 hover:border-cyan-500/30 hover:bg-white/10 transition-all duration-300"
            whileHover={{ y: -8, scale: 1.02 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl bg-linear-to-br from-blue-500/20 to-cyan-500/20 border border-blue-400/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="font-semibold text-lg text-white">Email</h3>
            </div>
            <p className="text-gray-300 text-sm mb-4">ferismegg123@gmail.com</p>
            <div className="flex items-center gap-2 text-cyan-400 text-sm font-medium group-hover:gap-3 transition-all">
              Send Email <ArrowRight className="w-4 h-4" />
            </div>
          </motion.a>

          {/* LinkedIn */}
          <motion.a
            href="https://www.linkedin.com/in/al-ferro-putra-yusanda-341ab2270"
            target="_blank"
            rel="noopener noreferrer"
            variants={itemVariants}
            className="group p-8 rounded-2xl backdrop-blur-sm bg-white/5 border border-white/10 hover:border-cyan-500/30 hover:bg-white/10 transition-all duration-300"
            whileHover={{ y: -8, scale: 1.02 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl bg-linear-to-br from-blue-500/20 to-cyan-500/20 border border-blue-400/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Linkedin className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="font-semibold text-lg text-white">LinkedIn</h3>
            </div>
            <p className="text-gray-300 text-sm mb-4">Connect with me</p>
            <div className="flex items-center gap-2 text-cyan-400 text-sm font-medium group-hover:gap-3 transition-all">
              Visit Profile <ArrowRight className="w-4 h-4" />
            </div>
          </motion.a>

          {/* GitHub */}
          <motion.a
            href="https://github.com/Ferituaku"
            target="_blank"
            rel="noopener noreferrer"
            variants={itemVariants}
            className="group p-8 rounded-2xl backdrop-blur-sm bg-white/5 border border-white/10 hover:border-cyan-500/30 hover:bg-white/10 transition-all duration-300"
            whileHover={{ y: -8, scale: 1.02 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl bg-linear-to-br from-blue-500/20 to-cyan-500/20 border border-blue-400/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Github className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="font-semibold text-lg text-white">GitHub</h3>
            </div>
            <p className="text-gray-300 text-sm mb-4">View my projects</p>
            <div className="flex items-center gap-2 text-cyan-400 text-sm font-medium group-hover:gap-3 transition-all">
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
            href="mailto:ferismegg123@gmail.com"
            className="inline-flex items-center gap-3 px-10 py-5 bg-linear-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all text-lg"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Available for Freelance Projects
            <ArrowRight className="w-5 h-5" />
          </motion.a>
          <motion.p
            className="mt-6 text-gray-400 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Notice how the background transformed as you scrolled? That's the
            kind of attention to detail I bring to every project.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
