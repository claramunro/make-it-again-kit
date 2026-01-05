import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TopicProvider } from "@/contexts/TopicContext";
import { SessionProvider } from "@/contexts/SessionContext";
import Index from "./pages/Index";
import Topics from "./pages/Topics";
import Welcome from "./pages/Welcome";
import TopicDetail from "./pages/TopicDetail";
import TopicDetailFocus from "./pages/TopicDetailFocus";
import TopicDetailBannerGradient from "./pages/TopicDetailBannerGradient";
import TopicDetailBannerSolid from "./pages/TopicDetailBannerSolid";
import TopicDetailBannerFull from "./pages/TopicDetailBannerFull";
import Highlights from "./pages/Highlights";
import Settings from "./pages/Settings";
import SessionDetail from "./pages/SessionDetail";
import DesignSystem from "./pages/DesignSystem";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Initialize theme on app load
const initializeTheme = () => {
  const saved = localStorage.getItem('theme');
  const root = document.documentElement;
  
  if (saved === 'dark') {
    root.classList.add('dark');
  } else if (saved === 'system') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      root.classList.add('dark');
    }
  }
};

initializeTheme();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TopicProvider>
      <SessionProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/welcome" element={<Welcome />} />
              <Route path="/" element={<Index />} />
              <Route path="/topics" element={<Topics />} />
              <Route path="/topic/:id" element={<TopicDetail />} />
              <Route path="/topic/:id/focus" element={<TopicDetailFocus />} />
              <Route path="/topic2/:id" element={<TopicDetailBannerGradient />} />
              <Route path="/topic3/:id" element={<TopicDetailBannerSolid />} />
              <Route path="/topic4/:id" element={<TopicDetailBannerFull />} />
              <Route path="/highlights" element={<Highlights />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/session/:id" element={<SessionDetail />} />
              <Route path="/design-system" element={<DesignSystem />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </SessionProvider>
    </TopicProvider>
  </QueryClientProvider>
);

export default App;
