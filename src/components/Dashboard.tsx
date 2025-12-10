'use client';

import React from 'react';
import ExperienceWidget from './widgets/ExperienceWidget';
import ProjectsWidget from './widgets/ProjectsWidget';
import SkillsWidget from './widgets/SkillsWidget';
import { Activity, Code2, Database, Globe } from 'lucide-react';

const Dashboard: React.FC = () => {
    return (
        <div className="p-4 md:p-8 h-full overflow-y-auto custom-scrollbar">
            <h1 className="text-3xl font-bold text-theme-text-main mb-6">Command Center</h1>

            {/* Top Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-theme-card p-4 rounded-xl border border-theme-border flex items-center gap-4 shadow-sm">
                    <div className="p-3 bg-purple-500/10 rounded-lg text-purple-500"><Code2 size={24} /></div>
                    <div>
                        <div className="text-2xl font-bold text-theme-text-main">4+</div>
                        <div className="text-xs text-theme-text-muted">Years Exp</div>
                    </div>
                </div>
                <div className="bg-theme-card p-4 rounded-xl border border-theme-border flex items-center gap-4 shadow-sm">
                    <div className="p-3 bg-green-500/10 rounded-lg text-green-500"><Activity size={24} /></div>
                    <div>
                        <div className="text-2xl font-bold text-theme-text-main">12+</div>
                        <div className="text-xs text-theme-text-muted">Projects</div>
                    </div>
                </div>
                <div className="bg-theme-card p-4 rounded-xl border border-theme-border flex items-center gap-4 shadow-sm">
                    <div className="p-3 bg-blue-500/10 rounded-lg text-blue-500"><Database size={24} /></div>
                    <div>
                        <div className="text-2xl font-bold text-theme-text-main">Full</div>
                        <div className="text-xs text-theme-text-muted">Stack</div>
                    </div>
                </div>
                <div className="bg-theme-card p-4 rounded-xl border border-theme-border flex items-center gap-4 shadow-sm">
                    <div className="p-3 bg-orange-500/10 rounded-lg text-orange-500"><Globe size={24} /></div>
                    <div>
                        <div className="text-2xl font-bold text-theme-text-main">Web3</div>
                        <div className="text-xs text-theme-text-muted">Native</div>
                    </div>
                </div>
            </div>

            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 grid-rows-none lg:grid-rows-2 h-auto lg:h-[600px]">
                {/* Left Col: Experience (Tall) */}
                <div className="lg:row-span-2">
                    <ExperienceWidget />
                </div>

                {/* Middle Col: Projects (Wide) */}
                <div className="lg:col-span-2">
                    <ProjectsWidget />
                </div>

                {/* Bottom Right: Skills */}
                <div className="lg:col-span-1">
                    <SkillsWidget />
                </div>

                {/* Bottom Right: Quick Actions/Links */}
                <div className="bg-theme-card rounded-xl border border-theme-border p-5 flex flex-col justify-center gap-3 shadow-sm">
                    <h3 className="text-sm font-bold text-theme-text-muted mb-2 uppercase">Quick Protocols</h3>
                    <button className="w-full bg-theme-item hover:bg-theme-hover text-left px-4 py-3 rounded-lg text-sm text-theme-text-main border border-theme-border hover:border-theme-accent transition-colors flex justify-between items-center group">
                        <span>Download Resume.pdf</span>
                        <span className="text-xs bg-purple-500/20 text-purple-500 px-2 py-0.5 rounded group-hover:bg-purple-500 group-hover:text-white transition-all">INIT</span>
                    </button>
                    <button className="w-full bg-theme-item hover:bg-theme-hover text-left px-4 py-3 rounded-lg text-sm text-theme-text-main border border-theme-border hover:border-green-500 transition-colors flex justify-between items-center group">
                        <span>Schedule Meeting</span>
                        <span className="text-xs bg-green-500/20 text-green-500 px-2 py-0.5 rounded group-hover:bg-green-500 group-hover:text-white transition-all">SYNC</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
