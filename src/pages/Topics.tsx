import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { TopicsHeader, TopicsList } from '@/components/TopicsList';

const Topics = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="mx-auto max-w-4xl">
            <TopicsHeader />
            <TopicsList />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Topics;
