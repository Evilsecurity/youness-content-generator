import React, { useState } from 'react';
import { FormProps, Platform, VideoLength, VideoConfig } from '../types';
import { Loader2, Sparkles } from 'lucide-react';

export const InputForm: React.FC<FormProps> = ({ onSubmit, isLoading }) => {
  const [niche, setNiche] = useState('');
  const [platform, setPlatform] = useState<Platform>(Platform.TikTok);
  const [tone, setTone] = useState('Educational & Fun');
  const [length, setLength] = useState<VideoLength>(VideoLength.Short);
  const [audience, setAudience] = useState('Gen Z Beginners');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!niche || !audience) return;
    onSubmit({ niche, platform, tone, length, audience });
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-900/50 border border-slate-800 p-8 rounded-2xl shadow-xl backdrop-blur-sm">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
          Craft Your Next Viral Hit
        </h2>
        <p className="text-slate-400 mt-2">Fill in the details below to generate a complete video package.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Niche / Topic</label>
            <input
              type="text"
              required
              placeholder="e.g., Vegan Cooking, Tech Reviews"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-white placeholder-slate-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Target Audience</label>
            <input
              type="text"
              required
              placeholder="e.g., Busy Moms, Software Engineers"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-white placeholder-slate-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Platform</label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value as Platform)}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-white appearance-none cursor-pointer"
            >
              {Object.values(Platform).map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Video Length</label>
            <select
              value={length}
              onChange={(e) => setLength(e.target.value as VideoLength)}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-white appearance-none cursor-pointer"
            >
              {Object.values(VideoLength).map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-slate-300">Tone & Style</label>
            <input
              type="text"
              placeholder="e.g., High Energy, Serious & Professional, Sarcastic"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-white placeholder-slate-500"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-4 mt-6 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-[1.02] ${
            isLoading
              ? 'bg-slate-700 cursor-not-allowed text-slate-400'
              : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-purple-500/25'
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin w-5 h-5" />
              <span>Generating Magic...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>Generate Content Idea</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
