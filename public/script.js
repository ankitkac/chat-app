const socket = io();
const input = document.getElementById('message-input');
const chatBox = document.getElementById('chat-box');
const pingSound = new Audio('ping.mp3');

let username = "";

while (!username || username.length < 2) {
  username = prompt("Enter your name (min 2 chars):").trim();
}

function sendMessage() {
  const text = input.value.trim();
  if (text) {
    const msg = {
      user: username,
      content: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    socket.emit('chat message', msg);
    input.value = '';
  }
}

socket.on('chat message', msg => {
  if (msg.user !== username) {
    displayMessage(msg);
    pingSound.play();
  }
});

function displayMessage(msg) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message');
  msgDiv.innerHTML = `
    <div class="meta">${msg.user} • ${msg.time}</div>
    ${msg.content}
  `;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}
