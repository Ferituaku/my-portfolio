import { Hero } from "@/components/sections/hero"
import { Projects } from "@/components/sections/projects"
import { TechStack } from "@/components/sections/tech-stack"
import { Contact } from "@/components/sections/contact"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Projects />
      <TechStack />
      <Contact />
    </main>
  )
}
