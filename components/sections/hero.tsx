"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { LiquidMeshScene } from "@/components/3d/liquid-mesh";
import { ArrowDown } from "lucide-react";
import { useRef, useState } from "react";
import { MagneticCharacter } from "@/components/MagneticCharacter";

export function Hero() {
  const [isHoveringFirstName, setIsHoveringFirstName] = useState(false);
  const [isHoveringLastName, setIsHoveringLastName] = useState(false);

  const [ripples, setRipples] = useState<
    { x: number; y: number; id: number }[]
  >([]);
  // State HANYA untuk partikel. Ini jauh lebih ringan.
  const [particlePos, setParticlePos] = useState({ x: 0, y: 0 });

  const [firstNameParticlePos, setFirstNameParticlePos] = useState({
    x: 0,
    y: 0,
  });
  const [lastNameParticlePos, setLastNameParticlePos] = useState({
    x: 0,
    y: 0,
  });

  const heroRef = useRef<HTMLDivElement>(null);
  const firstNameRef = useRef<HTMLDivElement>(null);
  const lastNameRef = useRef<HTMLDivElement>(null);

  // --- Mouse untuk Hero Section (Tilt & Spotlight Utama) ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const normalizedX = useMotionValue(0);
  const normalizedY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 100, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  const smoothNormX = useSpring(normalizedX, springConfig);
  const smoothNormY = useSpring(normalizedY, springConfig);

  const firstNameMouseX = useMotionValue(0);
  const firstNameMouseY = useMotionValue(0);

  // Separate mouse tracking for last name
  const lastNameMouseX = useMotionValue(0);
  const lastNameMouseY = useMotionValue(0);

  // 3D Tilt effect (sekarang menggunakan nilai ternormalisasi)
  const rotateX = useTransform(smoothNormY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(smoothNormX, [-0.5, 0.5], [-10, 10]);

  // Template untuk masking & glow yang performan
  // const maskImage = useMotionTemplate`radial-gradient(circle 200px at ${nameMouseX}px ${nameMouseY}px, black 0%, transparent 70%)`;
  // const glowBg = useMotionTemplate`radial-gradient(circle 250px at ${nameMouseX}px ${nameMouseY}px, rgba(59, 130, 246, 0.6), transparent)`;
  const lastNameMaskImage = useMotionTemplate`radial-gradient(circle 200px at ${lastNameMouseX}px ${lastNameMouseY}px, black 0%, transparent 70%)`;
  const lastNameGlowBg = useMotionTemplate`radial-gradient(circle 250px at ${lastNameMouseX}px ${lastNameMouseY}px, rgba(59, 130, 246, 0.6), transparent)`;

  // Event handler untuk mouse di hero section
  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      mouseX.set(x);
      mouseY.set(y);
      normalizedX.set(x / rect.width - 0.5);
      normalizedY.set(y / rect.height - 0.5);
    }
  };

  // Event handler untuk mouse di container nama
  // const handleNameMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  //   if (nameContainerRef.current) {
  //     const rect = nameContainerRef.current.getBoundingClientRect();
  //     const relativeX = e.clientX - rect.left;
  //     const relativeY = e.clientY - rect.top;

  //     nameMouseX.set(relativeX);
  //     nameMouseY.set(relativeY);

  //     // Update particle position (relative to name container)
  //     setParticlePos({ x: relativeX, y: relativeY });
  //   }
  // };
  const handleFirstNameMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // Prevent bubbling
    if (firstNameRef.current) {
      const rect = firstNameRef.current.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const relativeY = e.clientY - rect.top;

      firstNameMouseX.set(relativeX);
      firstNameMouseY.set(relativeY);
      setFirstNameParticlePos({ x: relativeX, y: relativeY });
    }
  };

  // Mouse move handler untuk LAST NAME
  const handleLastNameMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // Prevent bubbling
    if (lastNameRef.current) {
      const rect = lastNameRef.current.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const relativeY = e.clientY - rect.top;

      lastNameMouseX.set(relativeX);
      lastNameMouseY.set(relativeY);
      setLastNameParticlePos({ x: relativeX, y: relativeY });
    }
  };

  // Event handler untuk klik (ripple)
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect();
      // Get position relative to hero section
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const newRipple = { x, y, id: Date.now() };
      setRipples((prev) => [...prev, newRipple]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 1000);
    }
  };

  const firstName = "Al Ferro Putra";
  const lastName = "Yusanda";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.3,
      },
    },
  };

  // const charVariants = {
  //   hidden: { opacity: 0, y: 50, rotateX: -90 },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     rotateX: 0,
  //     transition: {
  //       type: "spring",
  //       damping: 12,
  //       stiffness: 100,
  //     },
  //   },
  // };

  // const itemVariants = {
  //   hidden: { opacity: 0, y: 20 },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     transition: {
  //       duration: 0.8,
  //       ease: [0.22, 1, 0.36, 1],
  //     },
  //   },
  // };

  return (
    <motion.section
      ref={heroRef}
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      style={{ perspective: "1000px" }}
      onMouseMove={handleHeroMouseMove}
      onClick={handleClick}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/40 to-black/70 pointer-events-none" />

      {/* Dynamic Spotlight */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          background: useMotionTemplate`radial-gradient(600px circle at ${smoothX}px ${smoothY}px, rgba(59, 130, 246, 0.15), transparent 40%)`,
        }}
      />

      {/* Click Ripples */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="absolute rounded-full border-2 border-cyan-400 pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
          }}
          initial={{ width: 0, height: 0, opacity: 1, x: "-50%", y: "-50%" }}
          animate={{
            width: 100,
            height: 100,
            opacity: 0,
            x: "-50%",
            y: "-50%",
          }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      ))}

      {/* Content  */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 pb-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              },
            },
          }}
          className="mb-6"
        >
          <motion.span
            className="inline-block px-4 py-2 rounded-full bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 text-blue-300 text-sm font-medium cursor-pointer"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            data-cursor="👋 Hi there!"
          >
            <motion.span
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                background: "linear-gradient(90deg, #60a5fa, #22d3ee, #60a5fa)",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Welcome to my portfolio
            </motion.span>
          </motion.span>
        </motion.div>

        {/* Animated Name */}
        <div className="mb-6 relative">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-9xl font-bold tracking-tight select-none">
            {/* First Name - only */}
            <motion.div
              ref={firstNameRef}
              className="relative inline-flex flex-wrap justify-center gap-2 leading-[0.9] mb-4"
              variants={containerVariants}
              onMouseMove={handleFirstNameMouseMove}
              onMouseEnter={() => setIsHoveringFirstName(true)}
              onMouseLeave={() => setIsHoveringFirstName(false)}
            >
              {/* Contrast strokes for light / dark mode */}

              {/* actual glyphs with theme-aware gradient fills */}
              {firstName.split("").map((char, index) => (
                <motion.span
                  key={`first-${index}`}
                  variants={{
                    hidden: { opacity: 0, y: 50, rotateX: -90 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      rotateX: 0,
                      transition: {
                        type: "spring",
                        damping: 12,
                        stiffness: 100,
                      },
                    },
                  }}
                  className="relative z-10 inline-block cursor-default transition-all duration-150 font-bold"
                  whileHover={{
                    scale: 1.05,
                    textShadow: "0 0 20px rgba(59,130,246,0.8)",
                  }}
                >
                  <span className="bg-clip-text text-transparent bg-linear-to-r from-sky-500 via-sky-600 to-cyan-500 dark:from-cyan-300 dark:via-purple-300 dark:to-sky-300">
                    {char === " " ? "\u00A0" : char}
                  </span>
                </motion.span>
              ))}
            </motion.div>

            {/* Last Name - Pakai Komponen Baru */}
            <div
              ref={lastNameRef}
              className="relative inline-block leading-[0.9]"
              onMouseMove={handleLastNameMouseMove}
              onMouseEnter={() => setIsHoveringLastName(true)}
              onMouseLeave={() => setIsHoveringLastName(false)}
            >
              {/* Base Layer */}
              <motion.div className="relative">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {/* Dark-mode stroke */}
                  <div className="hidden dark:flex gap-0 text-white font-bold leading-[0.9]">
                    {lastName.split("").map((char, idx) => (
                      <span
                        key={`last-stroke-dark-${idx}`}
                        aria-hidden
                        className="inline-block select-none"
                        style={{
                          WebkitTextStroke: "2px rgba(59,130,246,0.3)",
                          WebkitTextFillColor: "transparent",
                          paintOrder: "stroke fill",
                        }}
                      >
                        {char === " " ? "\u00A0" : char}
                      </span>
                    ))}
                  </div>

                  {/* Light-mode stroke */}
                  <div className="flex dark:hidden gap-0 text-black font-bold leading-[0.9]">
                    {lastName.split("").map((char, idx) => (
                      <span
                        key={`last-stroke-light-${idx}`}
                        aria-hidden
                        className="inline-block select-none"
                        style={{
                          WebkitTextStroke: "2px rgba(0,0,0,0.3)",
                          WebkitTextFillColor: "transparent",
                          paintOrder: "stroke fill",
                        }}
                      >
                        {char === " " ? "\u00A0" : char}
                      </span>
                    ))}
                  </div>
                </div>
                {lastName.split("").map((char, index) => (
                  <MagneticCharacter
                    key={`last-base-${index}`}
                    char={char}
                    variants={{
                      hidden: { opacity: 0, y: 50, rotateX: -90 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                        transition: {
                          type: "spring",
                          damping: 12,
                          stiffness: 100,
                        },
                      },
                    }}
                    isHovering={isHoveringLastName}
                    mouseX={lastNameMouseX}
                    mouseY={lastNameMouseY}
                    className=" bg-linear-to-r hidden bg-clip-text text-transparent cursor-default"
                  />
                ))}
              </motion.div>

              {/* Spotlight Masking Layer */}
              <motion.div
                className="absolute inset-0 overflow-hidden"
                style={{
                  maskImage: lastNameMaskImage,
                  WebkitMaskImage: lastNameMaskImage,
                  opacity: isHoveringLastName ? 1 : 0,
                }}
              >
                {lastName.split("").map((char, index) => (
                  <MagneticCharacter
                    key={`last-mask-${index}`}
                    char={char}
                    isHovering={isHoveringLastName}
                    mouseX={lastNameMouseX}
                    mouseY={lastNameMouseY}
                    className="inline-block font-bold"
                    style={{
                      background:
                        "linear-gradient(45deg, #22d3ee, #a855f7, #ec4899)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundSize: "200% 200%",
                    }}
                    // Hapus variants agar tidak bentrok dgn magnetic
                  />
                ))}
              </motion.div>

              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 blur-3xl"
                style={{
                  background: lastNameGlowBg,
                  pointerEvents: "none",
                }}
                animate={{
                  opacity: isHoveringLastName ? 1 : 0.3,
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </h1>
        </div>
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              },
            },
          }}
          className="text-xl sm:text-2xl lg:text-3xl text-gray-200 mb-8 max-w-3xl mx-auto text-balance font-light"
        >
          <motion.span
            className="inline-block bg-linear-to-r from-gray-200 via-white to-gray-200 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 5, repeat: Infinity }}
            style={{ backgroundSize: "200% 200%" }}
          >
            UI/UX Designer & Generative AI Engineer
          </motion.span>
        </motion.p>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              },
            },
          }}
          className="text-base sm:text-lg lg:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Crafting beautiful, interactive digital experiences with modern design
          principles and cutting-edge technology.
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              },
            },
          }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.a
            href="#projects"
            className="group relative px-8 py-4 bg-linear-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold shadow-lg overflow-hidden cursor-pointer"
            whileHover={{
              scale: 1.05,
              y: -2,
              boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            data-cursor="View Work"
          >
            <span className="relative z-10">View My Work</span>
            <motion.div
              className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-0 bg-linear-to-r from-cyan-500 to-purple-500"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>

          <motion.a
            href="#contact"
            className="group relative px-8 py-4 border-2 border-white/30 backdrop-blur-sm text-white rounded-lg font-semibold overflow-hidden cursor-pointer"
            whileHover={{
              scale: 1.05,
              y: -2,
              borderColor: "rgba(255, 255, 255, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            data-cursor="Contact"
          >
            <span className="relative z-10">Get in Touch</span>
            <motion.div
              className="absolute inset-0 bg-white/10"
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.2 }}
        data-cursor="Scroll Down"
      >
        <span className="text-xs text-white/60 font-medium tracking-wider uppercase">
          Scroll
        </span>
        <motion.div
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(59, 130, 246, 0.4)",
              "0 0 0 15px rgba(59, 130, 246, 0)",
            ],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="rounded-full p-2"
        >
          <ArrowDown className="w-5 h-5 text-white/60" />
        </motion.div>
      </motion.div>

      {/* Ambient Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`ambient-${i}`}
            className="absolute w-2 h-2 bg-cyan-400/20 rounded-full blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, (Math.random() - 0.5) * 200],
              y: [0, (Math.random() - 0.5) * 200],
              scale: [1, 2, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.section>
  );
}
