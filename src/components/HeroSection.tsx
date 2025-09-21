import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Rocket } from 'lucide-react';
import emailScreenshot from '@/assets/email-screenshot.jpg';
import wsjArticle from '@/assets/wsj-article.jpg';
interface HeroSectionProps {
  onSubmit: (website: string) => void;
}
export const HeroSection = ({
  onSubmit
}: HeroSectionProps) => {
  const [website, setWebsite] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (website.trim()) {
      onSubmit(website.trim());
    }
  };
  return <section className="bg-background py-20 lg:py-32">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-black text-foreground leading-tight">
                I landed{' '}
                <span className="text-primary">TechCrunch</span>,{' '}
                <br />
                <span className="text-primary">Wall Street Journal</span>, and{' '}
                <span className="text-primary">Forbes</span> without spending a dime.
              </h1>
              
              <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed">We help founders secure real media coverage. No PR firm required.</p>
            </div>

            {/* CTA Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col gap-4">
                <Input type="url" placeholder="Enter your startup website..." value={website} onChange={e => setWebsite(e.target.value)} className="w-full h-14 text-lg input-glow smooth-transition border-2 focus:border-primary" required />
                <Button type="submit" variant="hero" size="default" className="font-normal w-2/5">
                  Find my journalists <Rocket className="ml-2 h-5 w-5" />
                </Button>
              </div>
              
            </form>

            {/* Guarantee */}
            <div className="inline-flex items-center gap-2 bg-success/10 text-success-foreground px-4 py-2 rounded-full border border-success/20">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="font-semibold">You don't pay unless you get covered</span>
            </div>
          </div>

          {/* Right Visual */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div className="card-shadow rounded-2xl overflow-hidden hover-scale smooth-transition">
                <img src={emailScreenshot} alt="Email to WSJ reporter" className="w-full h-auto" />
              </div>
              <div className="card-shadow rounded-2xl overflow-hidden hover-scale smooth-transition">
                <img src={wsjArticle} alt="WSJ article coverage" className="w-full h-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};