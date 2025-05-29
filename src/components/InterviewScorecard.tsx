
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Trophy, Target, Clock, MessageSquare, Code, RotateCcw } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'ai' | 'user';
  timestamp: Date;
}

interface InterviewScorecardProps {
  domain: string;
  messages: Message[];
  onNewInterview: () => void;
}

const InterviewScorecard: React.FC<InterviewScorecardProps> = ({ 
  domain, 
  messages, 
  onNewInterview 
}) => {
  // Calculate interview metrics
  const userMessages = messages.filter(m => m.sender === 'user');
  const aiMessages = messages.filter(m => m.sender === 'ai');
  const interviewDuration = messages.length > 0 ? 
    Math.round((messages[messages.length - 1].timestamp.getTime() - messages[0].timestamp.getTime()) / 60000) : 0;

  // Generate scores (in a real app, this would be AI-analyzed)
  const scores = {
    communication: Math.floor(Math.random() * 20) + 75,
    technical: Math.floor(Math.random() * 25) + 70,
    problemSolving: Math.floor(Math.random() * 20) + 75,
    overall: Math.floor(Math.random() * 15) + 80
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getPerformanceLevel = (score: number) => {
    if (score >= 85) return { level: 'Excellent', color: 'bg-green-500' };
    if (score >= 70) return { level: 'Good', color: 'bg-yellow-500' };
    return { level: 'Needs Improvement', color: 'bg-red-500' };
  };

  const overallPerformance = getPerformanceLevel(scores.overall);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Interview Complete!</h1>
          <p className="text-lg text-gray-600">{domain} Interview Assessment</p>
        </div>

        {/* Overall Score */}
        <Card className="mb-6 p-6 text-center">
          <div className="mb-4">
            <div className="text-4xl font-bold text-gray-900 mb-2">{scores.overall}%</div>
            <Badge className={`${overallPerformance.color} text-white px-4 py-1`}>
              {overallPerformance.level}
            </Badge>
          </div>
          <Progress value={scores.overall} className="w-full h-3" />
        </Card>

        {/* Detailed Scores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-blue-500" />
                <span className="font-medium">Communication</span>
              </div>
              <span className={`font-bold ${getScoreColor(scores.communication)}`}>
                {scores.communication}%
              </span>
            </div>
            <Progress value={scores.communication} className="h-2" />
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Code className="w-5 h-5 text-green-500" />
                <span className="font-medium">Technical Skills</span>
              </div>
              <span className={`font-bold ${getScoreColor(scores.technical)}`}>
                {scores.technical}%
              </span>
            </div>
            <Progress value={scores.technical} className="h-2" />
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-purple-500" />
                <span className="font-medium">Problem Solving</span>
              </div>
              <span className={`font-bold ${getScoreColor(scores.problemSolving)}`}>
                {scores.problemSolving}%
              </span>
            </div>
            <Progress value={scores.problemSolving} className="h-2" />
          </Card>
        </div>

        {/* Interview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="p-4 text-center">
            <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{interviewDuration}</div>
            <div className="text-sm text-gray-600">Minutes</div>
          </Card>

          <Card className="p-4 text-center">
            <MessageSquare className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{aiMessages.length}</div>
            <div className="text-sm text-gray-600">Questions Asked</div>
          </Card>

          <Card className="p-4 text-center">
            <Target className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{userMessages.length}</div>
            <div className="text-sm text-gray-600">Responses Given</div>
          </Card>
        </div>

        {/* Feedback */}
        <Card className="p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Interview Feedback</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-green-600 mb-2">Strengths</h4>
              <ul className="text-gray-700 space-y-1">
                <li>• Clear and articulate communication</li>
                <li>• Good understanding of {domain.toLowerCase()} concepts</li>
                <li>• Engaged throughout the interview process</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-orange-600 mb-2">Areas for Improvement</h4>
              <ul className="text-gray-700 space-y-1">
                <li>• Consider providing more specific examples</li>
                <li>• Practice explaining complex concepts more simply</li>
                <li>• Work on time management for coding challenges</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex justify-center space-x-4">
          <Button 
            onClick={onNewInterview}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Start New Interview
          </Button>
          
          <Button variant="outline" className="px-8 py-3">
            Download Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewScorecard;
