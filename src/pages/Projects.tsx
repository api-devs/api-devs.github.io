import { useEffect, useState } from 'react';
import { 
  FolderKanban, 
  Plus, 
  MoreVertical, 
  Calendar,
  Users,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'on-hold';
  progress: number;
  members: number;
  dueDate: string;
  apis: string[];
}

const projects: Project[] = [
  {
    id: '1',
    name: 'E-commerce API Integration',
    description: 'Integrating payment and inventory APIs for the new store.',
    status: 'active',
    progress: 75,
    members: 4,
    dueDate: 'Feb 28',
    apis: ['Payments', 'Inventory', 'Shipping']
  },
  {
    id: '2',
    name: 'Image Processing Pipeline',
    description: 'Automated image resizing and optimization workflow.',
    status: 'active',
    progress: 45,
    members: 2,
    dueDate: 'Mar 15',
    apis: ['Image Processing', 'Storage']
  },
  {
    id: '3',
    name: 'Document Converter',
    description: 'PDF to HTML conversion service with batch processing.',
    status: 'completed',
    progress: 100,
    members: 3,
    dueDate: 'Jan 20',
    apis: ['File Convert', 'Text Extract']
  },
  {
    id: '4',
    name: 'Geo Analytics Dashboard',
    description: 'Location-based analytics with real-time mapping.',
    status: 'on-hold',
    progress: 30,
    members: 5,
    dueDate: 'Apr 1',
    apis: ['Geo Lookup', 'Analytics']
  },
  {
    id: '5',
    name: 'Auth Service Migration',
    description: 'Migrating from legacy auth to new JWT-based system.',
    status: 'active',
    progress: 60,
    members: 2,
    dueDate: 'Mar 5',
    apis: ['Auth Guard']
  },
];

const statusConfig = {
  active: { icon: CheckCircle2, color: 'text-green-400', bg: 'bg-green-500/15', label: 'Active' },
  completed: { icon: CheckCircle2, color: 'text-blue-400', bg: 'bg-blue-500/15', label: 'Completed' },
  'on-hold': { icon: AlertCircle, color: 'text-yellow-400', bg: 'bg-yellow-500/15', label: 'On Hold' },
};

export function Projects() {
  const [mounted, setMounted] = useState(false);
  const [showNewProjectDialog, setShowNewProjectDialog] = useState(false);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const filteredProjects = projects.filter(p => 
    filter === 'all' || p.status === filter
  );
  
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
            Projects
          </h1>
          <p className="text-[#A6B1C9]">
            Manage your API integrations and track progress.
          </p>
        </div>
        
        <Button 
          onClick={() => setShowNewProjectDialog(true)}
          className="glass-btn-primary px-5 py-3 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Project
        </Button>
      </div>
      
      {/* Stats */}
      <div 
        className={`grid grid-cols-2 md:grid-cols-4 gap-4 transition-all duration-700 delay-100 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        {[
          { label: 'Total Projects', value: '12' },
          { label: 'Active', value: '7' },
          { label: 'Completed', value: '4' },
          { label: 'On Hold', value: '1' },
        ].map((stat, i) => (
          <GlassCard key={i} size="sm">
            <p className="text-2xl font-bold text-[#F4F6FF]">{stat.value}</p>
            <p className="text-sm text-[#A6B1C9]">{stat.label}</p>
          </GlassCard>
        ))}
      </div>
      
      {/* Filter Tabs */}
      <div 
        className={`flex items-center gap-2 transition-all duration-700 delay-200 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        {(['all', 'active', 'completed'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all
              ${filter === f 
                ? 'bg-[#4F6EF7] text-white' 
                : 'bg-white/5 text-[#A6B1C9] hover:bg-white/10'}
            `}
          >
            {f}
          </button>
        ))}
      </div>
      
      {/* Projects Grid */}
      <div 
        className={`grid grid-cols-1 md:grid-cols-2 gap-5 transition-all duration-700 delay-300 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        {filteredProjects.map((project) => {
          const status = statusConfig[project.status];
          const StatusIcon = status.icon;
          
          return (
            <GlassCard key={project.id} className="group" hover>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#4F6EF7]/15 flex items-center justify-center">
                    <FolderKanban className="w-5 h-5 text-[#4F6EF7]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#F4F6FF]">{project.name}</h3>
                    <p className="text-sm text-[#A6B1C9]">{project.description}</p>
                  </div>
                </div>
                
                <button className="p-2 rounded-lg hover:bg-white/5 transition-colors opacity-0 group-hover:opacity-100">
                  <MoreVertical className="w-4 h-4 text-[#A6B1C9]" />
                </button>
              </div>
              
              {/* Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#A6B1C9]">Progress</span>
                  <span className="text-sm font-medium text-[#F4F6FF]">{project.progress}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#4F6EF7] to-[#6B7B94] rounded-full transition-all duration-500"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
              
              {/* Meta */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-[#A6B1C9]" />
                    <span className="text-sm text-[#A6B1C9]">{project.members}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#A6B1C9]" />
                    <span className="text-sm text-[#A6B1C9]">{project.dueDate}</span>
                  </div>
                </div>
                
                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${status.bg}`}>
                  <StatusIcon className={`w-3.5 h-3.5 ${status.color}`} />
                  <span className={`text-xs font-medium ${status.color}`}>{status.label}</span>
                </div>
              </div>
              
              {/* APIs */}
              <div className="flex flex-wrap gap-2">
                {project.apis.map((api) => (
                  <span 
                    key={api}
                    className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-[#A6B1C9] border border-white/10"
                  >
                    {api}
                  </span>
                ))}
              </div>
            </GlassCard>
          );
        })}
      </div>
      
      {/* New Project Dialog */}
      <Dialog open={showNewProjectDialog} onOpenChange={setShowNewProjectDialog}>
        <DialogContent className="glass-panel border-white/10 max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-[#F4F6FF]">Create New Project</DialogTitle>
            <DialogDescription className="text-[#A6B1C9]">
              Set up a new API integration project.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            <div>
              <label className="text-sm text-[#A6B1C9] mb-2 block">Project Name</label>
              <input
                type="text"
                placeholder="e.g., E-commerce Integration"
                className="w-full px-4 py-3 glass-input text-sm"
              />
            </div>
            
            <div>
              <label className="text-sm text-[#A6B1C9] mb-2 block">Description</label>
              <textarea
                placeholder="Brief description of the project..."
                rows={3}
                className="w-full px-4 py-3 glass-input text-sm resize-none"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-[#A6B1C9] mb-2 block">Due Date</label>
                <input
                  type="date"
                  className="w-full px-4 py-3 glass-input text-sm"
                />
              </div>
              <div>
                <label className="text-sm text-[#A6B1C9] mb-2 block">Team Members</label>
                <input
                  type="number"
                  min={1}
                  defaultValue={1}
                  className="w-full px-4 py-3 glass-input text-sm"
                />
              </div>
            </div>
            
            <div className="flex gap-3 pt-4">
              <Button 
                onClick={() => setShowNewProjectDialog(false)}
                className="flex-1 glass-btn py-2.5"
              >
                Cancel
              </Button>
              <Button 
                onClick={() => setShowNewProjectDialog(false)}
                className="flex-1 glass-btn-primary py-2.5"
              >
                Create Project
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
