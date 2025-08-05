import { useState, useSyncExternalStore } from "react";
import "./App.css";
import { chatStore } from "./stores/chatStore";
import { type ChatMessage } from "./types";

function App() {
	const [messageInput, setMessageInput] = useState("Hello there everyone.");
	const { chatMessages, username } = useSyncExternalStore(
		chatStore.subscribe,
		chatStore.getSnapshot
	);

	return (
		<>
			<header className="fill fixed">
				<nav>
					<h6 className="max">Chat</h6>
					<div className="field label border small">
						<input type="text" value={username} readOnly />
						<label>Username</label>
					</div>
				</nav>
			</header>
			<main className="responsive no-scroll">
				{chatMessages.map((chatMessage, idx) =>
					chatMessage.username === username ?
						<MyMessage
							message={chatMessage.message}
							username={chatMessage.username}
							key={idx}
						/>
					:	<TheirMessage
							message={chatMessage.message}
							username={chatMessage.username}
							key={idx}
						/>
				)}
			</main>
			<footer className="fill fixed">
				<nav>
					<div className="field label border max">
						<input
							type="text"
							onChange={e => setMessageInput(e.target.value)}
							value={messageInput}
						/>
						<label>Enter new message</label>
					</div>
					<button
						className="circle extra"
						onClick={() => {
							if (messageInput.length === 0) {
								alert("Input a message first.");
								return;
							}
							chatStore.addMessage({
								message: messageInput,
							});
							setMessageInput("");
						}}
					>
						<i>send</i>
					</button>
				</nav>
			</footer>
		</>
	);
}

function TheirMessage({ username, message }: ChatMessage) {
	return (
		<div className="grid no-space">
			<article className="m8 s10">
				<h6 className="small no-margin bold">{username}</h6>
				<div>{message}</div>
			</article>
		</div>
	);
}

function MyMessage({ username, message }: ChatMessage) {
	return (
		<div className="grid no-space">
			<div className="m4 s2"></div>
			<article className="m8 s10 secondary">
				<h6 className="small no-margin bold">{username}</h6>
				<div>{message}</div>
			</article>
		</div>
	);
}

export default App;
