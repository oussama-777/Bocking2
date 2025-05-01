import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MessageCircle, Send, X } from 'lucide-react';

interface AiAssistantProps {
  categoryType?: string;
}

const AiAssistant: React.FC<AiAssistantProps> = ({ categoryType }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState<{role: 'user' | 'assistant', content: string}[]>([
    {
      role: 'assistant',
      content: categoryType 
        ? t('ai.welcomeWithCategory', { category: t(`categories.${categoryType}`) })
        : t('ai.welcome')
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message to conversation
    const newConversation = [
      ...conversation,
      { role: 'user', content: message }
    ];
    setConversation(newConversation);
    setMessage('');
    
    // Simulate AI typing
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      let response = '';
      
      // Simple rule-based responses (would be replaced with actual API calls)
      if (message.toLowerCase().includes('hotel') || categoryType === 'hotels') {
        response = t('ai.hotelResponse');
      } else if (message.toLowerCase().includes('car') || categoryType === 'cars') {
        response = t('ai.carResponse');
      } else if (message.toLowerCase().includes('restaurant') || categoryType === 'restaurants') {
        response = t('ai.restaurantResponse');
      } else if (message.toLowerCase().includes('activity') || categoryType === 'activities') {
        response = t('ai.activityResponse');
      } else if (message.toLowerCase().includes('budget') || message.toLowerCase().includes('price')) {
        response = t('ai.budgetResponse');
      } else if (message.toLowerCase().includes('login') || message.toLowerCase().includes('sign')) {
        response = t('ai.accountResponse');
      } else {
        response = t('ai.generalResponse');
      }
      
      setConversation([...newConversation, { role: 'assistant', content: response }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 rtl:left-6 rtl:right-auto bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-colors duration-300 z-50"
        aria-label={t('ai.openChat')}
      >
        <MessageCircle className="h-6 w-6" />
      </button>
      
      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 rtl:left-6 rtl:right-auto w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50 flex flex-col max-h-[500px] border border-gray-200 dark:border-gray-700">
          {/* Chat header */}
          <div className="bg-blue-600 text-white px-4 py-3 rounded-t-lg flex justify-between items-center">
            <h3 className="font-medium">{t('ai.assistantName')}</h3>
            <button 
              onClick={toggleChat}
              className="text-white hover:text-gray-200 transition-colors duration-300"
              aria-label={t('ai.closeChat')}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Chat messages */}
          <div className="flex-1 p-4 overflow-y-auto flex flex-col space-y-3 min-h-[300px]">
            {conversation.map((msg, index) => (
              <div
                key={index}
                className={`${
                  msg.role === 'user'
                    ? 'bg-blue-100 dark:bg-blue-900 ml-auto rtl:mr-auto rtl:ml-0'
                    : 'bg-gray-100 dark:bg-gray-700 mr-auto rtl:ml-auto rtl:mr-0'
                } rounded-lg px-4 py-2 max-w-[80%]`}
              >
                <p className={`text-sm ${
                  msg.role === 'user'
                    ? 'text-blue-900 dark:text-blue-100'
                    : 'text-gray-800 dark:text-gray-100'
                }`}>
                  {msg.content}
                </p>
              </div>
            ))}
            
            {isTyping && (
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2 max-w-[80%] mr-auto rtl:ml-auto rtl:mr-0">
                <div className="flex space-x-1 rtl:space-x-reverse">
                  <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}
          </div>
          
          {/* Chat input */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-3 flex items-center">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white resize-none"
              placeholder={t('ai.typePlaceholder')}
              rows={1}
            />
            <button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className={`ml-2 rtl:mr-2 rtl:ml-0 rounded-full p-2 ${
                message.trim()
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-200 dark:bg-gray-600 text-gray-400 dark:text-gray-300 cursor-not-allowed'
              } transition-colors duration-300`}
              aria-label={t('ai.send')}
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AiAssistant;