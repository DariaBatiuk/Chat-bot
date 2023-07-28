const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");

let userMessage; 
const API_KEY = "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"

const createChatLi = (message, className) =>{
	const chatLi = document.createElement("li");
	chatLi.classList.add("chat", className);
	let chatContent = className === "outgoing" ? `<p>${message}</p>` : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
	chatLi.innerHTML = chatContent;
	return chatLi;
}

const generateResponse = (IncomingChatLi) => {
	const API_URL = "https://api.openai.com/v1/chat/completions";
	const messageElement = IncomingChatLi.querySelector("p")

	const requestOptions = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${API_KEY}`
		},
		body: JSON.stringify({
			model: "gpt-3.5-turbo",
			messages: [{role: "users", content: userMessage}]
		})
	}
	fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
		messageElement.textContent = data.choices[0].message.content;
	}).catch((error) =>{
		messageElement.textContent = "Opps! Something went wrong. Please try again"
	})

}

const handleChat = () => {
	userMessage = chatInput.value.trim();
	if(!userMessage) return;

	chatbox.appendChild(createChatLi(userMessage, "outgoing"));

	setTimeout(() =>{
		const IncomingChatLi = createChatLi("Thinking...", "incoming");
		chatbox.appendChild();
		generateResponse(IncomingChatLi);
	}, 600);
}

sendChatBtn.addEventListener("click", handleChat);