import { useEffect, useState } from 'react';
import { 
  Image, 
  FileText, 
  MapPin, 
  Shield, 
  Database, 
  Cloud,
  Search,
  Filter,
  ArrowRight,
  Star
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';

interface APIItem {
  id: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  icon: React.ElementType;
  rating: number;
  requests: string;
}

const apis: APIItem[] = [
  {
    id: '1',
    category: 'CONVERSION',
    title: 'File Convert API',
    description: 'Convert documents between formats. PDF, DOCX, HTML, Markdown support with preservation of formatting.',
    tags: ['async', 'webhook', 'batch'],
    icon: FileText,
    rating: 4.8,
    requests: '2.4M'
  },
  {
    id: '2',
    category: 'DATA',
    title: 'Geo Lookup API',
    description: 'Geolocation data, timezone detection, and address validation with global coverage.',
    tags: ['edge', 'low-latency', 'csv'],
    icon: MapPin,
    rating: 4.9,
    requests: '5.1M'
  },
  {
    id: '3',
    category: 'AI',
    title: 'Text Extract API',
    description: 'OCR and structured data extraction from images and documents with high accuracy.',
    tags: ['ocr', 'json', 'structured'],
    icon: Database,
    rating: 4.7,
    requests: '1.8M'
  },
  {
    id: '4',
    category: 'MEDIA',
    title: 'Image Processing API',
    description: 'Resize, crop, compress, and convert images. Smart format negotiation and CDN delivery.',
    tags: ['cdn', 'realtime', 'webp'],
    icon: Image,
    rating: 4.9,
    requests: '8.2M'
  },
  {
    id: '5',
    category: 'SECURITY',
    title: 'Auth Guard API',
    description: 'JWT validation, rate limiting, and API key management with enterprise-grade security.',
    tags: ['jwt', 'oauth', 'rbac'],
    icon: Shield,
    rating: 4.6,
    requests: '3.5M'
  },
  {
    id: '6',
    category: 'CLOUD',
    title: 'Storage Sync API',
    description: 'Multi-cloud storage abstraction with automatic failover and intelligent caching.',
    tags: ['s3', 'gcs', 'azure'],
    icon: Cloud,
    rating: 4.5,
    requests: '1.2M'
  },
];

const categories = ['All', 'CONVERSION', 'DATA', 'AI', 'MEDIA', 'SECURITY', 'CLOUD'];

export function Explore() {
  const [mounted, setMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const filteredApis = apis.filter(api => {
    const matchesCategory = selectedCategory === 'All' || api.category === selectedCategory;
    const matchesSearch = api.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         api.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div 
        className={`transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      >
        <h1 className="text-3xl font-bold text-[#F4F6FF] mb-2">
          Browse the catalog
        </h1>
        <p className="text-[#A6B1C9]">
          Pick a capability. Start building.
        </p>
      </div>
      
      {/* Search and Filter */}
      <div 
        className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-100 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A6B1C9]" />
          <input
            type="text"
            placeholder="Search APIs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 glass-input text-sm"
          />
        </div>
        
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
          <Filter className="w-4 h-4 text-[#A6B1C9] flex-shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`
                px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all
                ${selectedCategory === cat 
                  ? 'bg-[#4F6EF7] text-white' 
                  : 'bg-white/5 text-[#A6B1C9] hover:bg-white/10'}
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      
      {/* API Grid */}
      <div 
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 transition-all duration-700 delay-200 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        {filteredApis.map((api) => {
          const Icon = api.icon;
          return (
            <GlassCard 
              key={api.id}
              className="flex flex-col h-full group"
              hover
            >
              <div className="flex items-start justify-between mb-4">
                <span className="label-mono text-[#4F6EF7]">{api.category}</span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm text-[#F4F6FF]">{api.rating}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-[#4F6EF7]/15 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-[#4F6EF7]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#F4F6FF]">{api.title}</h3>
                  <p className="text-xs text-[#A6B1C9]">{api.requests} requests/day</p>
                </div>
              </div>
              
              <p className="text-sm text-[#A6B1C9] mb-4 flex-1">{api.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {api.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-[#A6B1C9] border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <Button className="w-full glass-btn py-2.5 flex items-center justify-center gap-2 group-hover:bg-[#4F6EF7]/20 transition-colors">
                Learn More
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </GlassCard>
          );
        })}
      </div>
      
      {/* Empty State */}
      {filteredApis.length === 0 && (
        <GlassCard className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-[#A6B1C9]" />
          </div>
          <h3 className="text-lg font-semibold text-[#F4F6FF] mb-2">No APIs found</h3>
          <p className="text-[#A6B1C9]">Try adjusting your search or filter criteria</p>
        </GlassCard>
      )}
      
      {/* Featured Section */}
      <div 
        className={`transition-all duration-700 delay-300 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <GlassCard size="lg" className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#4F6EF7]/15 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center gap-8">
            <div className="flex-1">
              <span className="label-mono text-[#4F6EF7] mb-2 block">Featured</span>
              <h2 className="text-2xl font-bold text-[#F4F6FF] mb-3">
                Need a custom API?
              </h2>
              <p className="text-[#A6B1C9] max-w-lg mb-4">
                Our team can build tailored solutions for your specific requirements. 
                From prototyping to production deployment.
              </p>
              <div className="flex gap-3">
                <Button className="glass-btn-primary px-6 py-3">
                  Contact Sales
                </Button>
                <Button className="glass-btn px-6 py-3">
                  View Case Studies
                </Button>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-[#F4F6FF]">99.9%</p>
                <p className="text-sm text-[#A6B1C9]">Uptime SLA</p>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="text-center">
                <p className="text-3xl font-bold text-[#F4F6FF]">&lt;50ms</p>
                <p className="text-sm text-[#A6B1C9]">Avg Latency</p>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="text-center">
                <p className="text-3xl font-bold text-[#F4F6FF]">24/7</p>
                <p className="text-sm text-[#A6B1C9]">Support</p>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
