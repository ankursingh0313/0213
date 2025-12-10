'use client';

import React from 'react';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import Dashboard from '../components/Dashboard';
import BlogView from '../components/BlogView';
import AIChatView from '../components/AIChatView';
import AdminPanel from '../components/AdminPanel';
import ProjectsView from '../components/ProjectsView';
import { ViewState } from '../types';
import { useAppSelector } from '../lib/hooks';

export default function Home() {
  const currentView = useAppSelector((state) => state.ui.currentView);

  const renderContent = () => {
    switch (currentView) {
      case ViewState.DASHBOARD:
        return <Dashboard />;
      case ViewState.PROJECTS:
        return <ProjectsView />;
      case ViewState.BLOG:
        return <BlogView />;
      case ViewState.AI_CHAT:
        return <AIChatView />;
      case ViewState.ADMIN:
        return <AdminPanel />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-theme-main text-theme-text-main overflow-hidden font-mono transition-colors duration-300">
      <Sidebar />

      <div className="flex flex-col flex-1 h-full min-w-0">
        <TopBar />

        <main className="flex-1 overflow-hidden relative">
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:invert-0 invert"
            style={{
              backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
              backgroundSize: '32px 32px'
            }}>
          </div>

          <div className="relative h-full z-0">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
