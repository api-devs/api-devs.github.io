import { useEffect, useState } from 'react';
import { 
  Search, 
  Send, 
  Paperclip, 
  MoreVertical, 
  Phone, 
  Video,
  CheckCheck
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';

interface Message {
  id: string;
  sender: string;
  avatar: string;
  content: string;
  timestamp: string;
  isMe: boolean;
  status: 'sent' | 'delivered' | 'read';
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
}

const conversations: Conversation[] = [
  {
    id: '1',
    name: 'Sarah Kim',
    avatar: 'SK',
    lastMessage: 'The API integration is working perfectly!',
    timestamp: '2m',
    unread: 2,
    online: true
  },
  {
    id: '2',
    name: 'Support Team',
    avatar: 'ST',
    lastMessage: 'Your ticket #1234 has been resolved.',
    timestamp: '1h',
    unread: 0,
    online: true
  },
  {
    id: '3',
    name: 'Miguel Rodriguez',
    avatar: 'MR',
    lastMessage: 'Can you help with the webhook setup?',
    timestamp: '3h',
    unread: 1,
    online: false
  },
  {
    id: '4',
    name: 'Ana Silva',
    avatar: 'AS',
    lastMessage: 'Thanks for the quick response!',
    timestamp: '1d',
    unread: 0,
    online: false
  },
  {
    id: '5',
    name: 'James Taylor',
    avatar: 'JT',
    lastMessage: 'Looking forward to the new features.',
    timestamp: '2d',
    unread: 0,
    online: true
  },
];

const messages: Message[] = [
  {
    id: '1',
    sender: 'Sarah Kim',
    avatar: 'SK',
    content: 'Hi! I just finished integrating the Image Processing API into our app.',
    timestamp: '10:30 AM',
    isMe: false,
    status: 'read'
  },
  {
    id: '2',
    sender: 'Me',
    avatar: 'AM',
    content: 'That\'s great to hear! How was the experience?',
    timestamp: '10:32 AM',
    isMe: true,
    status: 'read'
  },
  {
    id: '3',
    sender: 'Sarah Kim',
    avatar: 'SK',
    content: 'Super smooth! The documentation was clear and the response times are impressive.',
    timestamp: '10:35 AM',
    isMe: false,
    status: 'read'
  },
  {
    id: '4',
    sender: 'Sarah Kim',
    avatar: 'SK',
    content: 'The API integration is working perfectly!',
    timestamp: '10:36 AM',
    isMe: false,
    status: 'read'
  },
  {
    id: '5',
    sender: 'Me',
    avatar: 'AM',
    content: 'Awesome! Let me know if you need anything else.',
    timestamp: '10:40 AM',
    isMe: true,
    status: 'delivered'
  },
];

export function Messages() {
  const [mounted, setMounted] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<string>('1');
  const [messageInput, setMessageInput] = useState('');
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const handleSend = () => {
    if (messageInput.trim()) {
      setMessageInput('');
    }
  };
  
  const activeConversation = conversations.find(c => c.id === selectedConversation);
  
  return (
    <div 
      className={`h-[calc(100vh-140px)] transition-all duration-700 ${
        mounted ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <GlassCard className="h-full flex overflow-hidden">
        {/* Conversations List */}
        <div className="w-80 border-r border-white/10 flex flex-col">
          {/* Search */}
          <div className="p-4 border-b border-white/10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A6B1C9]" />
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full pl-10 pr-4 py-2.5 glass-input text-sm"
              />
            </div>
          </div>
          
          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedConversation(conv.id)}
                className={`
                  w-full p-4 flex items-center gap-3 hover:bg-white/5 transition-colors border-b border-white/5
                  ${selectedConversation === conv.id ? 'bg-white/[0.07]' : ''}
                `}
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6B7B94] to-[#4A5568] flex items-center justify-center text-sm font-semibold">
                    {conv.avatar}
                  </div>
                  {conv.online && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0B0C0F]" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-[#F4F6FF] truncate">{conv.name}</p>
                    <span className="text-xs text-[#A6B1C9]">{conv.timestamp}</span>
                  </div>
                  <p className="text-xs text-[#A6B1C9] truncate">{conv.lastMessage}</p>
                </div>
                
                {conv.unread > 0 && (
                  <div className="w-5 h-5 rounded-full bg-[#4F6EF7] flex items-center justify-center">
                    <span className="text-xs text-white font-medium">{conv.unread}</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
        
        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="h-16 border-b border-white/10 flex items-center justify-between px-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6B7B94] to-[#4A5568] flex items-center justify-center text-sm font-semibold">
                  {activeConversation?.avatar}
                </div>
                {activeConversation?.online && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0B0C0F]" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-[#F4F6FF]">{activeConversation?.name}</p>
                <p className="text-xs text-[#A6B1C9]">
                  {activeConversation?.online ? 'Online' : 'Offline'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="p-2.5 rounded-xl hover:bg-white/5 transition-colors">
                <Phone className="w-5 h-5 text-[#A6B1C9]" />
              </button>
              <button className="p-2.5 rounded-xl hover:bg-white/5 transition-colors">
                <Video className="w-5 h-5 text-[#A6B1C9]" />
              </button>
              <button className="p-2.5 rounded-xl hover:bg-white/5 transition-colors">
                <MoreVertical className="w-5 h-5 text-[#A6B1C9]" />
              </button>
            </div>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-3 max-w-[70%] ${msg.isMe ? 'flex-row-reverse' : ''}`}>
                  {!msg.isMe && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6B7B94] to-[#4A5568] flex items-center justify-center text-xs font-semibold flex-shrink-0">
                      {msg.avatar}
                    </div>
                  )}
                  
                  <div>
                    <div
                      className={`
                        px-4 py-2.5 rounded-2xl
                        ${msg.isMe 
                          ? 'bg-[#4F6EF7] text-white rounded-br-md' 
                          : 'glass-card-sm text-[#F4F6FF] rounded-bl-md'}
                      `}
                    >
                      <p className="text-sm">{msg.content}</p>
                    </div>
                    
                    <div className={`flex items-center gap-1 mt-1 ${msg.isMe ? 'justify-end' : ''}`}>
                      <span className="text-xs text-[#A6B1C9]">{msg.timestamp}</span>
                      {msg.isMe && (
                        <CheckCheck className={`
                          w-3.5 h-3.5
                          ${msg.status === 'read' ? 'text-[#4F6EF7]' : 'text-[#A6B1C9]'}
                        `} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Input Area */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3">
              <button className="p-2.5 rounded-xl hover:bg-white/5 transition-colors">
                <Paperclip className="w-5 h-5 text-[#A6B1C9]" />
              </button>
              
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..."
                className="flex-1 px-4 py-3 glass-input text-sm"
              />
              
              <Button 
                onClick={handleSend}
                className="p-3 glass-btn-primary"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
