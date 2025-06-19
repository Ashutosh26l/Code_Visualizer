import React, { useEffect, useRef } from 'react';
import { useExecution } from '../context/ExecutionContext';
import { Play, Pause, Square, SkipBack, SkipForward, StepBack, StepForward, RotateCcw, FastForward } from 'lucide-react';
import { executeCode } from '../utils/codeExecutor';

export const ControlPanel = () => {
  const { language, code, executionState, setExecutionState, testInput } = useExecution();
  const intervalRef = useRef(null);

  // Auto-play functionality
  useEffect(() => {
    if (executionState.isRunning && !executionState.isPaused && executionState.executionSteps) {
      intervalRef.current = setInterval(() => {
        setExecutionState(prev => {
          if (prev.currentStep < prev.totalSteps - 1) {
            const nextStep = prev.currentStep + 1;
            const step = prev.executionSteps[nextStep];
            
            return {
              ...prev,
              currentStep: nextStep,
              currentLine: step.line,
              stackFrames: step.stackFrames,
              heapObjects: step.heapObjects,
              variables: step.variables,
              output: step.output
            };
          } else {
            // Execution finished
            return {
              ...prev,
              isPaused: true
            };
          }
        });
      }, 1500); // 1.5 second delay between steps
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [executionState.isRunning, executionState.isPaused, executionState.currentStep, executionState.totalSteps, setExecutionState]);

  const handleVisualize = async () => {
    try {
      setExecutionState(prev => ({
        ...prev,
        isRunning: false,
        isPaused: false,
        currentStep: 0,
        currentLine: -1,
        stackFrames: [],
        heapObjects: [],
        variables: {},
        output: ['Analyzing code...'],
        executionSteps: []
      }));

      const steps = await executeCode(code, language, testInput);
      
      if (steps.length === 0) {
        setExecutionState(prev => ({
          ...prev,
          output: ['No executable code found']
        }));
        return;
      }

      setExecutionState(prev => ({
        ...prev,
        executionSteps: steps,
        totalSteps: steps.length,
        currentStep: 0,
        isRunning: true,
        isPaused: true, // Start paused so user can control
        currentLine: steps[0]?.line || -1,
        stackFrames: steps[0]?.stackFrames || [],
        heapObjects: steps[0]?.heapObjects || [],
        variables: steps[0]?.variables || {},
        output: steps[0]?.output || []
      }));
    } catch (error) {
      console.error('Execution error:', error);
      setExecutionState(prev => ({
        ...prev,
        output: [`Error: ${error.message}`],
        isRunning: false
      }));
    }
  };

  const handleNext = () => {
    if (executionState.currentStep < executionState.totalSteps - 1) {
      const nextStep = executionState.currentStep + 1;
      const step = executionState.executionSteps[nextStep];
      
      setExecutionState(prev => ({
        ...prev,
        currentStep: nextStep,
        currentLine: step.line,
        stackFrames: step.stackFrames,
        heapObjects: step.heapObjects,
        variables: step.variables,
        output: step.output
      }));
    }
  };

  const handlePrevious = () => {
    if (executionState.currentStep > 0) {
      const prevStep = executionState.currentStep - 1;
      const step = executionState.executionSteps[prevStep];
      
      setExecutionState(prev => ({
        ...prev,
        currentStep: prevStep,
        currentLine: step.line,
        stackFrames: step.stackFrames,
        heapObjects: step.heapObjects,
        variables: step.variables,
        output: step.output
      }));
    }
  };

  const handleFirst = () => {
    if (executionState.executionSteps.length > 0) {
      const step = executionState.executionSteps[0];
      setExecutionState(prev => ({
        ...prev,
        currentStep: 0,
        currentLine: step.line,
        stackFrames: step.stackFrames,
        heapObjects: step.heapObjects,
        variables: step.variables,
        output: step.output
      }));
    }
  };

  const handleLast = () => {
    const lastStep = executionState.totalSteps - 1;
    if (executionState.executionSteps.length > 0 && lastStep >= 0) {
      const step = executionState.executionSteps[lastStep];
      setExecutionState(prev => ({
        ...prev,
        currentStep: lastStep,
        currentLine: step.line,
        stackFrames: step.stackFrames,
        heapObjects: step.heapObjects,
        variables: step.variables,
        output: step.output
      }));
    }
  };

  const handleReset = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    setExecutionState(prev => ({
      ...prev,
      isRunning: false,
      isPaused: false,
      currentStep: 0,
      currentLine: -1,
      stackFrames: [],
      heapObjects: [],
      variables: {},
      output: [],
      executionSteps: []
    }));
  };

  const handlePlayPause = () => {
    if (!executionState.isRunning) return;
    
    setExecutionState(prev => ({
      ...prev,
      isPaused: !prev.isPaused
    }));
  };

  const handleStop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    setExecutionState(prev => ({
      ...prev,
      isRunning: false,
      isPaused: false
    }));
  };

  const getExecutionSpeed = () => {
    return executionState.isPaused ? 'Paused' : 'Playing';
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2 rounded-lg">
              <Play className="h-4 w-4 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800">Execution Control</h2>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="text-sm text-gray-600 bg-white px-3 py-1.5 rounded-lg border border-gray-200">
              Step {executionState.currentStep + 1} of {executionState.totalSteps || 1}
            </div>
            {executionState.isRunning && (
              <div className={`text-xs px-2 py-1 rounded-full ${
                executionState.isPaused 
                  ? 'bg-yellow-100 text-yellow-700' 
                  : 'bg-green-100 text-green-700'
              }`}>
                {getExecutionSpeed()}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex flex-col space-y-4">
          {/* Main Visualize Button */}
          <button
            onClick={handleVisualize}
            disabled={!code.trim()}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <div className="flex items-center justify-center space-x-2">
              <Play className="h-5 w-5" />
              <span>Visualize Execution</span>
            </div>
          </button>
          
          {/* Control Buttons */}
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={handlePlayPause}
              disabled={!executionState.isRunning}
              className="flex items-center justify-center space-x-2 py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title={executionState.isPaused ? 'Resume execution' : 'Pause execution'}
            >
              {executionState.isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
              <span className="text-sm font-medium">
                {executionState.isPaused ? 'Play' : 'Pause'}
              </span>
            </button>
            
            <button
              onClick={handleStop}
              disabled={!executionState.isRunning}
              className="flex items-center justify-center space-x-2 py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Stop execution"
            >
              <Square className="h-4 w-4" />
              <span className="text-sm font-medium">Stop</span>
            </button>
            
            <button
              onClick={handleReset}
              disabled={!executionState.executionSteps || executionState.executionSteps.length === 0}
              className="flex items-center justify-center space-x-2 py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Reset to beginning"
            >
              <RotateCcw className="h-4 w-4" />
              <span className="text-sm font-medium">Reset</span>
            </button>
          </div>
          
          {/* Step Controls */}
          <div className="grid grid-cols-4 gap-2">
            <button
              onClick={handleFirst}
              disabled={!executionState.isRunning || executionState.currentStep === 0}
              className="flex items-center justify-center p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Go to first step"
            >
              <SkipBack className="h-4 w-4" />
            </button>
            
            <button
              onClick={handlePrevious}
              disabled={!executionState.isRunning || executionState.currentStep === 0}
              className="flex items-center justify-center p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Previous step"
            >
              <StepBack className="h-4 w-4" />
            </button>
            
            <button
              onClick={handleNext}
              disabled={!executionState.isRunning || executionState.currentStep >= executionState.totalSteps - 1}
              className="flex items-center justify-center p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Next step"
            >
              <StepForward className="h-4 w-4" />
            </button>
            
            <button
              onClick={handleLast}
              disabled={!executionState.isRunning || executionState.currentStep >= executionState.totalSteps - 1}
              className="flex items-center justify-center p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Go to last step"
            >
              <SkipForward className="h-4 w-4" />
            </button>
          </div>

          {/* Execution Info */}
          {executionState.isRunning && executionState.executionSteps && executionState.executionSteps[executionState.currentStep] && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="text-sm font-medium text-blue-800 mb-1">Current Step:</div>
              <div className="text-sm text-blue-700">
                {executionState.executionSteps[executionState.currentStep].description}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};