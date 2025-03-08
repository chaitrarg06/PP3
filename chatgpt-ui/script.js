document.addEventListener("DOMContentLoaded", function () {
    // Login Form Handling
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            if (email && password) {
                localStorage.setItem("user", email);
                window.location.href = "chat.html"; // Redirect to chat
            } else {
                alert("Please fill in all fields.");
            }
        });
    }

    // Chat Handling
    const chatBox = document.getElementById("chatBox");
    const messageInput = document.getElementById("messageInput");
    const sendBtn = document.getElementById("sendBtn");

    function appendMessage(sender, text) {
        const message = document.createElement("div");
        message.classList.add("message");
        if (sender === "user") {
            message.classList.add("user");
        }
        message.textContent = text;
        chatBox.appendChild(message);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function botReply() {
        setTimeout(() => {
            appendMessage("bot", "Hello! How can I help you today?");
        }, 1000);
    }

    function sendMessage() {
        const text = messageInput.value.trim();
        if (text !== "") {
            appendMessage("user", text);
            saveChatHistory(text, "user");
            messageInput.value = "";
            botReply();
        }
    }

    if (sendBtn) {
        sendBtn.addEventListener("click", sendMessage);
    }

    if (messageInput) {
        messageInput.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                sendMessage();
            }
        });
    }

    function saveChatHistory(text, sender) {
        let chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
        chatHistory.push({ sender, text });
        localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
    }

    function loadChatHistory() {
        const chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
        chatHistory.forEach(({ sender, text }) => {
            appendMessage(sender, text);
        });
    }

    if (chatBox) {
        loadChatHistory();
    }

    // Logout Function
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            localStorage.removeItem("user");
            localStorage.removeItem("chatHistory");
            window.location.href = "index.html";
        });
    }
});
