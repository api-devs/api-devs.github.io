import { Search, Bell, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

export function Header() {
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);
  
  return (
    <>
      <header className="h-16 flex items-center justify-between px-6 border-b border-white/10">
        {/* Left: Search */}
        <div className="flex items-center gap-4 flex-1">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A6B1C9]" />
            <input
              type="text"
              placeholder="Search APIs, docs, endpoints..."
              className="w-full pl-10 pr-4 py-2.5 glass-input text-sm"
            />
          </div>
        </div>
        
        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <button className="relative p-2.5 rounded-xl hover:bg-white/5 transition-colors">
            <Bell className="w-5 h-5 text-[#A6B1C9]" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#4F6EF7] rounded-full" />
          </button>
          
          <Button 
            onClick={() => setShowApiKeyDialog(true)}
            className="glass-btn-primary px-4 py-2.5 flex items-center gap-2 text-sm font-medium"
          >
            <Key className="w-4 h-4" />
            Get API Key
          </Button>
        </div>
      </header>
      
      {/* API Key Dialog */}
      <Dialog open={showApiKeyDialog} onOpenChange={setShowApiKeyDialog}>
        <DialogContent className="glass-panel border-white/10 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-[#F4F6FF]">Get API Key</DialogTitle>
            <DialogDescription className="text-[#A6B1C9]">
              Generate a new API key to access our services.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            <div className="p-4 glass-card-sm">
              <p className="label-mono text-[#A6B1C9] mb-2">Your API Key</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 p-3 bg-black/40 rounded-lg text-sm font-mono text-[#4F6EF7] break-all">
                  \\ SOON..
                </code>
                <button 
                                  onClick={() => navigator.clipboard.writeText('SOON..')}
                  className="p-3 glass-btn rounded-lg"
                >
                  Copy
                </button>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button 
                onClick={() => setShowApiKeyDialog(false)}
                className="flex-1 glass-btn py-2.5"
              >
                Close
              </Button>
              <Button 
                onClick={() => setShowApiKeyDialog(false)}
                className="flex-1 glass-btn-primary py-2.5"
              >
                Generate New
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
