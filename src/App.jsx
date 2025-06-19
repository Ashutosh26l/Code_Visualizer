import React, { useState } from 'react';
import { Header } from './components/Header';
import { CodeEditor } from './components/CodeEditor';
import { VisualizationPanel } from './components/VisualizationPanel';
import { ControlPanel } from './components/ControlPanel';
import { InputOutput } from './components/InputOutput';
import { ExecutionProvider } from './context/ExecutionContext';

function App() {
  return (
    <ExecutionProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <Header />
        
        <main className="flex flex-col lg:flex-row gap-6 p-6 max-w-7xl mx-auto">
          {/* Left Panel - Code Editor */}
          <div className="flex-1 flex flex-col space-y-6">
            <CodeEditor />
            <InputOutput />
          </div>
          
          {/* Right Panel - Visualization */}
          <div className="flex-1 flex flex-col space-y-6">
            <ControlPanel />
            <VisualizationPanel />
          </div>
        </main>
      </div>
    </ExecutionProvider>
  );
}

export default App;