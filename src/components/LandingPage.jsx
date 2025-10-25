import Navigation from './landing/Navigation';
import HeroSection from './landing/HeroSection';
import FeaturesSection from './landing/FeaturesSection';
import ToolsSection from './landing/ToolsSection';
import MovingPlansSection from './landing/MovingPlansSection';
import HowItWorksSection from './landing/HowItWorksSection';
import CTASection from './landing/CTASection';
import Footer from './landing/Footer';
import ClientFeedbackSection from './landing/ClientFeedbackSection';
import FAQSection from './landing/FAQSection';

import Chatbot from './landing/Chatbot';
import WhyChooseUs from './landing/WhyChooseUs';

export default function LandingPage({ onNavigate }) {
  return (
    <div className="min-h-screen bg-white">
      <Navigation onNavigate={onNavigate} />
      <HeroSection onNavigate={onNavigate} />
      <FeaturesSection />
      <ToolsSection onNavigate={onNavigate} />
      <MovingPlansSection />
      <WhyChooseUs />
      <ClientFeedbackSection />
      <FAQSection />
      <HowItWorksSection />
      <CTASection onNavigate={onNavigate} />
      <Footer onNavigate={onNavigate} />
      <Chatbot />
    </div>
  );
}
