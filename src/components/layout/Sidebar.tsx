import { 
  Home, 
  Compass, 
  BarChart3, 
  MessageSquare, 
  FolderKanban, 
  Bookmark,
  Code2
} from 'lucide-react';
import type { Page } from '@/App';

interface NavItem {
  icon: React.ElementType;
  label: string;
  page: Page;
}

const navItems: NavItem[] = [
  { icon: Home, label: 'Home', page: 'dashboard' },
  { icon: Compass, label: 'Explore', page: 'explore' },
  { icon: BarChart3, label: 'Analytics', page: 'analytics' },
  { icon: MessageSquare, label: 'Messages', page: 'messages' },
  { icon: FolderKanban, label: 'Projects', page: 'projects' },
  { icon: Bookmark, label: 'Bookmarks', page: 'bookmarks' },
];

interface SidebarProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
}

export function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  return (
    <aside className="w-[240px] h-full glass-card flex flex-col p-5">
      {/* Logo */}
      <div 
        className="flex items-center gap-3 mb-8 px-2 cursor-pointer"
        onClick={() => onPageChange('dashboard')}
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4F6EF7] to-[#3D5CE0] flex items-center justify-center">
          <Code2 className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight text-[#F4F6FF]">API.DEVS</h1>
          <p className="text-[10px] text-[#A6B1C9] mono uppercase tracking-wider">Welcome</p>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.page;
          
          return (
            <button
              key={item.page}
              onClick={() => onPageChange(item.page)}
              className={`nav-item w-full text-left ${isActive ? 'active' : ''}`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
      
      {/* User Card */}
      <div className="mt-auto pt-4 border-t border-white/10">
        <div className="glass-card-sm p-3 flex items-center gap-3">
          <img 
            src="/avatar.png" 
            alt="User Avatar" 
            className="w-10 h-10 rounded-full object-cover border border-white/10"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[#F4F6FF] truncate">API.DEVS</p>
                      <p className="text-xs text-[#A6B1C9] truncate">Developer</p>
                      <p className="text-xs text-[#A6B1C9] truncate">Information Security</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
