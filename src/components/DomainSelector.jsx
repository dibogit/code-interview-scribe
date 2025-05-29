
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Code, Briefcase, Calculator, Palette, Users, Brain } from 'lucide-react';

const DomainSelector = ({ onDomainSelect }) => {
  const domains = [
    {
      name: 'Software Development',
      icon: Code,
      description: 'Programming, algorithms, system design',
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Business & Management',
      icon: Briefcase,
      description: 'Leadership, strategy, operations',
      color: 'from-green-500 to-green-600'
    },
    {
      name: 'Data Science & Analytics',
      icon: Calculator,
      description: 'Statistics, machine learning, data analysis',
      color: 'from-purple-500 to-purple-600'
    },
    {
      name: 'Design & UX',
      icon: Palette,
      description: 'User experience, visual design, prototyping',
      color: 'from-pink-500 to-pink-600'
    },
    {
      name: 'Marketing & Sales',
      icon: Users,
      description: 'Digital marketing, sales strategy, growth',
      color: 'from-orange-500 to-orange-600'
    },
    {
      name: 'Product Management',
      icon: Brain,
      description: 'Product strategy, roadmapping, user research',
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {domains.map((domain, index) => {
        const IconComponent = domain.icon;
        return (
          <Card 
            key={index}
            className="relative overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer group"
            onClick={() => onDomainSelect(domain.name)}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${domain.color} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
            
            <div className="relative p-6 text-center">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${domain.color} text-white mb-4`}>
                <IconComponent className="w-8 h-8" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {domain.name}
              </h3>
              
              <p className="text-gray-600 mb-4">
                {domain.description}
              </p>
              
              <Button 
                className={`w-full bg-gradient-to-r ${domain.color} hover:opacity-90 text-white border-0`}
              >
                Start Interview
              </Button>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default DomainSelector;
