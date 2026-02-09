import { lazy, Suspense } from 'react';
import LandingNav from '@/components/landing/LandingNav';
import HeroSection from '@/components/landing/HeroSection';

const WhyUsSection = lazy(() => import('@/components/landing/WhyUsSection'));
const MethodSection = lazy(() => import('@/components/landing/MethodSection'));
const CEFRCanDoSection = lazy(() => import('@/components/landing/CEFRCanDoSection'));
const VocabPreviewSection = lazy(() => import('@/components/landing/VocabPreviewSection'));
const RoadmapSection = lazy(() => import('@/components/landing/RoadmapSection'));
const PricingSection = lazy(() => import('@/components/landing/PricingSection'));
const TestimonialsSection = lazy(() => import('@/components/landing/TestimonialsSection'));
const FinalCTA = lazy(() => import('@/components/landing/FinalCTA'));
const ContactSection = lazy(() => import('@/components/landing/ContactSection'));
const LandingFooter = lazy(() => import('@/components/landing/LandingFooter'));

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <LandingNav />
      <HeroSection />
      <Suspense fallback={null}>
        <WhyUsSection />
        <MethodSection />
        <CEFRCanDoSection />
        <VocabPreviewSection />
        <RoadmapSection />
        <PricingSection />
        <TestimonialsSection />
        <FinalCTA />
        <ContactSection />
        <LandingFooter />
      </Suspense>
    </div>
  );
};

export default LandingPage;
