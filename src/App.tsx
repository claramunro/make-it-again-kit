import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Home2 from "./pages/Home2";
import Topics from "./pages/Topics";
import TopicDetail from "./pages/TopicDetail";
import TopicDetailFocus from "./pages/TopicDetailFocus";
import TopicDetailBannerGradient from "./pages/TopicDetailBannerGradient";
import TopicDetailBannerSolid from "./pages/TopicDetailBannerSolid";
import TopicDetailBannerFull from "./pages/TopicDetailBannerFull";
import Bookmarks from "./pages/Bookmarks";
import Settings from "./pages/Settings";
import SessionDetail from "./pages/SessionDetail";
import SessionDetailLegacy from "./pages/SessionDetailLegacy";
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
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/home2" element={<Home2 />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/topic/:id" element={<TopicDetail />} />
          <Route path="/topic/:id/focus" element={<TopicDetailFocus />} />
          <Route path="/topic2/:id" element={<TopicDetailBannerGradient />} />
          <Route path="/topic3/:id" element={<TopicDetailBannerSolid />} />
          <Route path="/topic4/:id" element={<TopicDetailBannerFull />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/session/:id" element={<SessionDetail />} />
          <Route path="/session-legacy/:id" element={<SessionDetailLegacy />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
