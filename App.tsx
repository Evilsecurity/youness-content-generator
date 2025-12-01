import React, { useState } from 'react';
import { InputForm } from './components/InputForm';
import { ResultDisplay } from './components/ResultDisplay';
import { VideoConfig, GeneratedContent } from './types';
import { generateVideoContent } from './services/geminiService';
import { Zap } from 'lucide-react';

const App: React.FC = () => {
  const [content, setContent] = useState<GeneratedContent | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (config: VideoConfig) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await generateVideoContent(config);
      setContent(result);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setContent(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-900/20 rounded-full blur-[100px]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-5xl">
        <header className="flex flex-col items-center mb-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl shadow-lg shadow-purple-900/50">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              Creator<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Brain</span>
            </h1>
          </div>
          <p className="text-slate-400 text-lg">AI-Powered Content Strategy</p>
        </header>

        {error && (
          <div className="w-full max-w-2xl mx-auto mb-8 p-4 bg-red-900/20 border border-red-800/50 rounded-xl text-red-200 text-center">
            {error}
          </div>
        )}

        {!content ? (
          <InputForm onSubmit={handleGenerate} isLoading={isLoading} />
        ) : (
          <ResultDisplay content={content} onReset={handleReset} />
        )}
      </div>
      
      <footer className="relative z-10 mt-auto pt-12 pb-6 text-slate-500 text-sm">
        <p>Powered by Google Gemini 2.5 Flash</p>
      </footer>
    </div>
  );
};

export default App;
