import React, { useState } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (e) => setInput(e.target.value);

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    // Add user message to chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: input, sender: 'user' },
    ]);

    // Bot's response simulation
    let botMessage = '';

    switch (input.toLowerCase()) {
      case 'hello alia':
        botMessage = 'Hello! baby how was your day!!';
        break;
      case 'what is your name?':
        botMessage = 'I am your friendly chatbot!';
        break;
      case 'how are you?':
        botMessage = 'I am doing great, thanks for asking!';
        break;
      case 'what can you do?':
        botMessage = 'I can answer your questions and help with basic tasks!';
        break;
      default:
        botMessage = "I'm sorry, I don't understand that command.";
        break;
    }

    // Add bot message to chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: botMessage, sender: 'bot' },
    ]);

    setInput(''); // Clear input field
  };

  const toggleChatbot = () => setIsOpen(!isOpen);
  const closeChatbot = () => setIsOpen(false);

  return (
    <div>
      {/* Toggle button with chat icon */}
      <button className="chatbot-toggle" onClick={toggleChatbot}>
        <img src="https://img.icons8.com/ios/50/000000/chat.png" alt="chat-icon" />
      </button>

      {/* Chatbot container */}
      <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
        <div className="chatbox">
          <div className="chat-header">
            <span>Chatbot</span>
            <button className="close-btn" onClick={closeChatbot}>
              &times;
            </button>
          </div>

          {/* Display messages */}
          <div className="messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={msg.sender === 'user' ? 'user-message' : 'bot-message'}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input area */}
          <div className="input-area">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Ask me something..."
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
