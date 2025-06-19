import React, { useEffect, useRef } from 'react';
import { useExecution } from '../context/ExecutionContext';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Code, Copy, Download, Upload, FileText, Save } from 'lucide-react';

const languageExamples = {
  python: `def factorial(n):
    if n <= 1:
        return 1
    else:
        return n * factorial(n - 1)

def fibonacci(n):
    if n <= 1:
        return n
    else:
        return fibonacci(n - 1) + fibonacci(n - 2)

# Test the functions
result = factorial(5)
print(f"Factorial of 5 is: {result}")

fib_result = fibonacci(6)
print(f"Fibonacci of 6 is: {fib_result}")

# Array example
numbers = [1, 2, 3, 4, 5]
print(f"Numbers: {numbers}")`,
  
  java: `public class MathOperations {
    public static int factorial(int n) {
        if (n <= 1) {
            return 1;
        } else {
            return n * factorial(n - 1);
        }
    }
    
    public static int fibonacci(int n) {
        if (n <= 1) {
            return n;
        } else {
            return fibonacci(n - 1) + fibonacci(n - 2);
        }
    }
    
    public static void main(String[] args) {
        int result = factorial(5);
        System.out.println("Factorial of 5 is: " + result);
        
        int fibResult = fibonacci(6);
        System.out.println("Fibonacci of 6 is: " + fibResult);
        
        // Array example
        int[] numbers = {1, 2, 3, 4, 5};
        System.out.println("Array created with 5 elements");
    }
}`,
  
  cpp: `#include <iostream>
#include <vector>
using namespace std;

int factorial(int n) {
    if (n <= 1) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}

int fibonacci(int n) {
    if (n <= 1) {
        return n;
    } else {
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
}

int main() {
    int result = factorial(5);
    cout << "Factorial of 5 is: " << result << endl;
    
    int fibResult = fibonacci(6);
    cout << "Fibonacci of 6 is: " << fibResult << endl;
    
    // Vector example
    vector<int> numbers = {1, 2, 3, 4, 5};
    cout << "Vector created with 5 elements" << endl;
    
    return 0;
}`
};

export const CodeEditor = () => {
  const { language, setLanguage, code, setCode, executionState } = useExecution();
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setCode(languageExamples[newLanguage]);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const handleDownload = () => {
    const extensions = { python: 'py', java: 'java', cpp: 'cpp' };
    const extension = extensions[language];
    const filename = `code.${extension}`;
    
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result;
        if (typeof content === 'string') {
          setCode(content);
          
          // Try to detect language from file extension
          const extension = file.name.split('.').pop()?.toLowerCase();
          if (extension === 'py') {
            setLanguage('python');
          } else if (extension === 'java') {
            setLanguage('java');
          } else if (extension === 'cpp' || extension === 'cc' || extension === 'cxx') {
            setLanguage('cpp');
          }
        }
      };
      reader.readAsText(file);
    }
    // Reset the input
    event.target.value = '';
  };

  const handleClearCode = () => {
    setCode('');
  };

  const handleLoadExample = () => {
    setCode(languageExamples[language]);
  };

  const getLanguageForPrism = (lang) => {
    switch (lang) {
      case 'cpp': return 'cpp';
      case 'java': return 'java';
      case 'python': return 'python';
      default: return 'python';
    }
  };

  // Sync textarea scroll with syntax highlighter
  const handleScroll = (e) => {
    const syntaxHighlighter = e.target.parentElement.querySelector('.syntax-highlighter');
    if (syntaxHighlighter) {
      syntaxHighlighter.scrollTop = e.target.scrollTop;
      syntaxHighlighter.scrollLeft = e.target.scrollLeft;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Code className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-800">Code Editor</h2>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex bg-white rounded-lg p-1 shadow-sm border border-gray-200">
              {Object.keys(languageExamples).map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                    language === lang
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </button>
              ))}
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={handleCopy}
                className="p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                title="Copy code"
              >
                <Copy className="h-4 w-4" />
              </button>
              
              <button
                onClick={handleDownload}
                className="p-2 rounded-lg text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors"
                title="Download code"
              >
                <Download className="h-4 w-4" />
              </button>
              
              <button
                onClick={handleUpload}
                className="p-2 rounded-lg text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-colors"
                title="Upload code file"
              >
                <Upload className="h-4 w-4" />
              </button>
              
              <input
                ref={fileInputRef}
                type="file"
                accept=".py,.java,.cpp,.cc,.cxx,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </div>
        </div>
        
        {/* Additional Controls */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <button
              onClick={handleLoadExample}
              className="text-sm px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
            >
              Load Example
            </button>
            <button
              onClick={handleClearCode}
              className="text-sm px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
            >
              Clear Code
            </button>
          </div>
          
          <div className="text-sm text-gray-500">
            Lines: {code.split('\n').length} | Characters: {code.length}
          </div>
        </div>
      </div>
      
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onScroll={handleScroll}
          className="w-full h-96 p-4 font-mono text-sm bg-transparent text-gray-800 resize-none focus:outline-none absolute inset-0 z-10 opacity-0 cursor-text"
          spellCheck={false}
          style={{ 
            fontFamily: 'SF Mono, Monaco, Inconsolata, "Roboto Mono", Consolas, "Courier New", monospace',
            lineHeight: '1.6'
          }}
          placeholder={`Enter your ${language} code here...`}
        />
        
        <div className="relative z-0 syntax-highlighter">
          <SyntaxHighlighter
            language={getLanguageForPrism(language)}
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              padding: '16px',
              backgroundColor: '#1e1e1e',
              fontSize: '14px',
              lineHeight: '1.6',
              fontFamily: 'SF Mono, Monaco, Inconsolata, "Roboto Mono", Consolas, "Courier New", monospace',
              height: '384px',
              overflow: 'auto'
            }}
            showLineNumbers={true}
            lineNumberStyle={{
              minWidth: '3em',
              paddingRight: '1em',
              color: '#6B7280',
              borderRight: '1px solid #374151',
              marginRight: '1em'
            }}
            wrapLines={true}
            lineProps={(lineNumber) => ({
              style: {
                display: 'block',
                backgroundColor: executionState.currentLine === lineNumber ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                borderLeft: executionState.currentLine === lineNumber ? '3px solid #3B82F6' : '3px solid transparent',
                paddingLeft: '8px',
                marginLeft: '-8px'
              }
            })}
          >
            {code || `// Enter your ${language} code here...`}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};