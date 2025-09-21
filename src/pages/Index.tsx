import { useState, useEffect } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { JournalistList } from '@/components/JournalistList';
import { TrustSection } from '@/components/TrustSection';
import { TestimonialsCarousel } from '@/components/TestimonialsCarousel';
import { MidPageCTA } from '@/components/MidPageCTA';
import { StickyFooterCTA } from '@/components/StickyFooterCTA';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [submittedWebsite, setSubmittedWebsite] = useState<string | null>(null);
  const [showStickyFooter, setShowStickyFooter] = useState(false);
  const { toast } = useToast();

  // Show sticky footer when user scrolls past hero
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      setShowStickyFooter(window.scrollY > heroHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWebsiteSubmit = (website: string) => {
    setSubmittedWebsite(website);
    toast({
      title: "Generating your journalist list...",
      description: "This will take just a moment!",
      duration: 2000,
    });

    // Scroll to results after a brief delay
    setTimeout(() => {
      const resultsSection = document.getElementById('journalist-results');
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500);
  };

  const handleStickyFooterClose = () => {
    setShowStickyFooter(false);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Structured Data for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Startup Publicity Tool",
          "description": "Get press coverage in top outlets like WSJ, Forbes, TechCrunch without PR agencies or upfront costs",
          "provider": {
            "@type": "Organization",
            "name": "Startup Publicity Tool"
          },
          "serviceType": "Media Relations",
          "areaServed": "Worldwide",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Press Coverage Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Journalist List Generation",
                  "description": "Get personalized journalist lists for top media outlets"
                }
              }
            ]
          }
        })}
      </script>

      <header>
        <h1 className="sr-only">Get Press Coverage in Top Outlets Without PR Agencies</h1>
      </header>

      <HeroSection onSubmit={handleWebsiteSubmit} />
    </main>
  );
};

export default Index;