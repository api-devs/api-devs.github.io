import { useEffect, useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  FolderGit2, 
  ArrowRight, 
  TrendingUp,
  Image,
  FileText,
  MapPin
} from 'lucide-react';
import { GlassCard, StatCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';

export function Dashboard() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const trendingAPIs = [
    { name: 'Image Resize API', icon: Image },
    { name: 'PDF Render API', icon: FileText },
    { name: 'Geo Lookup API', icon: MapPin },
  ];
  
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div 
        className={`transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      >
        <h1 className="text-4xl font-bold text-[#F4F6FF] mb-3">
          The API.DEVS platform for{' '}
          <span className="gradient-text">modern developers and information security experts</span>
        </h1>
        <p className="text-lg text-[#A6B1C9] max-w-2xl">
          Discover, test, and integrate production-ready APIs—fast. 
          Build smarter with our comprehensive suite of developer tools.
        </p>
      </div>
      
      {/* Stats Grid */}
      <div 
        className={`grid grid-cols-1 md:grid-cols-3 gap-4 transition-all duration-700 delay-100 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <StatCard 
          icon={CheckCircle2} 
          value={1041} 
          label="Completed Tasks"
          trend="+23%"
          trendUp
        />
        <StatCard 
          icon={Clock} 
          value={5} 
          label="Pending Tasks"
          trend="-12%"
          trendUp={false}
        />
        <StatCard 
          icon={FolderGit2} 
          value={2} 
          label="Active Projects"
          trend="+8%"
          trendUp
        />
      </div>
      
      {/* Main Content Grid */}
      <div 
        className={`grid grid-cols-1 lg:grid-cols-3 gap-6 transition-all duration-700 delay-200 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        {/* Quick Start CTA */}
        <GlassCard className="lg:col-span-2 relative overflow-hidden" size="lg">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-[#4F6EF7]/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-[#4F6EF7] animate-pulse" />
              <span className="label-mono text-[#4F6EF7]">New</span>
            </div>
            
            <h2 className="text-2xl font-bold text-[#F4F6FF] mb-3">
              Image Processing API
            </h2>
            <p className="text-[#A6B1C9] mb-6 max-w-lg">
              Resize, crop, compress, and convert images on demand. 
              Built-in caching, global CDN, and smart format negotiation.
            </p>
            
            <div className="flex flex-wrap gap-3">
              <Button className="glass-btn-primary px-6 py-3 flex items-center gap-2">
                Explore APIs
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button className="glass-btn px-6 py-3">
                View Documentation
              </Button>
            </div>
          </div>
          
          {/* Decorative code snippet */}
          <div className="absolute bottom-6 right-6 hidden xl:block">
            <div className="glass-card-sm p-4 font-mono text-xs text-[#A6B1C9]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-red-500/60" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                <div className="w-2 h-2 rounded-full bg-green-500/60" />
              </div>
              <code className="block space-y-1">
                <span className="text-[#4F6EF7]">const</span>{' '}
                <span className="text-[#F4F6FF]">result</span>{' '}
                <span className="text-[#A6B1C9]">=</span>{' '}
                <span className="text-[#4F6EF7]">await</span>
                <br />
                <span className="text-[#F4F6FF]">  api.image.process</span>
                <br />
                <span className="text-[#A6B1C9]">({'{...}'})</span>
              </code>
            </div>
          </div>
        </GlassCard>
        
        {/* Trending APIs */}
        <GlassCard size="lg">
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp className="w-5 h-5 text-[#4F6EF7]" />
            <h3 className="text-lg font-semibold text-[#F4F6FF]">Trending</h3>
          </div>
          
          <div className="space-y-3">
            {trendingAPIs.map((api) => {
              const Icon = api.icon;
              return (
                <div 
                  key={api.name}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-[#4F6EF7]/15 transition-colors">
                    <Icon className="w-5 h-5 text-[#A6B1C9] group-hover:text-[#4F6EF7] transition-colors" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#F4F6FF]">{api.name}</p>
                    <p className="text-xs text-[#A6B1C9]">Popular this week</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#A6B1C9] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              );
            })}
          </div>
          
          <Button className="w-full mt-4 glass-btn py-2.5 text-sm">
            View All APIs
          </Button>
        </GlassCard>
      </div>
      
      {/* Recent Activity */}
      <div 
        className={`transition-all duration-700 delay-300 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <GlassCard>
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-semibold text-[#F4F6FF]">Recent Activity</h3>
            <Button className="glass-btn px-4 py-2 text-sm">View All</Button>
          </div>
          
          <div className="space-y-3">
            {[
              { action: 'API Key generated', time: '2 minutes ago', type: 'key' },
              { action: 'New project created: "E-commerce API"', time: '1 hour ago', type: 'project' },
              { action: 'Image Processing API invoked', time: '3 hours ago', type: 'api' },
              { action: 'Documentation updated', time: '5 hours ago', type: 'doc' },
            ].map((item, i) => (
              <div 
                key={i}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`
                    w-2 h-2 rounded-full
                    ${item.type === 'key' ? 'bg-yellow-500' : ''}
                    ${item.type === 'project' ? 'bg-green-500' : ''}
                    ${item.type === 'api' ? 'bg-[#4F6EF7]' : ''}
                    ${item.type === 'doc' ? 'bg-purple-500' : ''}
                  `} />
                  <span className="text-sm text-[#F4F6FF]">{item.action}</span>
                </div>
                <span className="text-xs text-[#A6B1C9]">{item.time}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
