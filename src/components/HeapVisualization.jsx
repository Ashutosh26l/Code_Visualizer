import React from 'react';
import { useExecution } from '../context/ExecutionContext';
import { Box, ArrowRight } from 'lucide-react';

export const HeapVisualization = () => {
  const { executionState } = useExecution();

  if (executionState.heapObjects.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Box className="h-12 w-12 mx-auto mb-3 text-gray-300" />
        <p className="text-sm">No heap objects yet</p>
        <p className="text-xs text-gray-400 mt-1">Objects and arrays will appear here during execution</p>
      </div>
    );
  }

  const getObjectColor = (type) => {
    switch (type) {
      case 'array':
        return 'border-orange-300 bg-orange-50 text-orange-700';
      case 'object':
        return 'border-green-300 bg-green-50 text-green-700';
      case 'list':
        return 'border-blue-300 bg-blue-50 text-blue-700';
      default:
        return 'border-gray-300 bg-gray-50 text-gray-700';
    }
  };

  return (
    <div className="space-y-4">
      {executionState.heapObjects.map((obj) => (
        <div
          key={obj.id}
          className={`border-2 rounded-xl p-4 ${getObjectColor(obj.type)}`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Box className="h-4 w-4" />
              <span className="font-semibold">{obj.type.charAt(0).toUpperCase() + obj.type.slice(1)}</span>
              <span className="text-sm opacity-75">#{obj.id}</span>
            </div>
            {obj.references.length > 0 && (
              <div className="flex items-center space-x-1 text-xs">
                <span>{obj.references.length} reference{obj.references.length !== 1 ? 's' : ''}</span>
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            {Array.isArray(obj.value) ? (
              <div className="flex flex-wrap gap-2">
                {obj.value.map((item, index) => (
                  <div key={index} className="flex items-center space-x-1 bg-white rounded-lg px-2 py-1 text-sm">
                    <span className="text-gray-500">[{index}]</span>
                    <span className="font-mono">
                      {typeof item === 'string' ? `"${item}"` : String(item)}
                    </span>
                  </div>
                ))}
              </div>
            ) : typeof obj.value === 'object' && obj.value !== null ? (
              <div className="space-y-1">
                {Object.entries(obj.value).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2 text-sm">
                    <span className="font-mono text-blue-600">{key}</span>
                    <span className="text-gray-500">:</span>
                    <span className="font-mono">
                      {typeof value === 'string' ? `"${value}"` : String(value)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="font-mono text-sm">
                {typeof obj.value === 'string' ? `"${obj.value}"` : String(obj.value)}
              </div>
            )}
          </div>
          
          {obj.references.length > 0 && (
            <div className="mt-3 pt-3 border-t border-current border-opacity-20">
              <div className="text-xs font-medium mb-1">Referenced by:</div>
              <div className="flex flex-wrap gap-1">
                {obj.references.map((ref, index) => (
                  <span key={index} className="bg-white bg-opacity-50 px-2 py-1 rounded text-xs font-mono">
                    {ref}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};