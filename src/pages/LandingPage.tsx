import LandingNav from '@/components/landing/LandingNav';
import HeroSection from '@/components/landing/HeroSection';
import WhyUsSection from '@/components/landing/WhyUsSection';
import MethodSection from '@/components/landing/MethodSection';
import VocabPreviewSection from '@/components/landing/VocabPreviewSection';
import RoadmapSection from '@/components/landing/RoadmapSection';
import PricingSection from '@/components/landing/PricingSection';
import PolandSection from '@/components/landing/PolandSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import FinalCTA from '@/components/landing/FinalCTA';
import LandingFooter from '@/components/landing/LandingFooter';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <LandingNav />
      <HeroSection />
      <WhyUsSection />
      <MethodSection />
      <VocabPreviewSection />
      <RoadmapSection />
      <PricingSection />
      <PolandSection />
      <TestimonialsSection />
      <FinalCTA />
      <LandingFooter />
    </div>
  );
};

export default LandingPage;
