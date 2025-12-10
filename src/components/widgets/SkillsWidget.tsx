'use client';

import React from 'react';
import { Cpu } from 'lucide-react';
import { SKILL_ICONS } from '../../lib/constants';

const skills = [
    'React', 'Node.js', 'Blockchain', 'Web3', 'Solidity',
    'Next.js', 'MongoDB', 'Redis', 'Socket.io', 'PHP', 'MySQL'
];

const SkillsWidget: React.FC = () => {
    return (
        <div className="bg-theme-card rounded-xl border border-theme-border p-5 h-full shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-theme-text-main flex items-center gap-2">
                    <Cpu size={18} className="text-blue-500" /> Tech Stack
                </h3>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {skills.map((skill) => (
                    <div key={skill} className="aspect-square bg-theme-item rounded-lg border border-theme-border flex flex-col items-center justify-center gap-2 hover:bg-theme-hover hover:border-blue-500/50 transition-all group">
                        <div className="text-2xl opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                            {SKILL_ICONS[skill] || <Cpu />}
                        </div>
                        <span className="text-[10px] text-theme-text-muted group-hover:text-theme-text-main">{skill}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SkillsWidget;
