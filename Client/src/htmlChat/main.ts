import { chatStore } from "../stores/chatStore";
import type { ChatMessage } from "../types";

const usernameInput = document.querySelector<HTMLInputElement>("#usernameInput")!;
const messageInput = document.querySelector<HTMLInputElement>("#messageInput")!;
const sendMessageButton = document.querySelector<HTMLButtonElement>("#sendMessage")!;
const main = document.querySelector<HTMLElement>("main")!;

if (usernameInput === null || messageInput === null || sendMessageButton === null) {
	throw new Error("UI element(s) missing");
}

chatStore.subscribe(() => {
	handleChatStoreUpdate();
});

function handleChatStoreUpdate() {
	const { chatMessages, username } = chatStore.getSnapshot();

	usernameInput.value = username;

	main.innerHTML = chatMessages
		.map(chatMessage =>
			chatMessage.username === username ? MyMessage(chatMessage) : TheirMessage(chatMessage)
		)
		.join("");

	console.log({ chatMessages, username });
}

sendMessageButton.addEventListener("click", () => {
	if (messageInput.value.length === 0) {
		alert("Input a message first.");
		return;
	}
	chatStore.addMessage({
		message: messageInput.value,
	});
	messageInput.value = "";
});

function TheirMessage({ username, message }: ChatMessage) {
	return `
		<div class="grid no-space">
			<article class="m8 s10">
				<h6 class="small no-margin bold">${username}</h6>
				<div>${message}</div>
			</article>
		</div>
	`;
}

function MyMessage({ username, message }: ChatMessage) {
	return `
		<div class="grid no-space">
			<div class="m4 s2"></div>
			<article class="m8 s10 secondary">
				<h6 class="small no-margin bold">${username}</h6>
				<div>${message}</div>
			</article>
		</div>
	`;
}

console.log("works");
