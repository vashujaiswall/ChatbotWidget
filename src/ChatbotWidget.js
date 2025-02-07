(function() {
    // Create the chatbot widget container
    const chatbotContainer = document.createElement('div');
    chatbotContainer.id = 'chatbot-container';
    chatbotContainer.style.position = 'fixed';
    chatbotContainer.style.bottom = '20px';
    chatbotContainer.style.right = '20px';
    chatbotContainer.style.width = '350px';
    chatbotContainer.style.height = '450px';
    chatbotContainer.style.backgroundColor = '#fff';
    chatbotContainer.style.borderRadius = '10px';
    chatbotContainer.style.boxShadow = '0 4px 8px rgba(201, 18, 18, 0.32)';
    chatbotContainer.style.display = 'none';  // Initially hidden
    chatbotContainer.style.flexDirection = 'column';
    chatbotContainer.style.zIndex = '9999';

    // Add the chatbot container to the document body
    document.body.appendChild(chatbotContainer);

    // Chat Header
    const chatHeader = document.createElement('div');
    chatHeader.style.backgroundColor = '#4CAF50';
    chatHeader.style.color = 'white';
    chatHeader.style.padding = '10px';
    chatHeader.style.textAlign = 'center';
    chatHeader.style.fontWeight = 'bold';
    chatHeader.innerText = 'Chatbot';
    chatbotContainer.appendChild(chatHeader);

    // Messages Container
    const chatMessages = document.createElement('div');
    chatMessages.id = 'chat-messages';
    chatMessages.style.flex = '1';
    chatMessages.style.overflowY = 'auto';
    chatMessages.style.padding = '10px';
    chatMessages.style.backgroundColor = '#f1f1f1';
    chatbotContainer.appendChild(chatMessages);

    // Input Area
    const inputArea = document.createElement('div');
    inputArea.style.display = 'flex';
    inputArea.style.padding = '10px';
    chatbotContainer.appendChild(inputArea);

    const userInput = document.createElement('input');
    userInput.type = 'text';
    userInput.placeholder = 'Ask me anything...';
    userInput.style.flex = '1';
    userInput.style.padding = '10px';
    userInput.style.borderRadius = '5px';
    userInput.style.border = '1px solid #ccc';
    inputArea.appendChild(userInput);

    const sendButton = document.createElement('button');
    sendButton.innerText = 'Send';
    sendButton.style.padding = '10px';
    sendButton.style.backgroundColor = '#4CAF50';
    sendButton.style.color = 'white';
    sendButton.style.border = 'none';
    sendButton.style.cursor = 'pointer';
    sendButton.style.borderRadius = '5px';
    inputArea.appendChild(sendButton);

    // Close Button
    const closeButton = document.createElement('button');
    closeButton.innerText = 'X';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';
    closeButton.style.backgroundColor = '#ff4d4d';
    closeButton.style.color = 'white';
    closeButton.style.border = 'none';
    closeButton.style.cursor = 'pointer';
    closeButton.style.padding = '5px';
    closeButton.style.borderRadius = '50%';
    chatbotContainer.appendChild(closeButton);

    // Toggle button to show/hide the chatbot
    const toggleButton = document.createElement('button');
    toggleButton.innerHTML = '💬';
    toggleButton.style.position = 'fixed';
    toggleButton.style.bottom = '20px';
    toggleButton.style.right = '20px';
    toggleButton.style.backgroundColor = '#4CAF50';
    toggleButton.style.color = 'white';
    toggleButton.style.padding = '10px 15px';
    toggleButton.style.borderRadius = '50%';
    toggleButton.style.cursor = 'pointer';
    toggleButton.style.zIndex = '10000';
    document.body.appendChild(toggleButton);

    // Show and hide the chatbot (hide when toggle is clicked)
    toggleButton.onclick = () => {
        chatbotContainer.style.display = 'flex';  // Show chatbot
        toggleButton.style.display = 'none';  // Hide the toggle button once clicked
    };

    // Close the chatbot widget and show the toggle button again
    closeButton.onclick = () => {
        chatbotContainer.style.display = 'none';  // Hide chatbot
        toggleButton.style.display = 'block';  // Show the toggle button again
    };

    // Append messages to the chat window
    function appendMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.innerText = message;
        messageDiv.style.padding = '10px';
        messageDiv.style.borderRadius = '10px';
        messageDiv.style.marginBottom = '10px';
        messageDiv.style.maxWidth = '80%';
        if (sender === 'user') {
            messageDiv.style.backgroundColor = '#d1f7ff';
            messageDiv.style.textAlign = 'right';
            messageDiv.style.marginLeft = 'auto';
        } else {
            messageDiv.style.backgroundColor = '#e1e1e1';
            messageDiv.style.textAlign = 'left';
        }
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the bottom
    }

    // Handle user input on hitting Enter key
    userInput.addEventListener('keypress', async function(event) {
        if (event.key === 'Enter') {
            const message = userInput.value.trim();
            if (message) {
                appendMessage(message, 'user');
                userInput.value = '';
                // Simulate bot response
                await handleBotResponse(message);
            }
        }
    });

    // Send the message when the send button is clicked
    sendButton.onclick = async function() {
        const message = userInput.value.trim();
        if (!message) return;
        appendMessage(message, 'user');
        userInput.value = '';
        await handleBotResponse(message);
    };

    // Bot response handling
    async function handleBotResponse(message) {
        let response = '';
        // Here, you can define some commands or simulate responses based on user input
        switch (message.toLowerCase()) {
            case 'hello rashi':
                response = 'hello apka din kaisa gya';
                break;
            case 'how are you?':
                response = 'I am doing well, thank you for asking!';
                break;
            case 'bye':
                response = 'Goodbye! Have a great day!';
                break;
            default:
                // Simulate an API call to fetch the bot's response
                try {
                    const apiResponse = await fetch('https://your-chatbot-api.com/sendMessage', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ message }),
                    });
                    const data = await apiResponse.json();
                    if (data && data.response) {
                        response = data.response;
                    }
                } catch (error) {
                    console.error('Error:', error);
                    response = "Sorry, there was an issue. Please try again.";
                }
                break;
        }
        appendMessage(response, 'bot');
    }
})();
