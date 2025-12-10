'use client';

import React, { useState } from 'react';
import { Experience, Project, BlogPost } from '../types';
import { Trash2, Edit2, Plus, Lock, LogIn, Save, X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import {
    addExperience, deleteExperience, updateExperience,
    addProject, deleteProject, updateProject,
    addBlogPost, deleteBlogPost, updateBlogPost
} from '../lib/features/dataSlice';

const AdminPanel: React.FC = () => {
    const dispatch = useAppDispatch();
    const { experiences, projects, blogPosts } = useAppSelector((state) => state.data);

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState<'experiences' | 'projects' | 'blogs'>('experiences');

    // Simple authentication mock
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'admin') {
            setIsAuthenticated(true);
        } else {
            alert('Access Denied: Invalid Credentials');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="flex items-center justify-center h-full">
                <form onSubmit={handleLogin} className="bg-theme-card p-8 rounded-xl border border-theme-border w-full max-w-md shadow-2xl">
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 rounded-full bg-theme-item flex items-center justify-center text-theme-accent">
                            <Lock size={32} />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-center text-theme-text-main mb-6">System Admin Access</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-theme-text-muted uppercase mb-1">Passphrase</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-theme-input border border-theme-border rounded p-3 text-theme-text-main focus:border-theme-accent focus:outline-none transition-colors"
                                placeholder="Enter admin password (hint: admin)"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-theme-accent hover:opacity-90 text-white font-bold py-3 rounded transition-opacity flex items-center justify-center gap-2"
                        >
                            <LogIn size={18} /> Authenticate
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="p-8 h-full overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-theme-text-main">Admin Console</h1>
                <div className="flex gap-2">
                    {['experiences', 'projects', 'blogs'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wide transition-colors ${activeTab === tab
                                    ? 'bg-theme-accent text-white'
                                    : 'bg-theme-card text-theme-text-muted hover:text-theme-text-main'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-theme-card rounded-xl border border-theme-border p-6 shadow-sm min-h-[500px]">
                {activeTab === 'experiences' && (
                    <ExperienceEditor
                        data={experiences}
                        onAdd={(e) => dispatch(addExperience(e))}
                        onDelete={(id) => dispatch(deleteExperience(id))}
                    />
                )}
                {activeTab === 'projects' && (
                    <ProjectEditor
                        data={projects}
                        onAdd={(p) => dispatch(addProject(p))}
                        onDelete={(id) => dispatch(deleteProject(id))}
                    />
                )}
                {activeTab === 'blogs' && (
                    <BlogEditor
                        data={blogPosts}
                        onAdd={(b) => dispatch(addBlogPost(b))}
                        onDelete={(id) => dispatch(deleteBlogPost(id))}
                    />
                )}
            </div>
        </div>
    );
};

// --- Sub-Editors ---

const ExperienceEditor: React.FC<{
    data: Experience[];
    onAdd: (e: Experience) => void;
    onDelete: (id: string) => void;
}> = ({ data, onAdd, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<Partial<Experience>>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newExp: Experience = {
            id: Date.now().toString(),
            company: formData.company || 'New Company',
            role: formData.role || 'New Role',
            period: formData.period || '2024',
            type: formData.type || 'Contract',
            tech: typeof formData.tech === 'string' ? (formData.tech as string).split(',').map(s => s.trim()) : [],
            description: formData.description || '',
        };
        onAdd(newExp);
        setIsEditing(false);
        setFormData({});
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-theme-text-main">Manage Experience</h3>
                <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 bg-theme-item hover:bg-theme-hover border border-theme-border px-3 py-2 rounded text-sm text-theme-text-main">
                    <Plus size={16} /> Add New
                </button>
            </div>

            {isEditing && (
                <form onSubmit={handleSubmit} className="mb-8 p-4 bg-theme-item rounded-lg border border-theme-border grid grid-cols-2 gap-4">
                    <Input label="Company" value={formData.company} onChange={v => setFormData({ ...formData, company: v })} />
                    <Input label="Role" value={formData.role} onChange={v => setFormData({ ...formData, role: v })} />
                    <Input label="Period" value={formData.period} onChange={v => setFormData({ ...formData, period: v })} />
                    <Input label="Type" value={formData.type} onChange={v => setFormData({ ...formData, type: v })} />
                    <div className="col-span-2">
                        <Input label="Tech (comma separated)" value={formData.tech} onChange={v => setFormData({ ...formData, tech: v as any })} />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-xs font-bold text-theme-text-muted mb-1">Description</label>
                        <textarea
                            className="w-full bg-theme-input border border-theme-border rounded p-2 text-sm text-theme-text-main focus:border-theme-accent focus:outline-none"
                            rows={3}
                            value={formData.description || ''}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>
                    <div className="col-span-2 flex gap-2 justify-end">
                        <button type="button" onClick={() => setIsEditing(false)} className="px-3 py-1 text-sm text-theme-text-muted hover:text-white">Cancel</button>
                        <button type="submit" className="px-3 py-1 bg-green-600 text-white rounded text-sm">Save Record</button>
                    </div>
                </form>
            )}

            <div className="space-y-2">
                {data.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-theme-item rounded border border-theme-border">
                        <div>
                            <div className="font-bold text-theme-text-main">{item.company}</div>
                            <div className="text-xs text-theme-text-muted">{item.role} | {item.period}</div>
                        </div>
                        <button onClick={() => onDelete(item.id)} className="p-2 text-red-500 hover:bg-theme-input rounded">
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

const ProjectEditor: React.FC<{
    data: Project[];
    onAdd: (p: Project) => void;
    onDelete: (id: string) => void;
}> = ({ data, onAdd, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<Partial<Project>>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newProj: Project = {
            id: Date.now().toString(),
            title: formData.title || 'New Project',
            category: (formData.category as any) || 'Web',
            description: formData.description || '',
            tech: typeof formData.tech === 'string' ? (formData.tech as string).split(',').map(s => s.trim()) : [],
            featured: formData.featured || false,
        };
        onAdd(newProj);
        setIsEditing(false);
        setFormData({});
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-theme-text-main">Manage Projects</h3>
                <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 bg-theme-item hover:bg-theme-hover border border-theme-border px-3 py-2 rounded text-sm text-theme-text-main">
                    <Plus size={16} /> Add New
                </button>
            </div>

            {isEditing && (
                <form onSubmit={handleSubmit} className="mb-8 p-4 bg-theme-item rounded-lg border border-theme-border grid grid-cols-2 gap-4">
                    <Input label="Title" value={formData.title} onChange={v => setFormData({ ...formData, title: v })} />
                    <div>
                        <label className="block text-xs font-bold text-theme-text-muted mb-1">Category</label>
                        <select
                            value={formData.category}
                            onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                            className="w-full bg-theme-input border border-theme-border rounded p-2 text-sm text-theme-text-main focus:border-theme-accent focus:outline-none"
                        >
                            <option value="Web">Web</option>
                            <option value="Blockchain">Blockchain</option>
                            <option value="Game">Game</option>
                            <option value="Fintech">Fintech</option>
                        </select>
                    </div>
                    <div className="col-span-2">
                        <Input label="Tech (comma separated)" value={formData.tech} onChange={v => setFormData({ ...formData, tech: v as any })} />
                    </div>
                    <div className="col-span-2">
                        <label className="flex items-center gap-2 text-sm text-theme-text-main">
                            <input type="checkbox" checked={formData.featured} onChange={e => setFormData({ ...formData, featured: e.target.checked })} />
                            Featured Project
                        </label>
                    </div>
                    <div className="col-span-2">
                        <label className="block text-xs font-bold text-theme-text-muted mb-1">Description</label>
                        <textarea
                            className="w-full bg-theme-input border border-theme-border rounded p-2 text-sm text-theme-text-main focus:border-theme-accent focus:outline-none"
                            rows={3}
                            value={formData.description || ''}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>
                    <div className="col-span-2 flex gap-2 justify-end">
                        <button type="button" onClick={() => setIsEditing(false)} className="px-3 py-1 text-sm text-theme-text-muted hover:text-white">Cancel</button>
                        <button type="submit" className="px-3 py-1 bg-green-600 text-white rounded text-sm">Save Project</button>
                    </div>
                </form>
            )}

            <div className="space-y-2">
                {data.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-theme-item rounded border border-theme-border">
                        <div>
                            <div className="font-bold text-theme-text-main">{item.title} {item.featured && '★'}</div>
                            <div className="text-xs text-theme-text-muted">{item.category}</div>
                        </div>
                        <button onClick={() => onDelete(item.id)} className="p-2 text-red-500 hover:bg-theme-input rounded">
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

const BlogEditor: React.FC<{
    data: BlogPost[];
    onAdd: (b: BlogPost) => void;
    onDelete: (id: string) => void;
}> = ({ data, onAdd, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<Partial<BlogPost>>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newPost: BlogPost = {
            id: Date.now().toString(),
            title: formData.title || 'New Vlog',
            date: new Date().toISOString().split('T')[0],
            excerpt: formData.excerpt || '',
            content: formData.content || '',
            tags: typeof formData.tags === 'string' ? (formData.tags as string).split(',').map(s => s.trim()) : [],
        };
        onAdd(newPost);
        setIsEditing(false);
        setFormData({});
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-theme-text-main">Manage Blogs / Vlogs</h3>
                <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 bg-theme-item hover:bg-theme-hover border border-theme-border px-3 py-2 rounded text-sm text-theme-text-main">
                    <Plus size={16} /> Write Vlog
                </button>
            </div>

            {isEditing && (
                <form onSubmit={handleSubmit} className="mb-8 p-4 bg-theme-item rounded-lg border border-theme-border grid grid-cols-1 gap-4">
                    <Input label="Title" value={formData.title} onChange={v => setFormData({ ...formData, title: v })} />
                    <Input label="Excerpt (Short Summary)" value={formData.excerpt} onChange={v => setFormData({ ...formData, excerpt: v })} />
                    <Input label="Tags (comma separated)" value={formData.tags} onChange={v => setFormData({ ...formData, tags: v as any })} />
                    <div>
                        <label className="block text-xs font-bold text-theme-text-muted mb-1">Content (Markdown supported)</label>
                        <textarea
                            className="w-full bg-theme-input border border-theme-border rounded p-2 text-sm text-theme-text-main focus:border-theme-accent focus:outline-none font-mono"
                            rows={10}
                            value={formData.content || ''}
                            onChange={e => setFormData({ ...formData, content: e.target.value })}
                        />
                    </div>
                    <div className="flex gap-2 justify-end">
                        <button type="button" onClick={() => setIsEditing(false)} className="px-3 py-1 text-sm text-theme-text-muted hover:text-white">Cancel</button>
                        <button type="submit" className="px-3 py-1 bg-green-600 text-white rounded text-sm">Publish</button>
                    </div>
                </form>
            )}

            <div className="space-y-2">
                {data.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-theme-item rounded border border-theme-border">
                        <div>
                            <div className="font-bold text-theme-text-main">{item.title}</div>
                            <div className="text-xs text-theme-text-muted">{item.date}</div>
                        </div>
                        <button onClick={() => onDelete(item.id)} className="p-2 text-red-500 hover:bg-theme-input rounded">
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

const Input = ({ label, value, onChange }: { label: string, value: any, onChange: (v: string) => void }) => (
    <div>
        <label className="block text-xs font-bold text-theme-text-muted mb-1">{label}</label>
        <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-theme-input border border-theme-border rounded p-2 text-sm text-theme-text-main focus:border-theme-accent focus:outline-none"
        />
    </div>
);

export default AdminPanel;
