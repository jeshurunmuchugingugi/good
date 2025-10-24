import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Minimize2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Nice!",
      sender: 'bot',
      timestamp: new Date()
    },
    {
      id: 2,
      text: "What is your role at Acme Corp?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulate real-time messaging (in production, use WebSocket or similar)
  useEffect(() => {
    const interval = setInterval(() => {
      // Check for new messages from admin (mock implementation)
      // In production, this would be replaced with WebSocket connection
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        text: newMessage,
        sender: 'user',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, message]);
      setNewMessage('');
      
      // Send to admin (mock implementation)
      // In production, send via WebSocket or API
      console.log('Sending to admin:', message);
      
      // Simulate bot typing
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        // Add mock admin response
        const adminResponse = {
          id: Date.now() + 1,
          text: "Thanks for your message! An admin will respond shortly.",
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, adminResponse]);
      }, 2000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Bot Button */}
      <div 
        className="fixed bottom-6 right-6 cursor-pointer animate-bounce"
        style={{zIndex: 9999, animation: 'bounce 2s infinite'}}
        onClick={() => setIsOpen(true)}
      >
        <div 
          className="w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 pulse"
          style={{backgroundColor: '#FC9E3B', boxShadow: '0 0 20px rgba(252, 158, 59, 0.5)'}}
        >
          <MessageCircle className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* Chatbot Popup */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-2xl shadow-2xl border overflow-hidden" style={{zIndex: 9999}}>
          {/* Header */}
          <div className="bg-purple-500 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold">LeadBot</div>
                <div className="text-xs opacity-90">Online Now</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="hover:bg-purple-600 p-1 rounded">
                <Minimize2 className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:bg-purple-600 p-1 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 h-64 overflow-y-auto bg-gray-50">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                    {message.sender === 'bot' && (
                      <div className="flex items-center space-x-2 mb-1">
                        <div className="w-6 h-6 bg-purple-500 rounded-lg flex items-center justify-center">
                          <MessageCircle className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-xs text-gray-500">LeadBot</span>
                      </div>
                    )}
                    <div className={`p-3 rounded-2xl ${
                      message.sender === 'user' 
                        ? 'bg-purple-500 text-white' 
                        : 'bg-white border shadow-sm'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Quick Reply Buttons (for first interaction) */}
              {messages.length === 2 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  <button 
                    onClick={() => setNewMessage('Marketing')}
                    className="px-3 py-1 border border-purple-300 text-purple-600 rounded-full text-sm hover:bg-purple-50"
                  >
                    Marketing
                  </button>
                  <button 
                    onClick={() => setNewMessage('Sales')}
                    className="px-3 py-1 border border-purple-300 text-purple-600 rounded-full text-sm hover:bg-purple-50"
                  >
                    Sales
                  </button>
                  <button 
                    onClick={() => setNewMessage('Support')}
                    className="px-3 py-1 border border-purple-300 text-purple-600 rounded-full text-sm hover:bg-purple-50"
                  >
                    Support
                  </button>
                </div>
              )}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-purple-500 rounded-lg flex items-center justify-center">
                      <MessageCircle className="w-3 h-3 text-white" />
                    </div>
                    <div className="bg-white border shadow-sm p-3 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t bg-white">
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Reply to LeadBot..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 border-gray-300 rounded-full"
              />
              <Button
                onClick={handleSendMessage}
                className="rounded-full w-10 h-10 p-0"
                style={{backgroundColor: '#FC9E3B'}}
                disabled={!newMessage.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
              <span>We run on Drift</span>
              <span>⚡ by Drift</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}