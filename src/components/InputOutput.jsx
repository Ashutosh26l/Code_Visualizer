import React from 'react';
import { useExecution } from '../context/ExecutionContext';
import { Terminal, FileInput as Input, FileOutput as Output } from 'lucide-react';

export const InputOutput = () => {
  const { testInput, setTestInput, executionState } = useExecution();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Input Section */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 px-6 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-2 rounded-lg">
              <Input className="h-4 w-4 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Test Input</h3>
          </div>
        </div>
        <div className="p-6">
          <textarea
            value={testInput}
            onChange={(e) => setTestInput(e.target.value)}
            placeholder="Enter test input (optional)..."
            className="w-full h-32 p-4 border border-gray-200 rounded-xl font-mono text-sm bg-gray-50 focus:bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
          />
          <p className="text-xs text-gray-500 mt-2">
            Provide input that your program might need (one value per line)
          </p>
        </div>
      </div>

      {/* Output Section */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 px-6 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-emerald-500 to-green-600 p-2 rounded-lg">
              <Output className="h-4 w-4 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Program Output</h3>
          </div>
        </div>
        <div className="p-6">
          <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm min-h-32 max-h-32 overflow-y-auto">
            {executionState.output.length > 0 ? (
              <div className="space-y-1">
                {executionState.output.map((line, index) => (
                  <div key={index} className="text-green-400">
                    {line}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-500 italic">
                Output will appear here...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};