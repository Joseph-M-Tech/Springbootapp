document.addEventListener('DOMContentLoaded', function() {
    // Chat functionality
    const chatInput = document.querySelector('.chat-input input');
    const sendButton = document.querySelector('.send-btn');
    const chatMessages = document.querySelector('.chat-messages');

    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            // Add user message
            addMessage(message, 'user');
            
            // Simulate AI response
            setTimeout(() => {
                addAIResponse(message);
            }, 1000);
            
            chatInput.value = '';
        }
    }

    function addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = type === 'user' ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        
        const p = document.createElement('p');
        p.textContent = text;
        
        const time = document.createElement('span');
        time.className = 'message-time';
        time.textContent = 'Just now';
        
        content.appendChild(p);
        content.appendChild(time);
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function addAIResponse(userMessage) {
        const responses = [
            "I understand you're asking about: " + userMessage + ". Here's what I can tell you...",
            "That's an interesting question! Based on my knowledge: " + userMessage.substring(0, 30) + "...",
            "I'd be happy to help with that. Let me provide some information about your query.",
            "Great question! Here's what I found regarding: " + userMessage
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        addMessage(randomResponse, 'ai');
    }

    sendButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // User menu dropdown
    const userMenu = document.querySelector('.user-menu');
    userMenu.addEventListener('click', function() {
        alert('User menu clicked! Implement dropdown functionality here.');
    });

    // Quick actions
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.querySelector('span').textContent;
            alert(`${action} functionality would be implemented here!`);
        });
    });

    // Card actions
    const cardActions = document.querySelectorAll('.btn-icon');
    cardActions.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            alert('Card action menu would appear here!');
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            alert('Searching for: ' + this.value);
            this.value = '';
        }
    });

    // Smooth scrolling for chat
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Simulate some initial activity
    setTimeout(() => {
        addMessage("Welcome to your AI assistant dashboard! I'm here to help you with any questions or tasks you might have.", 'ai');
    }, 500);
});