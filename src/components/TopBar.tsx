'use client';

import React, { useState, useEffect } from 'react';
import { Search, Wifi, Sun, Moon } from 'lucide-react';
import { SystemStats } from '../types';
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import { setSearchQuery, toggleTheme } from '../lib/features/uiSlice';

const TopBar: React.FC = () => {
    const dispatch = useAppDispatch();
    const isDarkMode = useAppSelector((state) => state.ui.isDarkMode);

    const [stats, setStats] = useState<SystemStats>({ fps: 60, latency: 24, memory: 40 });
    const [time, setTime] = useState<Date | null>(null); // Initialize as null to avoid hydration mismatch

    useEffect(() => {
        setTime(new Date()); // Set time on client side only
        const interval = setInterval(() => {
            setStats({
                fps: Math.floor(58 + Math.random() * 5),
                latency: Math.floor(20 + Math.random() * 10),
                memory: Math.floor(35 + Math.random() * 15)
            });
            setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.remove('light-mode');
        } else {
            document.documentElement.classList.add('light-mode');
        }
    }, [isDarkMode]);

    return (
        <div className="h-16 border-b border-theme-border bg-theme-sidebar flex items-center justify-between px-6 shrink-0 z-10 transition-colors duration-300">
            {/* Search Bar */}
            <div className="relative w-1/3 min-w-[200px] max-w-md group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-theme-text-muted group-focus-within:text-theme-accent" size={16} />
                <input
                    type="text"
                    placeholder="Search modules..."
                    className="w-full bg-theme-input border border-theme-border rounded-full py-2 pl-10 pr-4 text-sm text-theme-text-main focus:outline-none focus:border-theme-accent focus:ring-1 focus:ring-theme-accent transition-all placeholder-gray-500"
                    onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                />
            </div>

            {/* System Stats (The "Geek" part) */}
            <div className="flex items-center gap-6 text-xs font-mono text-theme-text-muted">
                <div className="hidden md:flex items-center gap-2">
                    <span className="text-theme-text-muted">FPS</span>
                    <span className="text-green-500">{stats.fps}</span>
                </div>
                <div className="hidden md:flex items-center gap-2">
                    <span className="text-theme-text-muted">LAT</span>
                    <span className="text-theme-accent">{stats.latency}ms</span>
                </div>
                <div className="hidden md:flex items-center gap-2">
                    <span className="text-theme-text-muted">MEM</span>
                    <span className="text-blue-500">{stats.memory}%</span>
                </div>

                <div className="h-4 w-px bg-theme-border mx-2 hidden md:block"></div>

                <button
                    onClick={() => dispatch(toggleTheme())}
                    className="p-2 rounded-full hover:bg-theme-hover text-theme-text-muted hover:text-theme-text-main transition-colors"
                    title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                >
                    {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
                </button>

                <div className="h-4 w-px bg-theme-border mx-2 hidden md:block"></div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                        <Wifi size={14} className="text-green-500" />
                        <span>ONLINE</span>
                    </div>
                    <span className="text-theme-text-muted">
                        {time ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
