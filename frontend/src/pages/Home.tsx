import Hero from "../components/Hero";
import AboutSection from "../components/About";
import ProjectsCarousel from "../components/ProjectsCarousel";
import Stack from "../components/Stack";
import GameSection from "../components/GameSection";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ProjectsCarousel />
      <Stack />
      <GameSection />
    </>
  );
}