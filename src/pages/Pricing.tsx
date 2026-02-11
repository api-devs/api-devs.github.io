import { useEffect, useState } from 'react';
import { 
  Check, 
  Zap, 
  Shield, 
  Building2,
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import { GlassCard, PricingCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const plans = [
  {
    name: 'Starter',
    price: '$0',
    period: '/mo',
    description: 'Perfect for personal projects and experimentation.',
    features: [
      '3 projects',
      '1,000 requests/day',
      'Community support',
      'Basic analytics',
      'Standard latency',
    ],
    cta: 'Start Free',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/mo',
    description: 'For growing teams with production workloads.',
    features: [
      'Unlimited projects',
      '100,000 requests/day',
      'Priority support',
      'Advanced analytics',
      'Low latency (global CDN)',
      'Custom webhooks',
      'Team collaboration',
    ],
    cta: 'Start Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Dedicated infrastructure for large organizations.',
    features: [
      'Unlimited everything',
      'Custom rate limits',
      'Dedicated support',
      'SLA guarantee',
      'Private endpoints',
      'SSO & audit logs',
      'Custom contracts',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

const faqs = [
  {
    question: 'What happens if I exceed my request limit?',
    answer: 'We\'ll notify you when you\'re approaching your limit. You can upgrade anytime or purchase additional request packs.'
  },
  {
    question: 'Can I change my plan later?',
    answer: 'Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect immediately.'
  },
  {
    question: 'Is there a free trial for Pro?',
    answer: 'Yes! Pro plans come with a 14-day free trial. No credit card required to start.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and wire transfers for Enterprise plans.'
  },
];

export function Pricing() {
  const [mounted, setMounted] = useState(false);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [showTrialDialog, setShowTrialDialog] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const handleCtaClick = (planName: string) => {
    if (planName === 'Enterprise') {
      setShowContactDialog(true);
    } else if (planName === 'Pro') {
      setShowTrialDialog(true);
    }
  };
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div 
        className={`text-center transition-all duration-700 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <h1 className="text-4xl font-bold text-[#F4F6FF] mb-3">
          Simple pricing
        </h1>
        <p className="text-lg text-[#A6B1C9] max-w-lg mx-auto">
          Start free. Upgrade when you're ready.
        </p>
      </div>
      
      {/* Pricing Cards */}
      <div 
        className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-700 delay-100 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        {plans.map((plan) => (
          <PricingCard
            key={plan.name}
            {...plan}
            onCtaClick={() => handleCtaClick(plan.name)}
          />
        ))}
      </div>
      
      {/* Feature Comparison */}
      <div 
        className={`transition-all duration-700 delay-200 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <GlassCard size="lg">
          <h2 className="text-xl font-semibold text-[#F4F6FF] mb-6">Compare Plans</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#A6B1C9]">Feature</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-[#F4F6FF]">Starter</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-[#4F6EF7]">Pro</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-[#F4F6FF]">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Projects', starter: '3', pro: 'Unlimited', enterprise: 'Unlimited' },
                  { feature: 'Daily Requests', starter: '1,000', pro: '100,000', enterprise: 'Custom' },
                  { feature: 'Support', starter: 'Community', pro: 'Priority', enterprise: 'Dedicated' },
                  { feature: 'Analytics', starter: 'Basic', pro: 'Advanced', enterprise: 'Custom' },
                  { feature: 'Latency', starter: 'Standard', pro: 'Low (CDN)', enterprise: 'Lowest' },
                  { feature: 'Webhooks', starter: '—', pro: '✓', enterprise: '✓' },
                  { feature: 'Team Members', starter: '1', pro: '10', enterprise: 'Unlimited' },
                  { feature: 'SSO', starter: '—', pro: '—', enterprise: '✓' },
                  { feature: 'SLA', starter: '—', pro: '99.9%', enterprise: '99.99%' },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-3 px-4 text-sm text-[#F4F6FF]">{row.feature}</td>
                    <td className="text-center py-3 px-4 text-sm text-[#A6B1C9]">{row.starter}</td>
                    <td className="text-center py-3 px-4 text-sm text-[#4F6EF7] font-medium">{row.pro}</td>
                    <td className="text-center py-3 px-4 text-sm text-[#A6B1C9]">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>
      
      {/* FAQ */}
      <div 
        className={`transition-all duration-700 delay-300 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <GlassCard size="lg">
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="w-6 h-6 text-[#4F6EF7]" />
            <h2 className="text-xl font-semibold text-[#F4F6FF]">Frequently Asked Questions</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, i) => (
              <div key={i}>
                <h3 className="text-sm font-medium text-[#F4F6FF] mb-2">{faq.question}</h3>
                <p className="text-sm text-[#A6B1C9]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
      
      {/* CTA */}
      <div 
        className={`transition-all duration-700 delay-400 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <GlassCard size="lg" className="text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-[#4F6EF7]/20 to-transparent rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-[#F4F6FF] mb-3">
              Still have questions?
            </h2>
            <p className="text-[#A6B1C9] mb-6 max-w-md mx-auto">
              Our team is here to help you find the perfect plan for your needs.
            </p>
            <div className="flex justify-center gap-3">
              <Button 
                onClick={() => setShowContactDialog(true)}
                className="glass-btn-primary px-6 py-3 flex items-center gap-2"
              >
                <Building2 className="w-4 h-4" />
                Contact Sales
              </Button>
              <Button className="glass-btn px-6 py-3 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                View Docs
              </Button>
            </div>
          </div>
        </GlassCard>
      </div>
      
      {/* Contact Dialog */}
      <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
        <DialogContent className="glass-panel border-white/10 max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-[#F4F6FF]">Contact Sales</DialogTitle>
            <DialogDescription className="text-[#A6B1C9]">
              Tell us about your needs and we'll get back to you within 24 hours.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-[#A6B1C9] mb-2 block">Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-3 glass-input text-sm"
                />
              </div>
              <div>
                <label className="text-sm text-[#A6B1C9] mb-2 block">Email</label>
                <input
                  type="email"
                  placeholder="john@company.com"
                  className="w-full px-4 py-3 glass-input text-sm"
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm text-[#A6B1C9] mb-2 block">Company</label>
              <input
                type="text"
                placeholder="Acme Inc."
                className="w-full px-4 py-3 glass-input text-sm"
              />
            </div>
            
            <div>
              <label className="text-sm text-[#A6B1C9] mb-2 block">Message</label>
              <textarea
                placeholder="Tell us about your project..."
                rows={4}
                className="w-full px-4 py-3 glass-input text-sm resize-none"
              />
            </div>
            
            <div className="flex gap-3 pt-2">
              <Button 
                onClick={() => setShowContactDialog(false)}
                className="flex-1 glass-btn py-2.5"
              >
                Cancel
              </Button>
              <Button 
                onClick={() => setShowContactDialog(false)}
                className="flex-1 glass-btn-primary py-2.5"
              >
                Send Message
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Trial Dialog */}
      <Dialog open={showTrialDialog} onOpenChange={setShowTrialDialog}>
        <DialogContent className="glass-panel border-white/10 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-[#F4F6FF]">Start Pro Trial</DialogTitle>
            <DialogDescription className="text-[#A6B1C9]">
              14 days free. No credit card required.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            <div className="p-4 glass-card-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#4F6EF7]/15 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#4F6EF7]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#F4F6FF]">Pro Plan</p>
                  <p className="text-xs text-[#A6B1C9]">$29/month after trial</p>
                </div>
              </div>
              
              <ul className="space-y-2">
                {[
                  'Unlimited projects',
                  '100,000 requests/day',
                  'Priority support',
                  '14-day free trial'
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-[#A6B1C9]">
                    <Check className="w-4 h-4 text-green-400" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <label className="text-sm text-[#A6B1C9] mb-2 block">Email</label>
              <input
                type="email"
                placeholder="you@company.com"
                className="w-full px-4 py-3 glass-input text-sm"
              />
            </div>
            
            <div className="flex gap-3">
              <Button 
                onClick={() => setShowTrialDialog(false)}
                className="flex-1 glass-btn py-2.5"
              >
                Cancel
              </Button>
              <Button 
                onClick={() => setShowTrialDialog(false)}
                className="flex-1 glass-btn-primary py-2.5 flex items-center justify-center gap-2"
              >
                Start Trial
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
