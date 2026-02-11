import { useEffect, useState } from 'react';
import { 
  Activity, 
  Clock, 
  Zap, 
  TrendingUp, 
  TrendingDown,
  Download,
  Copy,
  Check
} from 'lucide-react';
import { GlassCard, StatCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';

// Simple bar chart component
function BarChart({ data }: { data: number[] }) {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-2 h-32">
      {data.map((value, i) => (
        <div 
          key={i}
          className="flex-1 bg-[#4F6EF7]/30 rounded-t-sm hover:bg-[#4F6EF7]/50 transition-colors relative group"
          style={{ height: `${(value / max) * 100}%` }}
        >
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-[#A6B1C9] opacity-0 group-hover:opacity-100 transition-opacity">
            {value}
          </div>
        </div>
      ))}
    </div>
  );
}

// Simple line chart using SVG
function LineChart({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;
  const points = data.map((value, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - ((value - min) / range) * 80 - 10;
    return `${x},${y}`;
  }).join(' ');
  
  return (
    <svg viewBox="0 0 100 100" className="w-full h-32" preserveAspectRatio="none">
      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4F6EF7" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#4F6EF7" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon 
        points={`0,100 ${points} 100,100`}
        fill="url(#lineGradient)"
      />
      <polyline
        points={points}
        fill="none"
        stroke="#4F6EF7"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {data.map((value, i) => {
        const x = (i / (data.length - 1)) * 100;
        const y = 100 - ((value - min) / range) * 80 - 10;
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="1"
            fill="#4F6EF7"
          />
        );
      })}
    </svg>
  );
}

export function Analytics() {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [timeRange, setTimeRange] = useState('24h');
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const handleCopy = () => {
    const code = `const api = new APIDevs({ key: process.env.API_KEY });
const result = await api.convert.image({
  url: "https://cdn.example.com/photo.jpg",
  width: 800,
  format: "webp"
});
console.log(result.url);`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const requestData = [45, 52, 38, 65, 48, 72, 58, 80, 62, 75, 68, 85];
  const latencyData = [42, 38, 45, 40, 44, 39, 41, 37, 43, 40, 42, 38];
  
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
            Live metrics
          </h1>
          <p className="text-[#A6B1C9]">
            Health, latency, and a copy-paste starter.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-white/5 rounded-lg p-1">
            {['24h', '7d', '30d'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`
                  px-3 py-1.5 rounded-md text-sm font-medium transition-all
                  ${timeRange === range 
                    ? 'bg-[#4F6EF7] text-white' 
                    : 'text-[#A6B1C9] hover:text-[#F4F6FF]'}
                `}
              >
                {range}
              </button>
            ))}
          </div>
          <Button className="glass-btn px-4 py-2.5 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div 
        className={`grid grid-cols-1 md:grid-cols-3 gap-4 transition-all duration-700 delay-100 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <StatCard 
          icon={Activity} 
          value="99.99%" 
          label="Uptime"
          trend="+0.01%"
          trendUp
        />
        <StatCard 
          icon={Clock} 
          value="42ms" 
          label="Avg Latency"
          trend="-8ms"
          trendUp
        />
        <StatCard 
          icon={Zap} 
          value="2.4M" 
          label="Requests Today"
          trend="+12%"
          trendUp
        />
      </div>
      
      {/* Charts Grid */}
      <div 
        className={`grid grid-cols-1 lg:grid-cols-2 gap-6 transition-all duration-700 delay-200 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        {/* Requests Chart */}
        <GlassCard>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-[#F4F6FF] mb-1">Requests</h3>
              <p className="text-sm text-[#A6B1C9]">Total API calls over time</p>
            </div>
            <div className="flex items-center gap-2 text-green-400">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">+12%</span>
            </div>
          </div>
          <BarChart data={requestData} />
          <div className="flex justify-between mt-3 text-xs text-[#A6B1C9]">
            <span>00:00</span>
            <span>06:00</span>
            <span>12:00</span>
            <span>18:00</span>
            <span>24:00</span>
          </div>
        </GlassCard>
        
        {/* Latency Chart */}
        <GlassCard>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-[#F4F6FF] mb-1">Latency</h3>
              <p className="text-sm text-[#A6B1C9]">Response time in milliseconds</p>
            </div>
            <div className="flex items-center gap-2 text-green-400">
              <TrendingDown className="w-4 h-4" />
              <span className="text-sm font-medium">-8ms</span>
            </div>
          </div>
          <LineChart data={latencyData} />
          <div className="flex justify-between mt-3 text-xs text-[#A6B1C9]">
            <span>00:00</span>
            <span>06:00</span>
            <span>12:00</span>
            <span>18:00</span>
            <span>24:00</span>
          </div>
        </GlassCard>
      </div>
      
      {/* Code Snippet & Recent Logs */}
      <div 
        className={`grid grid-cols-1 lg:grid-cols-2 gap-6 transition-all duration-700 delay-300 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        {/* Code Card */}
        <GlassCard className="relative">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-[#F4F6FF] mb-1">Quick Start</h3>
              <p className="text-sm text-[#A6B1C9]">Copy-paste this starter code</p>
            </div>
            <button
              onClick={handleCopy}
              className="p-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              {copied ? (
                <Check className="w-5 h-5 text-green-400" />
              ) : (
                <Copy className="w-5 h-5 text-[#A6B1C9]" />
              )}
            </button>
          </div>
          
          <div className="code-block p-4 overflow-x-auto">
            <pre className="text-sm">
              <code className="text-[#A6B1C9]">
                <span className="text-[#4F6EF7]">const</span>{' '}
                <span className="text-[#F4F6FF]">api</span>{' '}
                <span className="text-[#A6B1C9]">=</span>{' '}
                <span className="text-[#4F6EF7]">new</span>{' '}
                <span className="text-[#F4F6FF]">APIDevs</span>
                <span className="text-[#A6B1C9]">({'{'} </span>
                <br />
                <span className="text-[#F4F6FF] ml-4">key</span>
                <span className="text-[#A6B1C9]">:</span>{' '}
                <span className="text-green-400">process.env.API_KEY</span>
                <br />
                <span className="text-[#A6B1C9]">{'}'});</span>
                <br />
                <br />
                <span className="text-[#4F6EF7]">const</span>{' '}
                <span className="text-[#F4F6FF]">result</span>{' '}
                <span className="text-[#A6B1C9]">=</span>{' '}
                <span className="text-[#4F6EF7]">await</span>{' '}
                <span className="text-[#F4F6FF]">api.convert.image</span>
                <span className="text-[#A6B1C9]">({'{'}</span>
                <br />
                <span className="text-[#F4F6FF] ml-4">url</span>
                <span className="text-[#A6B1C9]">:</span>{' '}
                <span className="text-green-400">&quot;https://cdn.example.com/photo.jpg&quot;</span>
                <span className="text-[#A6B1C9]">,</span>
                <br />
                <span className="text-[#F4F6FF] ml-4">width</span>
                <span className="text-[#A6B1C9]">:</span>{' '}
                <span className="text-orange-400">800</span>
                <span className="text-[#A6B1C9]">,</span>
                <br />
                <span className="text-[#F4F6FF] ml-4">format</span>
                <span className="text-[#A6B1C9]">:</span>{' '}
                <span className="text-green-400">&quot;webp&quot;</span>
                <br />
                <span className="text-[#A6B1C9]">{'}'});</span>
                <br />
                <br />
                <span className="text-[#F4F6FF]">console</span>
                <span className="text-[#A6B1C9]">.</span>
                <span className="text-[#F4F6FF]">log</span>
                <span className="text-[#A6B1C9]">(</span>
                <span className="text-[#F4F6FF]">result.url</span>
                <span className="text-[#A6B1C9]">);</span>
              </code>
            </pre>
          </div>
        </GlassCard>
        
        {/* Recent Logs */}
        <GlassCard>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-[#F4F6FF] mb-1">Recent Logs</h3>
              <p className="text-sm text-[#A6B1C9]">Latest API activity</p>
            </div>
            <Button className="glass-btn px-4 py-2 text-sm">
              View All
            </Button>
          </div>
          
          <div className="space-y-2">
            {[
              { method: 'GET', endpoint: '/v1/image/resize', status: 200, time: '45ms', timestamp: '2 min ago' },
              { method: 'POST', endpoint: '/v1/convert/pdf', status: 201, time: '120ms', timestamp: '5 min ago' },
              { method: 'GET', endpoint: '/v1/geo/lookup', status: 200, time: '32ms', timestamp: '12 min ago' },
              { method: 'GET', endpoint: '/v1/auth/validate', status: 401, time: '8ms', timestamp: '15 min ago' },
              { method: 'POST', endpoint: '/v1/extract/text', status: 200, time: '89ms', timestamp: '22 min ago' },
            ].map((log, i) => (
              <div 
                key={i}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className={`
                    text-xs font-mono px-2 py-1 rounded
                    ${log.method === 'GET' ? 'bg-blue-500/20 text-blue-400' : ''}
                    ${log.method === 'POST' ? 'bg-green-500/20 text-green-400' : ''}
                  `}>
                    {log.method}
                  </span>
                  <span className="text-sm text-[#F4F6FF] font-mono">{log.endpoint}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`
                    text-xs px-2 py-1 rounded-full
                    ${log.status < 300 ? 'bg-green-500/15 text-green-400' : ''}
                    ${log.status >= 400 ? 'bg-red-500/15 text-red-400' : ''}
                  `}>
                    {log.status}
                  </span>
                  <span className="text-xs text-[#A6B1C9] w-12 text-right">{log.time}</span>
                  <span className="text-xs text-[#A6B1C9] w-16 text-right">{log.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
      
      {/* Endpoint Health */}
      <div 
        className={`transition-all duration-700 delay-400 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <GlassCard>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-lg font-semibold text-[#F4F6FF] mb-1">Endpoint Health</h3>
              <p className="text-sm text-[#A6B1C9]">Real-time status of all API endpoints</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-[#A6B1C9]">All systems operational</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Image Processing', status: 'operational', uptime: '99.99%' },
              { name: 'File Conversion', status: 'operational', uptime: '99.97%' },
              { name: 'Geo Lookup', status: 'operational', uptime: '100%' },
              { name: 'Text Extraction', status: 'degraded', uptime: '98.5%' },
            ].map((endpoint, i) => (
              <div 
                key={i}
                className="p-4 rounded-xl bg-white/5 hover:bg-white/[0.07] transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-[#F4F6FF]">{endpoint.name}</span>
                  <div className={`
                    w-2 h-2 rounded-full
                    ${endpoint.status === 'operational' ? 'bg-green-500' : ''}
                    ${endpoint.status === 'degraded' ? 'bg-yellow-500' : ''}
                  `} />
                </div>
                <p className="text-xs text-[#A6B1C9] capitalize mb-1">{endpoint.status}</p>
                <p className="text-lg font-semibold text-[#F4F6FF]">{endpoint.uptime}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
