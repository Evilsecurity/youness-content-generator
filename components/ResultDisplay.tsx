import React, { useState } from 'react';
import { ResultProps } from '../types';
import { Copy, Check, Video, Type, Hash, Image as ImageIcon, MessageSquare, RefreshCw, Film } from 'lucide-react';

const CopyButton: React.FC<{ text: string }> = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
      title="Copy to clipboard"
    >
      {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
    </button>
  );
};

export const ResultDisplay: React.FC<ResultProps> = ({ content, onReset }) => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pb-20">
      
      {/* Header Actions */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
           <span className="text-purple-400">Your Viral Blueprint</span>
        </h2>
        <button 
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
        >
          <RefreshCw className="w-4 h-4" />
          New Idea
        </button>
      </div>

      {/* Idea Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500"></div>
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2 text-purple-400 font-semibold uppercase tracking-wider text-sm">
            <Video className="w-4 h-4" />
            Core Concept
          </div>
          <CopyButton text={content.idea} />
        </div>
        <p className="text-lg text-slate-100 font-medium leading-relaxed">{content.idea}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Hook */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
           <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2 text-pink-400 font-semibold uppercase tracking-wider text-sm">
              <Film className="w-4 h-4" />
              The Hook
            </div>
            <CopyButton text={content.hook} />
          </div>
          <p className="text-slate-200 italic border-l-4 border-pink-500/50 pl-4 py-1">{content.hook}</p>
        </div>

        {/* CTA */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
           <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2 text-blue-400 font-semibold uppercase tracking-wider text-sm">
              <MessageSquare className="w-4 h-4" />
              Call to Action
            </div>
            <CopyButton text={content.cta} />
          </div>
          <p className="text-slate-200">{content.cta}</p>
        </div>
      </div>

      {/* Script */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
         <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2 text-green-400 font-semibold uppercase tracking-wider text-sm">
            <Type className="w-4 h-4" />
            Full Script
          </div>
          <CopyButton text={content.script} />
        </div>
        <div className="bg-slate-950 p-4 rounded-lg font-mono text-sm text-slate-300 whitespace-pre-wrap leading-relaxed border border-slate-800">
          {content.script}
        </div>
      </div>

      {/* Thumbnails & Titles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Titles */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
           <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2 text-orange-400 font-semibold uppercase tracking-wider text-sm">
              <Type className="w-4 h-4" />
              SEO Titles
            </div>
            <CopyButton text={content.titles.join('\n')} />
          </div>
          <ul className="space-y-3">
            {content.titles.map((title, i) => (
              <li key={i} className="flex gap-3 text-slate-300">
                <span className="text-slate-600 font-mono select-none">0{i + 1}</span>
                <span>{title}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Thumbnail */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
           <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2 text-yellow-400 font-semibold uppercase tracking-wider text-sm">
              <ImageIcon className="w-4 h-4" />
              Thumbnail Concept
            </div>
            <CopyButton text={content.thumbnail} />
          </div>
          <p className="text-slate-300 leading-relaxed">{content.thumbnail}</p>
        </div>
      </div>

      {/* Hashtags */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
         <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2 text-indigo-400 font-semibold uppercase tracking-wider text-sm">
            <Hash className="w-4 h-4" />
            Hashtags
          </div>
          <CopyButton text={content.hashtags.join(' ')} />
        </div>
        <div className="flex flex-wrap gap-2">
          {content.hashtags.map((tag, i) => (
            <span key={i} className="px-3 py-1 bg-slate-800 text-purple-300 rounded-full text-sm hover:bg-slate-700 transition-colors cursor-default">
              {tag}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
};
