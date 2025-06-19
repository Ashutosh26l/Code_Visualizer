import React, { createContext, useContext } from 'react';
import type { Language, ExecutionState } from '../types';

interface ExecutionContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  code: string;
  setCode: (code: string) => void;
  executionState: ExecutionState;
  setExecutionState: (state: ExecutionState) => void;
  testInput: string;
  setTestInput: (input: string) => void;
}

const ExecutionContext = createContext<ExecutionContextType | undefined>(undefined);

export const useExecution = () => {
  const context = useContext(ExecutionContext);
  if (!context) {
    throw new Error('useExecution must be used within ExecutionContext');
  }
  return context;
};

export { ExecutionContext };