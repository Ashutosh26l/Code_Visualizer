import React from 'react';
import { useExecution } from '../context/ExecutionContext';
import { StackVisualization } from './StackVisualization';
import { HeapVisualization } from './HeapVisualization';
import { VariableVisualization } from './VariableVisualization';
import { Layers, Database, Variable } from 'lucide-react';

export const VisualizationPanel = () => {
  const { executionState } = useExecution();

  return (
    <div className="flex flex-col space-y-6">
      {/* Stack Frames */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-2 rounded-lg">
              <Layers className="h-4 w-4 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Call Stack</h3>
            <span className="text-sm text-gray-600 bg-white px-2 py-1 rounded-full border border-gray-200">
              {executionState.stackFrames.length} frame{executionState.stackFrames.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
        <div className="p-6">
          <StackVisualization />
        </div>
      </div>

      {/* Variables */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-2 rounded-lg">
              <Variable className="h-4 w-4 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Variables</h3>
          </div>
        </div>
        <div className="p-6">
          <VariableVisualization />
        </div>
      </div>

      {/* Heap Memory */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-orange-50 to-red-50 px-6 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-orange-500 to-red-600 p-2 rounded-lg">
              <Database className="h-4 w-4 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Heap Memory</h3>
            <span className="text-sm text-gray-600 bg-white px-2 py-1 rounded-full border border-gray-200">
              {executionState.heapObjects.length} object{executionState.heapObjects.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
        <div className="p-6">
          <HeapVisualization />
        </div>
      </div>
    </div>
  );
};