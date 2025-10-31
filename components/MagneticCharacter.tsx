import {
  motion,
  useSpring,
  useMotionValueEvent,
  MotionValue,
  HTMLMotionProps,
} from "framer-motion";
import { useRef, useEffect } from "react";

type MagneticCharacterProps = HTMLMotionProps<"span"> & {
  char: string;
  isHovering: boolean;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  className?: string;
};

export function MagneticCharacter({
  char,
  isHovering,
  mouseX,
  mouseY,
  className,
  ...props
}: MagneticCharacterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  
  // Spring untuk posisi x dan y karakter
  const x = useSpring(0, { stiffness: 150, damping: 20, mass: 0.1 });
  const y = useSpring(0, { stiffness: 150, damping: 20, mass: 0.1 });

  // Reset spring saat mouse meninggalkan container
  useEffect(() => {
    if (!isHovering) {
      x.set(0);
      y.set(0);
    }
  }, [isHovering, x, y]);

  // Dengarkan perubahan pada motion value mouseX (lebih performan dari useEffect)
  useMotionValueEvent(mouseX, "change", (latestX) => {
    if (isHovering && ref.current) {
      // Dapatkan posisi karakter RELATIF terhadap container-nya
      // offsetLeft/Top jauh lebih cepat daripada getBoundingClientRect
      const charX = ref.current.offsetLeft + ref.current.offsetWidth / 2;
      const charY = ref.current.offsetTop + ref.current.offsetHeight / 2;

      // Dapatkan posisi mouse Y (kita sudah punya X dari event)
      const latestY = mouseY.get();

      const distance = Math.sqrt(
        Math.pow(latestX - charX, 2) + Math.pow(latestY - charY, 2)
      );

      const maxDistance = 150; // Sesuaikan jangkauan magnet
      const strength = Math.max(0, 1 - distance / maxDistance);
      const pullX = (latestX - charX) * strength * 0.5; // Sesuaikan kekuatan
      const pullY = (latestY - charY) * strength * 0.5;

      // Set nilai spring
      x.set(pullX);
      y.set(pullY);
    }
  });

  // Dengarkan juga perubahan mouseY untuk meng-update Y
  useMotionValueEvent(mouseY, "change", (latestY) => {
    if (isHovering && ref.current) {
      const charX = ref.current.offsetLeft + ref.current.offsetWidth / 2;
      const charY = ref.current.offsetTop + ref.current.offsetHeight / 2;
      const latestX = mouseX.get();

      const distance = Math.sqrt(
        Math.pow(latestX - charX, 2) + Math.pow(latestY - charY, 2)
      );

      const maxDistance = 150;
      const strength = Math.max(0, 1 - distance / maxDistance);
      const pullX = (latestX - charX) * strength * 0.5;
      const pullY = (latestY - charY) * strength * 0.5;

      x.set(pullX);
      y.set(pullY);
    }
  });

  return (
    <motion.span
      ref={ref}
      className={className}
      // Terapkan spring ke transform
      style={{ x, y, display: "inline-block" }}
      {...props}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
}