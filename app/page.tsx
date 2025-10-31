import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { TechStack } from "@/components/sections/tech-stack";
import { Contact } from "@/components/sections/contact";
import { LiquidMeshScene } from "@/components/3d/liquid-mesh";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* 3D Background */}
      <div className="fixed inset-0 -z-10">
        <LiquidMeshScene />
      </div>
      <Hero />
      <Projects />
      <TechStack />
      <Contact />
    </main>
  );
}
