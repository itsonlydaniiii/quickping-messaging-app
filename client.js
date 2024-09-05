const socket = io(); // Connect to the server via Socket.io

// Function to send a message
function sendMessage() {
  const messageText = document.getElementById('message').value.trim(); // Get the message text

  if (messageText !== '') { // Check if message is not empty
    // Emit the 'chatMessage' event to the server with the message text
    socket.emit('chatMessage', messageText);

    // Clear the input field after sending
    document.getElementById('message').value = '';
  }
}

// Add event listener for the 'send' button
document.getElementById('sendBtn').addEventListener('click', sendMessage);

// Add event listener to send message when 'Enter' key is pressed
document.getElementById('message').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') { // Check if 'Enter' is pressed
    sendMessage(); // Send message
  }
});

// Listen for incoming messages from the server
socket.on('chatMessage', (messageText) => {
  const message = document.createElement('div'); // Create a new message element
  message.classList.add('message', 'received'); // Add 'message' and 'received' classes
  message.innerHTML = `<p>${messageText}</p><span class="time">${new Date().toLocaleTimeString()}</span>`; // Add message text and timestamp
  document.querySelector('.chat-body').appendChild(message); // Add message to chat body
  document.querySelector('.chat-body').scrollTop = document.querySelector('.chat-body').scrollHeight; // Scroll to bottom
});

// File attachment handling
document.getElementById('fileInput').addEventListener('change', function() {
  const file = document.getElementById('fileInput').files[0]; // Get the selected file
  const reader = new FileReader(); // Create a FileReader to read the file

  reader.onload = function(e) {
    const fileData = e.target.result; // Get the file data after reading
    socket.emit('fileMessage', fileData); // Emit 'fileMessage' event to the server with file data
  };

  reader.readAsDataURL(file); // Read the file as a data URL
});

// Listen for incoming file messages
socket.on('fileMessage', (fileData) => {
  const message = document.createElement('div'); // Create a new message element for the file
  message.classList.add('message', 'received'); // Add 'message' and 'received' classes
  message.innerHTML = `<img src="${fileData}" alt="file" style="max-width: 200px;"/><span class="time">${new Date().toLocaleTimeString()}</span>`; // Display image and timestamp
  document.querySelector('.chat-body').appendChild(message); // Add message to chat body
  document.querySelector('.chat-body').scrollTop = document.querySelector('.chat-body').scrollHeight; // Scroll to bottom
});