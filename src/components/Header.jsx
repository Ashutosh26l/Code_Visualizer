import React from 'react';
import { Code2, Github, BookOpen, Zap } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-xl shadow-lg">
              <Code2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CodeViz
              </h1>
              <p className="text-sm text-gray-600">Step-by-Step Code Execution Visualizer</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
              <Zap className="h-4 w-4 text-amber-500" />
              <span>Visualize • Debug • Learn</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-blue-600 transition-colors">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Docs</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-blue-600 transition-colors">
                <Github className="h-4 w-4" />
                <span className="hidden sm:inline">GitHub</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};