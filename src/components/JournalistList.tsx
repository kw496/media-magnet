import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp, Mail, Twitter, Linkedin } from 'lucide-react';

interface Journalist {
  id: string;
  name: string;
  outlet: string;
  prestige: number;
  beat: string;
  email: string;
  twitter?: string;
  linkedin?: string;
  personalizedPitch: string;
}

interface JournalistListProps {
  website: string;
}

export const JournalistList = ({ website }: JournalistListProps) => {
  const [expandedJournalists, setExpandedJournalists] = useState<Set<string>>(new Set());

  // Mock journalist data (would be generated based on website in real app)
  const journalists: Journalist[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      outlet: 'Wall Street Journal',
      prestige: 95,
      beat: 'Enterprise Technology',
      email: 'sarah.chen@wsj.com',
      twitter: '@sarahchenWSJ',
      linkedin: 'sarah-chen-wsj',
      personalizedPitch: `Hi Sarah,\n\nI noticed your recent piece on enterprise automation tools and how they're reshaping supply chain management. Based on ${website}, I believe you'd be interested in our approach to AI-driven logistics optimization.\n\nOur platform has helped companies like [similar to your industry] reduce operational costs by 35% while improving delivery times. The timing feels right given your coverage of the logistics tech space.\n\nWould you be open to a brief conversation about how AI is transforming this traditionally manual industry?\n\nBest regards,\n[Your name]`
    },
    {
      id: '2',
      name: 'Michael Rodriguez',
      outlet: 'TechCrunch',
      prestige: 92,
      beat: 'AI & Machine Learning',
      email: 'm.rodriguez@techcrunch.com',
      twitter: '@mrodriguezTC',
      personalizedPitch: `Hey Michael,\n\nYour recent coverage of AI startups disrupting traditional industries caught my attention. ${website} represents exactly this trend - we're using machine learning to solve problems that have plagued logistics for decades.\n\nWe've recently closed our Series A and are seeing 300% growth month-over-month. Our approach to predictive analytics in supply chain might fit well with your ongoing coverage of practical AI applications.\n\nInterested in an exclusive look at our technology?\n\nThanks,\n[Your name]`
    },
    {
      id: '3',
      name: 'Jennifer Walsh',
      outlet: 'Forbes',
      prestige: 89,
      beat: 'Startups & Entrepreneurship',
      email: 'jwalsh@forbes.com',
      twitter: '@jenwalshforbes',
      linkedin: 'jennifer-walsh-forbes',
      personalizedPitch: `Dear Jennifer,\n\nI've been following your "Future of Work" series, particularly your piece on how startups are reimagining traditional business processes. ${website} embodies this transformation in the logistics space.\n\nWhat makes our story unique is our founder's background (former logistics exec) and our no-pay-unless-results business model - something that might resonate with your entrepreneurship coverage.\n\nWould love to share our journey and metrics if you're interested.\n\nBest,\n[Your name]`
    },
    {
      id: '4',
      name: 'David Kim',
      outlet: 'Business Insider',
      prestige: 85,
      beat: 'Transportation & Logistics',
      email: 'dkim@businessinsider.com',
      twitter: '@davidkimBI',
      personalizedPitch: `Hi David,\n\nYour recent analysis of logistics disruption timing couldn't be more relevant. ${website} is at the center of this shift, helping traditional logistics companies adopt AI without the typical 18-month implementation cycles.\n\nWe've got some compelling data on adoption rates and cost savings that might interest your readers. Plus, our client case studies show real-world impact.\n\nOpen to sharing more details?\n\nRegards,\n[Your name]`
    },
    {
      id: '5',
      name: 'Amanda Foster',
      outlet: 'Washington Post',
      prestige: 87,
      beat: 'Technology & Society',
      email: 'amanda.foster@washpost.com',
      linkedin: 'amanda-foster-washpost',
      personalizedPitch: `Hello Amanda,\n\nYour coverage of technology's impact on traditional industries aligns perfectly with ${website}'s mission. We're not just another AI startup - we're focused on making advanced technology accessible to mid-market companies.\n\nOur approach addresses the "AI divide" you've written about, helping smaller logistics companies compete with tech giants. Would love to discuss how we're democratizing AI access.\n\nBest,\n[Your name]`
    }
  ];

  const toggleExpanded = (journalistId: string) => {
    const newExpanded = new Set(expandedJournalists);
    if (newExpanded.has(journalistId)) {
      newExpanded.delete(journalistId);
    } else {
      newExpanded.add(journalistId);
    }
    setExpandedJournalists(newExpanded);
  };

  const getPrestigeBadgeColor = (prestige: number) => {
    if (prestige >= 90) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    if (prestige >= 85) return 'bg-blue-100 text-blue-800 border-blue-200';
    return 'bg-green-100 text-green-800 border-green-200';
  };

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Your Personalized Journalist List
          </h2>
          <p className="text-lg text-muted-foreground">
            Ranked by prestige and relevance to {website}
          </p>
        </div>

        <div className="space-y-4">
          {journalists.map((journalist) => (
            <Card key={journalist.id} className="card-shadow hover-scale smooth-transition">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-foreground">{journalist.name}</h3>
                      <Badge className={`${getPrestigeBadgeColor(journalist.prestige)} font-semibold`}>
                        {journalist.outlet}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        Prestige: {journalist.prestige}/100
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-3">{journalist.beat}</p>
                    
                    <div className="flex items-center gap-4">
                      <a 
                        href={`mailto:${journalist.email}`}
                        className="inline-flex items-center gap-2 text-primary hover:text-primary-glow smooth-transition"
                      >
                        <Mail className="h-4 w-4" />
                        Email
                      </a>
                      {journalist.twitter && (
                        <a 
                          href={`https://twitter.com/${journalist.twitter.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-primary hover:text-primary-glow smooth-transition"
                        >
                          <Twitter className="h-4 w-4" />
                          Twitter
                        </a>
                      )}
                      {journalist.linkedin && (
                        <a 
                          href={`https://linkedin.com/in/${journalist.linkedin}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-primary hover:text-primary-glow smooth-transition"
                        >
                          <Linkedin className="h-4 w-4" />
                          LinkedIn
                        </a>
                      )}
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleExpanded(journalist.id)}
                    className="ml-4"
                  >
                    {expandedJournalists.has(journalist.id) ? (
                      <>
                        Hide Email <ChevronUp className="ml-2 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        View Email <ChevronDown className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>

                {expandedJournalists.has(journalist.id) && (
                  <div className="mt-6 pt-6 border-t border-border">
                    <h4 className="font-semibold text-foreground mb-3">Personalized Email Draft:</h4>
                    <div className="bg-muted p-4 rounded-lg">
                      <pre className="whitespace-pre-wrap text-sm text-muted-foreground font-mono">
                        {journalist.personalizedPitch}
                      </pre>
                    </div>
                    <div className="mt-4 flex gap-3">
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => navigator.clipboard.writeText(journalist.personalizedPitch)}
                      >
                        Copy Email
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(`mailto:${journalist.email}?subject=Story opportunity - ${website}&body=${encodeURIComponent(journalist.personalizedPitch)}`)}
                      >
                        Send Email
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};