import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Dashboard } from '@/pages/Dashboard';
import { Explore } from '@/pages/Explore';
import { Analytics } from '@/pages/Analytics';
import { Messages } from '@/pages/Messages';
import { Projects } from '@/pages/Projects';
import { Bookmarks } from '@/pages/Bookmarks';
import { Pricing } from '@/pages/Pricing';

export type Page = 'dashboard' | 'explore' | 'analytics' | 'messages' | 'projects' | 'bookmarks' | 'pricing';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'explore':
        return <Explore />;
      case 'analytics':
        return <Analytics />;
      case 'messages':
        return <Messages />;
      case 'projects':
        return <Projects />;
      case 'bookmarks':
        return <Bookmarks />;
      case 'pricing':
        return <Pricing />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <MainLayout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderPage()}
    </MainLayout>
  );
}

export default App;
