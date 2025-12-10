'use client';

import React from 'react';
import { Code, ExternalLink, Star } from 'lucide-react';
import { useAppSelector } from '../../lib/hooks';

const ProjectsWidget: React.FC = () => {
    const projects = useAppSelector((state) => state.data.projects);

    return (
        <div className="bg-theme-card rounded-xl border border-theme-border p-5 h-full flex flex-col shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-theme-text-main flex items-center gap-2">
                    <Code size={18} className="text-green-500" /> Active Modules
                </h3>
                <button className="text-xs text-green-500 hover:text-green-400 transition-colors">View All &rarr;</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto pr-1 custom-scrollbar">
                {projects.map((proj) => (
                    <div key={proj.id} className="bg-theme-item p-4 rounded-lg border border-theme-border hover:border-green-500/50 transition-all group flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${proj.featured ? 'bg-yellow-500' : 'bg-gray-500'}`}></div>
                                <h4 className="font-bold text-theme-text-main text-sm">{proj.title}</h4>
                            </div>
                            {proj.featured && <Star size={12} className="text-yellow-500 fill-yellow-500" />}
                        </div>

                        <p className="text-xs text-theme-text-muted mb-3 flex-1 line-clamp-2">{proj.description}</p>

                        <div className="flex justify-between items-center mt-auto">
                            <span className="text-[10px] uppercase tracking-wider font-bold text-theme-text-muted">{proj.category}</span>
                            <div className="flex gap-2">
                                {/* Mock Actions */}
                                <button className="p-1.5 rounded bg-theme-card text-theme-text-muted hover:text-theme-text-main hover:bg-theme-hover transition-colors border border-theme-border">
                                    <ExternalLink size={12} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectsWidget;
