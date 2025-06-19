import React from 'react';
import { useExecution } from '../context/ExecutionContext';
import { Variable, ArrowRight, Hash } from 'lucide-react';

export const VariableVisualization = () => {
  const { executionState } = useExecution();

  if (Object.keys(executionState.variables).length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Variable className="h-12 w-12 mx-auto mb-3 text-gray-300" />
        <p className="text-sm">No variables yet</p>
        <p className="text-xs text-gray-400 mt-1">Variables will appear here during execution</p>
      </div>
    );
  }

  const getVariableColor = (type) => {
    switch (type) {
      case 'int':
      case 'number':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'str':
      case 'string':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'bool':
      case 'boolean':
        return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'float':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-3">
      {Object.entries(executionState.variables).map(([name, variable]) => (
        <div
          key={name}
          className={`border rounded-xl p-4 ${getVariableColor(variable.type)}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <span className="font-mono font-semibold text-lg">{name}</span>
                <span className="text-sm opacity-75">({variable.type})</span>
              </div>
              <ArrowRight className="h-4 w-4 opacity-60" />
              <span className="font-mono text-lg">
                {typeof variable.value === 'string' ? `"${variable.value}"` : String(variable.value)}
              </span>
            </div>
            
            {variable.reference && (
              <div className="flex items-center space-x-1 text-sm opacity-75">
                <Hash className="h-3 w-3" />
                <span className="font-mono">{variable.reference}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};