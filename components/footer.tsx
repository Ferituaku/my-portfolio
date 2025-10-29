"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8 bg-black/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left - Copyright */}
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-sm text-gray-300 flex items-center gap-2 justify-center md:justify-start">
              © {currentYear} Al Ferro Putra Yusanda. Crafted with{" "}
              <Heart className="w-4 h-4 text-red-400 fill-red-400" /> using
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Next.js, React Three Fiber, Framer Motion & Tailwind CSS
            </p>
          </motion.div>

          {/* Right - Social Links */}
          <motion.div
            className="flex items-center gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <motion.a
              href="https://github.com/Ferituaku"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-gray-300 hover:text-cyan-300 hover:border-cyan-400/30 hover:bg-white/10 transition-all"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-5 h-5" />
              <span className="sr-only">GitHub</span>
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/al-ferro-putra-yusanda-341ab2270"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-gray-300 hover:text-cyan-300 hover:border-cyan-400/30 hover:bg-white/10 transition-all"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin className="w-5 h-5" />
              <span className="sr-only">LinkedIn</span>
            </motion.a>
            <motion.a
              href="mailto:ferismegg123@gmail.com"
              className="w-10 h-10 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-gray-300 hover:text-cyan-300 hover:border-cyan-400/30 hover:bg-white/10 transition-all"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="w-5 h-5" />
              <span className="sr-only">Email</span>
            </motion.a>
          </motion.div>
        </div>

        {/* Scroll to top hint */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <a
            href="#home"
            className="text-xs text-gray-400 hover:text-cyan-300 transition-colors"
          >
            Scroll back to top to see the animation reverse ↑
          </a>
        </motion.div>
      </div>
    </footer>
  );
}
