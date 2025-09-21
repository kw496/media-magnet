import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Rocket, X } from 'lucide-react';
interface StickyFooterCTAProps {
  onSubmit: (website: string) => void;
  isVisible: boolean;
  onClose: () => void;
}
export const StickyFooterCTA = ({
  onSubmit,
  isVisible,
  onClose
}: StickyFooterCTAProps) => {
  const [website, setWebsite] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (website.trim()) {
      onSubmit(website.trim());
    }
  };
  if (!isVisible) return null;
  return <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border shadow-lg z-50 smooth-transition">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 mr-4">
            <form onSubmit={handleSubmit} className="space-y-3">
              <Input 
                type="url" 
                placeholder="Enter your startup website" 
                value={website} 
                onChange={e => setWebsite(e.target.value)} 
                className="w-full h-12 text-lg input-glow smooth-transition border-2 focus:border-primary" 
                required 
              />
              <Button type="submit" variant="hero" size="lg" className="font-normal">
                Find my journalists <Rocket className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="ml-2 p-2 self-start"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>;
};