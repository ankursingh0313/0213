'use client';

import React from 'react';
import { Briefcase, Calendar, ChevronRight } from 'lucide-react';
import { useAppSelector } from '../../lib/hooks';

const ExperienceWidget: React.FC = () => {
    const experiences = useAppSelector((state) => state.data.experiences);

    return (
        <div className="bg-theme-card rounded-xl border border-theme-border p-5 h-full flex flex-col shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-theme-text-main flex items-center gap-2">
                    <Briefcase size={18} className="text-purple-500" /> Experience
                </h3>
                <span className="text-xs bg-theme-item px-2 py-1 rounded text-theme-text-muted">Timeline</span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                {experiences.map((exp) => (
                    <div key={exp.id} className="group p-4 bg-theme-item hover:bg-theme-hover rounded-lg border border-theme-border hover:border-theme-accent/50 transition-all cursor-default">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h4 className="font-bold text-theme-text-main group-hover:text-theme-accent transition-colors">{exp.company}</h4>
                                <p className="text-sm text-purple-500">{exp.role}</p>
                            </div>
                            <ChevronRight size={16} className="text-theme-text-muted group-hover:text-theme-text-main transition-colors opacity-0 group-hover:opacity-100" />
                        </div>
                        <div className="flex items-center gap-2 text-xs text-theme-text-muted mb-3">
                            <Calendar size={12} />
                            <span>{exp.period}</span>
                            <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                            <span>{exp.type}</span>
                        </div>
                        <p className="text-xs text-theme-text-muted leading-relaxed mb-3">
                            {exp.description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                            {exp.tech.slice(0, 4).map(t => (
                                <span key={t} className="text-[10px] px-1.5 py-0.5 bg-theme-card text-theme-text-muted rounded border border-theme-border">{t}</span>
                            ))}
                            {exp.tech.length > 4 && <span className="text-[10px] px-1.5 py-0.5 text-theme-text-muted">+{exp.tech.length - 4}</span>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExperienceWidget;
