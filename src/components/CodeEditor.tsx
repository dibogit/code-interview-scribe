
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Copy, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

const CodeEditor: React.FC = () => {
  const [code, setCode] = useState('// Write your solution here\nfunction solution() {\n    \n}');
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState('');

  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' }
  ];

  const handleRunCode = () => {
    // Simulate code execution
    setOutput('Code execution simulated.\nOutput: Function executed successfully!');
    toast.success('Code executed successfully!');
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success('Code copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy code');
    }
  };

  const handleReset = () => {
    setCode('// Write your solution here\nfunction solution() {\n    \n}');
    setOutput('');
  };

  return (
    <Card className="h-full bg-gray-800 border-gray-600 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-600">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-white">Code Editor</h3>
          <div className="flex items-center space-x-2">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-32 bg-gray-700 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value} className="text-white">
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button onClick={handleRunCode} size="sm" className="bg-green-600 hover:bg-green-700">
            <Play className="w-3 h-3 mr-1" />
            Run
          </Button>
          <Button onClick={handleCopyCode} size="sm" variant="outline" className="border-gray-600 text-gray-300">
            <Copy className="w-3 h-3 mr-1" />
            Copy
          </Button>
          <Button onClick={handleReset} size="sm" variant="outline" className="border-gray-600 text-gray-300">
            <RotateCcw className="w-3 h-3 mr-1" />
            Reset
          </Button>
        </div>
      </div>

      {/* Code Editor */}
      <div className="flex-1 p-4">
        <Textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="h-32 font-mono text-sm bg-gray-900 border-gray-600 text-green-400 resize-none"
          placeholder="Write your code here..."
        />
      </div>

      {/* Output */}
      <div className="p-4 border-t border-gray-600">
        <h4 className="text-sm font-medium text-white mb-2">Output:</h4>
        <div className="bg-gray-900 border border-gray-600 rounded p-2 text-sm font-mono text-gray-300 min-h-[60px]">
          {output || 'No output yet. Run your code to see results.'}
        </div>
      </div>
    </Card>
  );
};

export default CodeEditor;
