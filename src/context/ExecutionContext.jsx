import React, { createContext, useContext, useState } from 'react';

const ExecutionContext = createContext();

export const useExecution = () => {
  const context = useContext(ExecutionContext);
  if (!context) {
    throw new Error('useExecution must be used within ExecutionProvider');
  }
  return context;
};

export const ExecutionProvider = ({ children }) => {
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState(`def factorial(n):
    if n <= 1:
        return 1
    else:
        return n * factorial(n - 1)

result = factorial(5)
print(f"Factorial of 5 is: {result}")`);
  
  const [executionState, setExecutionState] = useState({
    isRunning: false,
    isPaused: false,
    currentStep: 0,
    totalSteps: 0,
    stackFrames: [],
    heapObjects: [],
    variables: {},
    currentLine: -1,
    output: [],
    input: '',
    executionSteps: []
  });

  const [testInput, setTestInput] = useState('');

  const value = {
    language,
    setLanguage,
    code,
    setCode,
    executionState,
    setExecutionState,
    testInput,
    setTestInput
  };

  return (
    <ExecutionContext.Provider value={value}>
      {children}
    </ExecutionContext.Provider>
  );
};

export { ExecutionContext };