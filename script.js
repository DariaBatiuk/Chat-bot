const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const chatbotToggler = document.querySelector(".chatbot-toggler");
const chatbotCloseBtn = document.querySelector(".close-btn");


let userMessage; 
const API_KEY = "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"

const createChatLi = (message, className) =>{
	const chatLi = document.createElement("li");
	chatLi.classList.add("chat", className);
	let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
	chatLi.innerHTML = chatContent;
	chatLi.querySelector("p").textContent = message;
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
		messageElement.classList.add("error");
		messageElement.textContent = "Opps! Something went wrong. Please try again."
	}).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));

}

const handleChat = () => {
	userMessage = chatInput.value.trim();
	if(!userMessage) return;

	chatInput.value = "";

	chatbox.appendChild(createChatLi(userMessage, "outgoing"));
	chatbox.scrollTo(0, chatbox.scrollHeight);


	setTimeout(() =>{
		const IncomingChatLi = createChatLi("Thinking...", "incoming");
		chatbox.appendChild(IncomingChatLi);
		chatbox.scrollTo(0, chatbox.scrollHeight);
		generateResponse(IncomingChatLi);
	}, 600);
}

sendChatBtn.addEventListener("click", handleChat);
chatbotCloseBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));