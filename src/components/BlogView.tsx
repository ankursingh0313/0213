'use client';

import React, { useState } from 'react';
import { BlogPost } from '../types';
import { generateBlogPost } from '../services/apiService';
import { Terminal, Plus, Loader2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import { addBlogPost } from '../lib/features/dataSlice';

const BlogView: React.FC = () => {
    const dispatch = useAppDispatch();
    const posts = useAppSelector((state) => state.data.blogPosts);
    const [isGenerating, setIsGenerating] = useState(false);
    const [topic, setTopic] = useState('');
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

    const handleGenerate = async () => {
        if (!topic) return;
        setIsGenerating(true);
        const content = await generateBlogPost(topic);

        const newPost: BlogPost = {
            id: Date.now().toString(),
            title: topic,
            date: new Date().toISOString().split('T')[0],
            excerpt: content.substring(0, 100) + '...',
            content: content,
            tags: ['AI Generated', 'Tech']
        };

        dispatch(addBlogPost(newPost));
        setIsGenerating(false);
        setTopic('');
    };

    return (
        <div className="p-8 h-full overflow-y-auto custom-scrollbar relative">
            {/* Blog Reading Modal */}
            {selectedPost && (
                <div className="absolute inset-0 z-50 bg-theme-main/95 backdrop-blur-sm p-4 md:p-12 overflow-y-auto">
                    <div className="max-w-3xl mx-auto bg-theme-card border border-theme-border rounded-xl shadow-2xl overflow-hidden">
                        <div className="p-8 border-b border-theme-border flex justify-between items-start">
                            <div>
                                <div className="flex gap-2 mb-4">
                                    {selectedPost.tags.map(tag => (
                                        <span key={tag} className="text-xs uppercase tracking-wider bg-theme-item text-theme-text-muted px-2 py-1 rounded border border-theme-border">{tag}</span>
                                    ))}
                                </div>
                                <h1 className="text-3xl md:text-4xl font-bold text-theme-text-main mb-2">{selectedPost.title}</h1>
                                <div className="text-sm text-theme-text-muted">{selectedPost.date}</div>
                            </div>
                            <button
                                onClick={() => setSelectedPost(null)}
                                className="p-2 hover:bg-theme-item rounded-full text-theme-text-muted hover:text-theme-text-main transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                            </button>
                        </div>
                        <div className="p-8 prose prose-invert max-w-none text-theme-text-main whitespace-pre-wrap font-mono text-sm leading-relaxed">
                            {selectedPost.content}
                        </div>
                    </div>
                </div>
            )}

            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-theme-text-main mb-2">DevLogs</h1>
                    <p className="text-theme-text-muted">Thoughts on code, crypto, and chaos.</p>
                </div>

                {/* Generator Widget */}
                <div className="bg-theme-card border border-theme-border p-1 rounded-lg flex items-center w-full max-w-md shadow-sm">
                    <div className="pl-3 pr-2 text-theme-text-muted"><Terminal size={16} /></div>
                    <input
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="Topic to generate (e.g., 'React Hooks')"
                        className="bg-transparent border-none focus:outline-none text-sm text-theme-text-main w-full placeholder-gray-500"
                    />
                    <button
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        className="bg-theme-item hover:bg-theme-hover text-theme-text-main p-2 rounded-md disabled:opacity-50 transition-colors border border-theme-border"
                    >
                        {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <article key={post.id} className="bg-theme-card rounded-xl border border-theme-border hover:border-theme-accent/50 transition-all group flex flex-col overflow-hidden shadow-sm">
                        <div className="h-2 bg-gradient-to-r from-purple-500 to-blue-500 w-full opacity-50 group-hover:opacity-100 transition-opacity"></div>
                        <div className="p-6 flex flex-col flex-1">
                            <div className="flex gap-2 mb-3">
                                {post.tags.map(tag => (
                                    <span key={tag} className="text-[10px] uppercase tracking-wider bg-theme-item text-theme-text-muted px-2 py-1 rounded border border-theme-border">{tag}</span>
                                ))}
                            </div>
                            <h2 className="text-xl font-bold text-theme-text-main mb-2 group-hover:text-theme-accent transition-colors">{post.title}</h2>
                            <div className="text-xs text-theme-text-muted mb-4">{post.date}</div>
                            <p className="text-sm text-theme-text-muted leading-relaxed mb-4 flex-1">
                                {post.excerpt}
                            </p>
                            <button
                                onClick={() => setSelectedPost(post)}
                                className="text-sm text-theme-accent hover:text-purple-600 self-start mt-auto"
                            >
                                Read Protocol &rarr;
                            </button>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default BlogView;
