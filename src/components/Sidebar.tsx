'use client';

import React from 'react';
import {
    Home,
    Briefcase,
    Terminal,
    MessageSquare,
    User,
    Github,
    Linkedin,
    Facebook,
    Instagram,
    Settings
} from 'lucide-react';
import { ViewState } from '../types';
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import { setCurrentView } from '../lib/features/uiSlice';

const Sidebar: React.FC = () => {
    const dispatch = useAppDispatch();
    const currentView = useAppSelector((state) => state.ui.currentView);

    const navItems = [
        { id: ViewState.DASHBOARD, icon: Home, label: 'Dashboard' },
        { id: ViewState.PROJECTS, icon: Briefcase, label: 'Projects' },
        { id: ViewState.BLOG, icon: Terminal, label: 'DevLogs' },
        { id: ViewState.AI_CHAT, icon: MessageSquare, label: 'Ask AI' },
    ];

    return (
        <div className="w-20 md:w-64 h-full bg-theme-sidebar border-r border-theme-border flex flex-col justify-between shrink-0 transition-all duration-300">
            <div>
                {/* Profile Header */}
                <div className="p-6 flex items-center gap-4 border-b border-theme-border">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-green-500 flex items-center justify-center shrink-0 text-white">
                        <User size={20} />
                    </div>
                    <div className="hidden md:block">
                        <h2 className="text-sm font-bold text-theme-text-main">Geek General</h2>
                        <p className="text-xs text-theme-text-muted">Full Stack Dev</p>
                    </div>
                </div>

                {/* Nav Items */}
                <nav className="mt-6 px-2 md:px-4 space-y-1">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => dispatch(setCurrentView(item.id))}
                            className={`w-full flex items-center gap-4 p-3 rounded-lg transition-colors group ${currentView === item.id
                                    ? 'bg-theme-hover text-theme-text-main border-l-2 border-theme-accent'
                                    : 'text-theme-text-muted hover:bg-theme-hover hover:text-theme-text-main'
                                }`}
                        >
                            <item.icon size={20} className={currentView === item.id ? 'text-theme-accent' : 'group-hover:text-theme-text-main'} />
                            <span className="hidden md:block text-sm font-medium">{item.label}</span>
                        </button>
                    ))}
                </nav>
            </div>

            {/* Footer / Socials */}
            <div>
                <div className="px-2 md:px-4 mb-2">
                    <button
                        onClick={() => dispatch(setCurrentView(ViewState.ADMIN))}
                        className={`w-full flex items-center gap-4 p-3 rounded-lg transition-colors group ${currentView === ViewState.ADMIN
                                ? 'bg-theme-hover text-theme-text-main'
                                : 'text-theme-text-muted hover:bg-theme-hover hover:text-theme-text-main'
                            }`}
                    >
                        <Settings size={20} className={currentView === ViewState.ADMIN ? 'text-theme-accent' : 'group-hover:text-theme-text-main'} />
                        <span className="hidden md:block text-sm font-medium">Admin</span>
                    </button>
                </div>

                <div className="p-4 border-t border-theme-border">
                    <div className="text-xs text-theme-text-muted mb-4 hidden md:block uppercase tracking-wider font-bold">Social Connection</div>
                    <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start flex-wrap">
                        <a href="#" className="text-gray-400 hover:text-theme-text-main transition-colors"><Github size={18} /></a>
                        <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors"><Linkedin size={18} /></a>
                        <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors"><Facebook size={18} /></a>
                        <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors"><Instagram size={18} /></a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
