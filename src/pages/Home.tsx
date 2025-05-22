
import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { Pricing } from "@/components/home/Pricing";
import { OnboardingCTA } from "@/components/home/OnboardingCTA";
import { useAuth } from "@/hooks/useAuth";

const Home = () => {
  const { user } = useAuth();

  return (
    <>
      <Hero />
      <Features />
      {user && <OnboardingCTA />}
      <Pricing />
    </>
  );
};

export default Home;
