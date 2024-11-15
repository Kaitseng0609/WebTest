
// 監聽輸入框的 keydown 事件
document.getElementById('message-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});


// 發送訊息到伺服器並顯示回應
function sendMessage() {
    const input = document.getElementById('message-input');
    const message = input.value.trim();
    if (message === '') return;


    // 顯示使用者訊息
    addMessageToChat('sent', message);
    input.value = '';


    // 使用 fetch 發送訊息到伺服器
    fetch('/send_message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: message })
    })
    .then(response => response.json())
    .then(data => {
        // 顯示伺服器回應
        const botMessage = data.response;
        addMessageToChat('received', botMessage);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


// 在聊天內容中新增訊息
function addMessageToChat(type, text) {
    const chatContent = document.getElementById('chat-content');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', type);


    const messageContent = document.createElement('div');
    messageContent.classList.add('message-content');
    messageContent.innerText = text;


    messageDiv.appendChild(messageContent);
    chatContent.appendChild(messageDiv);


    // 讓聊天視窗自動滾動到最新訊息
    chatContent.scrollTop = chatContent.scrollHeight;
}
