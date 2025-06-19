import React, { useState } from 'react';
import { Header } from './components/Header';
import { CodeEditor } from './components/CodeEditor';
import { VisualizationPanel } from './components/VisualizationPanel';
import { ControlPanel } from './components/ControlPanel';
import { InputOutput } from './components/InputOutput';
import { ExecutionContext } from './context/ExecutionContext';
import type { Language, ExecutionState } from './types';

function App() {
  const [language, setLanguage] = useState<Language>('python');
  const [code, setCode] = useState(`def factorial(n):
    if n <= 1:
        return 1
    else:
        return n * factorial(n - 1)

result = factorial(5)
print(f"Factorial of 5 is: {result}")`);
  
  const [executionState, setExecutionState] = useState<ExecutionState>({
    isRunning: false,
    currentStep: 0,
    totalSteps: 0,
    stackFrames: [],
    heapObjects: [],
    variables: {},
    currentLine: -1,
    output: [],
    input: ''
  });

  const [testInput, setTestInput] = useState('');

  return (
    <ExecutionContext.Provider value={{
      language,
      setLanguage,
      code,
      setCode,
      executionState,
      setExecutionState,
      testInput,
      setTestInput
    }}>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        
        <main className="flex-1 flex flex-col lg:flex-row gap-6 p-6 max-w-7xl mx-auto w-full">
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
    </ExecutionContext.Provider>
  );
}

export default App;