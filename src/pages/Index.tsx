
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import VideoCallInterface from '@/components/VideoCallInterface';
import DomainSelector from '@/components/DomainSelector';
import ChatInterface from '@/components/ChatInterface';
import CodeEditor from '@/components/CodeEditor';
import InterviewScorecard from '@/components/InterviewScorecard';
import { Mic, MicOff, Video, VideoOff, Users, Settings } from 'lucide-react';

const Index = () => {
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [showScorecard, setShowScorecard] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<string>('');
  const [showCodeEditor, setShowCodeEditor] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [messages, setMessages] = useState<Array<{id: string, text: string, sender: 'ai' | 'user', timestamp: Date}>>([]);

  const handleDomainSelect = (domain: string) => {
    setSelectedDomain(domain);
    setInterviewStarted(true);
    
    // Welcome message when domain is selected
    const welcomeMessage = {
      id: Date.now().toString(),
      text: `Welcome to your ${domain} interview! I'm your AI interviewer. Let's start with some questions to understand your background. Are you ready to begin?`,
      sender: 'ai' as const,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
    setCurrentQuestion(welcomeMessage.text);
  };

  const handleEndInterview = () => {
    setShowScorecard(true);
  };

  const handleNewInterview = () => {
    setSelectedDomain(null);
    setInterviewStarted(false);
    setShowScorecard(false);
    setMessages([]);
    setCurrentQuestion('');
    setShowCodeEditor(false);
  };

  if (showScorecard) {
    return (
      <InterviewScorecard 
        domain={selectedDomain || ''}
        messages={messages}
        onNewInterview={handleNewInterview}
      />
    );
  }

  if (!selectedDomain) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              AI Interview Assistant
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Practice your interview skills with our AI-powered voice assistant. 
              Select your domain and get personalized questions with real-time feedback.
            </p>
          </div>
          
          <DomainSelector onDomainSelect={handleDomainSelect} />
          
          <div className="mt-8 text-center">
            <div className="flex justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Voice Synthesis</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Real-time Analysis</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span>Code Editor</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold">
              {selectedDomain} Interview Session
            </h1>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span>Recording</span>
            </div>
          </div>
          
          {/* Video Controls */}
          <div className="flex items-center space-x-2">
            <Button
              variant={isMuted ? "destructive" : "secondary"}
              size="sm"
              onClick={() => setIsMuted(!isMuted)}
              className="p-2"
            >
              {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </Button>
            
            <Button
              variant={isVideoOff ? "destructive" : "secondary"}
              size="sm"
              onClick={() => setIsVideoOff(!isVideoOff)}
              className="p-2"
            >
              {isVideoOff ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
            </Button>
            
            <Button variant="outline" size="sm" className="p-2">
              <Settings className="w-4 h-4" />
            </Button>
            
            <Button 
              variant="destructive" 
              onClick={handleEndInterview}
              className="px-4"
            >
              End Interview
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Side - Video */}
        <div className="flex-1 p-4">
          <VideoCallInterface 
            isVideoOff={isVideoOff} 
            isMuted={isMuted}
            currentQuestion={currentQuestion}
          />
        </div>

        {/* Right Side - Chat and Code Editor */}
        <div className="w-96 border-l border-gray-700 flex flex-col">
          {showCodeEditor && (
            <div className="h-1/2 border-b border-gray-700">
              <CodeEditor />
            </div>
          )}
          
          <div className={showCodeEditor ? "h-1/2" : "h-full"}>
            <ChatInterface 
              messages={messages}
              setMessages={setMessages}
              domain={selectedDomain}
              onQuestionUpdate={setCurrentQuestion}
              onShowCodeEditor={setShowCodeEditor}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
