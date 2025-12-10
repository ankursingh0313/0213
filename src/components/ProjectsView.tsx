'use client';

import React, { useState } from 'react';
import { ExternalLink, Github, Star, Code, FolderOpen } from 'lucide-react';
import { useAppSelector } from '../lib/hooks';

const ProjectsView: React.FC = () => {
    const projects = useAppSelector((state) => state.data.projects);
    const [filter, setFilter] = useState<string>('All');

    const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(p => p.category === filter);

    return (
        <div className="p-4 md:p-8 h-full overflow-y-auto custom-scrollbar">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-theme-text-main mb-2 flex items-center gap-3">
                        <FolderOpen className="text-green-500" /> Mission Log
                    </h1>
                    <p className="text-theme-text-muted">Detailed archive of deployed protocols and applications.</p>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-2 p-1 bg-theme-card rounded-lg border border-theme-border">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all ${filter === cat
                                    ? 'bg-theme-accent text-white shadow-md'
                                    : 'text-theme-text-muted hover:text-theme-text-main hover:bg-theme-item'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                    <div key={project.id} className="bg-theme-card rounded-xl border border-theme-border flex flex-col h-full hover:border-green-500/50 transition-all group shadow-sm overflow-hidden">
                        <div className="h-1 bg-theme-border group-hover:bg-green-500 transition-colors w-full"></div>

                        <div className="p-6 flex flex-col flex-1">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-2">
                                    <div className={`p-2 rounded-lg ${project.featured ? 'bg-yellow-500/10 text-yellow-500' : 'bg-theme-item text-theme-text-muted'}`}>
                                        <Code size={18} />
                                    </div>
                                    <div>
                                        <h2 className="font-bold text-theme-text-main text-lg leading-tight">{project.title}</h2>
                                        <span className="text-[10px] text-green-500 font-mono uppercase">{project.category}</span>
                                    </div>
                                </div>
                                {project.featured && <Star size={16} className="text-yellow-500 fill-yellow-500" />}
                            </div>

                            <p className="text-sm text-theme-text-muted mb-6 leading-relaxed flex-1">
                                {project.description}
                            </p>

                            <div className="mt-auto">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tech.map(t => (
                                        <span key={t} className="text-[10px] px-2 py-1 bg-theme-item text-theme-text-muted rounded border border-theme-border">
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex gap-3 pt-4 border-t border-theme-border">
                                    <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded bg-theme-item hover:bg-theme-hover text-theme-text-main text-xs font-bold border border-theme-border transition-colors">
                                        <Github size={14} /> Source
                                    </button>
                                    <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded bg-theme-accent hover:opacity-90 text-white text-xs font-bold shadow-lg shadow-purple-900/20 transition-all">
                                        <ExternalLink size={14} /> Live Demo
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectsView;
