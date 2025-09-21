import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Rocket, X } from 'lucide-react';

interface StickyFooterCTAProps {
  onSubmit: (website: string) => void;
  isVisible: boolean;
  onClose: () => void;
}

export const StickyFooterCTA = ({ onSubmit, isVisible, onClose }: StickyFooterCTAProps) => {
  const [website, setWebsite] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (website.trim()) {
      onSubmit(website.trim());
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border shadow-lg z-50 smooth-transition">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="hidden sm:block">
            <h3 className="font-bold text-foreground">Ready to land press coverage?</h3>
            <p className="text-sm text-muted-foreground">Get your journalist list now</p>
          </div>
          
          <form onSubmit={handleSubmit} className="flex gap-3 flex-1 sm:flex-initial sm:w-96">
            <Input
              type="url"
              placeholder="Your startup website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="flex-1 text-lg font-bold input-glow"
              required
            />
            <Button type="submit" variant="hero" className="whitespace-nowrap">
              Find journalists <Rocket className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="ml-2"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};