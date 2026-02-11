import { useEffect, useState } from 'react';
import { 
  Bookmark, 
  ExternalLink, 
  Trash2, 
  Folder,
  Search,
  Star,
  Clock
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';

interface BookmarkItem {
  id: string;
  title: string;
  url: string;
  description: string;
  category: string;
  starred: boolean;
  createdAt: string;
}

const bookmarks: BookmarkItem[] = [
  {
    id: '1',
    title: 'Image Processing API Docs',
    url: 'docs.apidevs.com/image',
    description: 'Complete reference for image manipulation endpoints.',
    category: 'Documentation',
    starred: true,
    createdAt: '2 days ago'
  },
  {
    id: '2',
    title: 'Authentication Guide',
    url: 'docs.apidevs.com/auth',
    description: 'Learn how to implement secure API authentication.',
    category: 'Guides',
    starred: true,
    createdAt: '1 week ago'
  },
  {
    id: '3',
    title: 'Rate Limiting Best Practices',
    url: 'blog.apidevs.com/rate-limiting',
    description: 'Optimize your API usage with proper rate limiting.',
    category: 'Blog',
    starred: false,
    createdAt: '2 weeks ago'
  },
  {
    id: '4',
    title: 'Webhook Integration Tutorial',
    url: 'docs.apidevs.com/webhooks',
    description: 'Step-by-step guide for setting up webhooks.',
    category: 'Tutorials',
    starred: false,
    createdAt: '3 weeks ago'
  },
  {
    id: '5',
    title: 'API Changelog v2.4',
    url: 'docs.apidevs.com/changelog',
    description: 'Latest updates and breaking changes.',
    category: 'Documentation',
    starred: true,
    createdAt: '1 month ago'
  },
];

const categories = ['All', 'Documentation', 'Guides', 'Tutorials', 'Blog'];

export function Bookmarks() {
  const [mounted, setMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [starredOnly, setStarredOnly] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const filteredBookmarks = bookmarks.filter(bm => {
    const matchesCategory = selectedCategory === 'All' || bm.category === selectedCategory;
    const matchesSearch = bm.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bm.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStarred = !starredOnly || bm.starred;
    return matchesCategory && matchesSearch && matchesStarred;
  });
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div 
        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-700 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <div>
          <h1 className="text-3xl font-bold text-[#F4F6FF] mb-2">
            Bookmarks
          </h1>
          <p className="text-[#A6B1C9]">
            Save and organize your favorite resources.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => setStarredOnly(!starredOnly)}
            className={`
              px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 transition-all
              ${starredOnly 
                ? 'bg-[#4F6EF7] text-white' 
                : 'bg-white/5 text-[#A6B1C9] hover:bg-white/10'}
            `}
          >
            <Star className={`w-4 h-4 ${starredOnly ? 'fill-white' : ''}`} />
            Starred
          </button>
        </div>
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
            placeholder="Search bookmarks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 glass-input text-sm"
          />
        </div>
        
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
          <Folder className="w-4 h-4 text-[#A6B1C9] flex-shrink-0" />
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
      
      {/* Bookmarks Grid */}
      <div 
        className={`grid grid-cols-1 md:grid-cols-2 gap-5 transition-all duration-700 delay-200 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        {filteredBookmarks.map((bookmark) => (
          <GlassCard key={bookmark.id} className="group" hover>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#4F6EF7]/15 flex items-center justify-center">
                  <Bookmark className="w-5 h-5 text-[#4F6EF7]" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#F4F6FF] group-hover:text-[#4F6EF7] transition-colors">
                    {bookmark.title}
                  </h3>
                  <p className="text-xs text-[#A6B1C9]">{bookmark.url}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                  <Star className={`w-4 h-4 ${bookmark.starred ? 'text-yellow-500 fill-yellow-500' : 'text-[#A6B1C9]'}`} />
                </button>
                <button className="p-2 rounded-lg hover:bg-white/5 transition-colors opacity-0 group-hover:opacity-100">
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>
            
            <p className="text-sm text-[#A6B1C9] mb-4">{bookmark.description}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-[#A6B1C9] border border-white/10">
                  {bookmark.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-[#A6B1C9]">
                  <Clock className="w-3 h-3" />
                  {bookmark.createdAt}
                </span>
              </div>
              
              <Button className="glass-btn px-3 py-2 text-sm flex items-center gap-2">
                Open
                <ExternalLink className="w-3.5 h-3.5" />
              </Button>
            </div>
          </GlassCard>
        ))}
      </div>
      
      {/* Empty State */}
      {filteredBookmarks.length === 0 && (
        <GlassCard className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
            <Bookmark className="w-8 h-8 text-[#A6B1C9]" />
          </div>
          <h3 className="text-lg font-semibold text-[#F4F6FF] mb-2">No bookmarks found</h3>
          <p className="text-[#A6B1C9]">Try adjusting your search or filter criteria</p>
        </GlassCard>
      )}
      
      {/* Quick Add */}
      <div 
        className={`transition-all duration-700 delay-300 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <GlassCard>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1 w-full">
              <label className="text-sm text-[#A6B1C9] mb-2 block">Quick Add Bookmark</label>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Paste URL..."
                  className="flex-1 px-4 py-3 glass-input text-sm"
                />
                <Button className="glass-btn-primary px-6 py-3">
                  Add
                </Button>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
