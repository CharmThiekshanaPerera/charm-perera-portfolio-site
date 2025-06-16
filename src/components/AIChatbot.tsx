
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send } from 'lucide-react';

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
    contact: "You can reach Charm at charmthiekshana97@gmail.com or +94 754 465 955, or connect on LinkedIn."
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
        className={`fixed bottom-6 left-6 w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50 ${isOpen ? 'hidden' : 'flex'}`}
        aria-label="Open AI Assistant"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 left-6 w-80 h-96 shadow-2xl border-0 bg-card/95 backdrop-blur-sm z-50">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg gradient-text">AI Assistant</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col h-full p-0">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm ${
                      message.isUser
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Input */}
            <div className="border-t border-border p-4">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about Charm's experience..."
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  className="bg-primary hover:bg-primary/90"
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
