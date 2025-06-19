import React from 'react';
import { useExecution } from '../context/ExecutionContext';
import { ChevronRight, FunctionSquare as Function } from 'lucide-react';

export const StackVisualization = () => {
  const { executionState } = useExecution();

  if (executionState.stackFrames.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Function className="h-12 w-12 mx-auto mb-3 text-gray-300" />
        <p className="text-sm">No function calls yet</p>
        <p className="text-xs text-gray-400 mt-1">Stack frames will appear here during execution</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {executionState.stackFrames.map((frame, index) => (
        <div
          key={frame.id}
          className={`border-2 rounded-xl p-4 transition-all ${
            index === executionState.stackFrames.length - 1
              ? 'border-purple-300 bg-purple-50 shadow-lg'
              : 'border-gray-200 bg-gray-50'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className={`p-1.5 rounded-lg ${
                index === executionState.stackFrames.length - 1
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-400 text-white'
              }`}>
                <Function className="h-3 w-3" />
              </div>
              <span className="font-semibold text-gray-800">{frame.function}</span>
              <span className="text-sm text-gray-500">Line {frame.line}</span>
            </div>
            {index === executionState.stackFrames.length - 1 && (
              <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                Current
              </span>
            )}
          </div>
          
          {Object.keys(frame.variables).length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Local Variables:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {Object.entries(frame.variables).map(([name, variable]) => (
                  <div key={name} className="flex items-center space-x-2 text-sm">
                    <span className="font-mono text-blue-600">{name}</span>
                    <span className="text-gray-500">=</span>
                    <span className="font-mono text-gray-800">
                      {typeof variable.value === 'string' ? `"${variable.value}"` : String(variable.value)}
                    </span>
                    <span className="text-xs text-gray-400">({variable.type})</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};