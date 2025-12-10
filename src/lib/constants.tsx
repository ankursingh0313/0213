import React from 'react';
import { Experience, Project, BlogPost } from '../types';
import {
    FaReact, FaNodeJs, FaPhp, FaHtml5, FaCss3Alt, FaDatabase, FaGamepad, FaBitcoin
} from 'react-icons/fa';
import { SiNextdotjs, SiSocketdotio, SiRedis, SiMongodb, SiSolidity, SiWeb3Dotjs } from 'react-icons/si';

export const EXPERIENCES: Experience[] = [
    {
        id: '1',
        company: 'Naygon Technology',
        role: 'Lead Developer',
        period: 'Jan 2022 - Jan 2023',
        type: 'Service Based',
        tech: ['React', 'Node.js', 'Web3', 'Blockchain', 'MongoDB', 'Next.js', 'Socket.io', 'Redis'],
        description: 'Led development of crypto exchanges (DEX, CEX, Hyper Exchange) and blockchain networks. Implemented cross-exchange order execution logic.'
    },
    {
        id: '2',
        company: 'uCertify',
        role: 'Web Developer',
        period: 'Dec 2019 - Dec 2020',
        type: 'Product Based',
        tech: ['HTML', 'CSS', 'JS', 'PHP', 'React', 'MySQL'],
        description: 'Developed features for the uCertify online learning platform.'
    }
];

export const PROJECTS: Project[] = [
    {
        id: 'p1',
        title: 'Hyper Crypto Exchange',
        category: 'Blockchain',
        description: 'A cutting-edge exchange allowing visibility and execution of orders across multiple connected exchanges.',
        tech: ['Node.js', 'Web3', 'Redis', 'Socket.io'],
        featured: true
    },
    {
        id: 'p2',
        title: 'Decentralized Exchange (DEX)',
        category: 'Blockchain',
        description: 'Peer-to-peer cryptocurrency exchange without intermediaries.',
        tech: ['Solidity', 'React', 'Ethers.js'],
        featured: true
    },
    {
        id: 'p3',
        title: 'One Wallet',
        category: 'Fintech',
        description: 'Plug-and-play payment system for businesses integration.',
        tech: ['Node.js', 'React', 'Stripe API'],
        featured: false
    },
    {
        id: 'p4',
        title: 'Online Examination System',
        category: 'Web',
        description: 'Robust platform for conducting secure online exams.',
        tech: ['PHP', 'MySQL', 'JS'],
        featured: false
    },
    {
        id: 'p5',
        title: 'School Smart Class',
        category: 'Web',
        description: 'Comprehensive management system for educational institutions.',
        tech: ['React', 'Firebase'],
        featured: false
    },
    {
        id: 'p6',
        title: 'LAN Games Platform',
        category: 'Game',
        description: 'Multiplayer gaming platform optimized for local networks.',
        tech: ['C++', 'Socket.io'],
        featured: false
    }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
    {
        id: 'b1',
        title: 'Optimizing High-Frequency Trading',
        date: '2023-10-15',
        excerpt: 'Techniques for reducing latency in crypto exchange engines using Redis and Node.js.',
        content: 'Full content would go here...',
        tags: ['Blockchain', 'Performance']
    },
    {
        id: 'b2',
        title: 'The State of Web3 in 2024',
        date: '2024-01-20',
        excerpt: 'Where are we going with decentralized apps? A critical look at current adoption.',
        content: 'Full content would go here...',
        tags: ['Web3', 'Opinion']
    }
];

export const SKILL_ICONS: Record<string, React.ReactNode> = {
    'React': <FaReact className="text-blue-400" />,
    'Node.js': <FaNodeJs className="text-green-500" />,
    'PHP': <FaPhp className="text-indigo-400" />,
    'HTML': <FaHtml5 className="text-orange-500" />,
    'CSS': <FaCss3Alt className="text-blue-500" />,
    'MySQL': <FaDatabase className="text-blue-300" />,
    'Next.js': <SiNextdotjs className="text-white" />,
    'Socket.io': <SiSocketdotio className="text-gray-400" />,
    'Redis': <SiRedis className="text-red-500" />,
    'MongoDB': <SiMongodb className="text-green-400" />,
    'Blockchain': <FaBitcoin className="text-yellow-500" />,
    'Web3': <SiWeb3Dotjs className="text-gray-300" />,
    'Solidity': <SiSolidity className="text-gray-400" />
};
