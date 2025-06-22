
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Bot } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Charm's AI assistant. Ask me anything about his experience, skills, or projects!",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const knowledgeBase = {
    experience: "Charm has over 2 years of experience as a Mobile Engineer, currently working at Phyxle and previously at Space IT Labs, focusing on mobile app development and healthcare applications.",
    skills: "He specializes in React Native, Flask, Node.js, AI integration (Phi-2 LLM), AWS cloud platforms, and full-stack development.",
    projects: "Notable projects include AI To-Do Agent with Phi-2 LLM, House Price Prediction App, Lifesaylor apps on Google Play Store, and multiple WordPress websites.",
    education: "Bachelor of Science in Information Technology (Honours) from Sri Lanka Institute of Information Technology (SLIIT), graduated in 2022.",
    contact: "You can reach Charm at charmthiekshana97@gmail.com or +94 72 975 5955, or connect on LinkedIn at https://www.linkedin.com/in/charm-thiekshana-644b85346"
  };

  const generateResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('experience') || message.includes('work') || message.includes('job')) {
      return knowledgeBase.experience;
    } else if (message.includes('skill') || message.includes('technology') || message.includes('programming')) {
      return knowledgeBase.skills;
    } else if (message.includes('project') || message.includes('portfolio') || message.includes('app')) {
      return knowledgeBase.projects;
    } else if (message.includes('education') || message.includes('degree') || message.includes('university')) {
      return knowledgeBase.education;
    } else if (message.includes('contact') || message.includes('email') || message.includes('phone')) {
      return knowledgeBase.contact;
    } else if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! I'm here to help you learn more about Charm Thiekshana. What would you like to know about his experience, skills, projects, or background?";
    } else {
      return "I can help you learn about Charm's experience, skills, projects, education, or contact information. What specific area interests you?";
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: generateResponse(inputMessage),
      isUser: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage, botResponse]);
    setInputMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 z-[150] animate-pulse ${isOpen ? 'hidden' : 'flex'}`}
        aria-label="Open AI Assistant"
        style={{ marginBottom: isOpen ? '520px' : '0' }}
      >
        <Bot className="w-8 h-8" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-16 right-6 w-80 sm:w-96 h-[500px] shadow-2xl border-0 bg-background/95 backdrop-blur-sm z-[150] dark:bg-gray-900/95 mb-6">
          <CardHeader className="pb-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                <CardTitle className="text-lg">AI Assistant</CardTitle>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 p-0 text-white hover:bg-white/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col h-full p-0">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/30 dark:bg-gray-800/30">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm ${
                      message.isUser
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : 'bg-background dark:bg-gray-700 text-foreground dark:text-gray-200 border border-border dark:border-gray-600'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Input */}
            <div className="border-t border-border dark:border-gray-600 p-4 bg-background dark:bg-gray-800">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about Charm's experience..."
                  className="flex-1 bg-background dark:bg-gray-700 text-foreground dark:text-gray-200"
                />
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default AIChatbot;
