const messageInput = document.getElementById('message');
const sendBtn = document.getElementById('sendBtn');
const chatBody = document.querySelector('.chat-body');

// Initialize socket connection
const socket = io();

// Function to send a message
function sendMessage() {
  const messageText = messageInput.value.trim();
  
  if (messageText !== '') {
    // Send the message to the server
    socket.emit('chatMessage', messageText);
    
    // Clear the input field
    messageInput.value = '';
  }
}

// Event listener for sending messages
sendBtn.addEventListener('click', sendMessage);

// Allow sending messages by pressing Enter
messageInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

// Listen for messages from the server
socket.on('chatMessage', (messageText) => {
  // Create new message element
  const message = document.createElement('div');
  message.classList.add('message', 'received');
  message.innerHTML = `
    <p>${messageText}</p>
    <span class="time">${new Date().toLocaleTimeString()}</span>
  `;

  // Append the message to the chat body
  chatBody.appendChild(message);

  // Scroll to the bottom of the chat
  chatBody.scrollTop = chatBody.scrollHeight;
});