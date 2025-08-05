import { type DefaultEventsMap, Server } from "socket.io";

export type ChatMessage = {
	message: string;
	username: string;
};
export type ChatState = {
	chatMessages: ChatMessage[];
	username: string;
};

export type ServerToClientEvents = {
	getUsernameFromServer: (data: { username: string }) => void;
	getMessagesFromServer: (data: { chatMessages: ChatMessage[] }) => void;
};

export type ClientToServerEvents = {
	newMessageFromClient: (data: ChatMessage) => void;
};

export type SocketData = {
	name: string;
	age: number;
};
const io = new Server<ClientToServerEvents, ServerToClientEvents, DefaultEventsMap, SocketData>(
	3000,
	{
		cors: {
			origin: "*",
		},
	}
);

const names = ["Martin", "Lukas", "Lili", "Philip"];
let nameIdx = 0;

const chatMessages = [{ username: "Linus", message: "Hello I am Linus!" }];

io.on("connection", socket => {
	const username = names[nameIdx];
	nameIdx = (nameIdx + 1) % names.length;
	if (!username) throw new Error("unexpected error: no name could be generated");

	socket.emit("getUsernameFromServer", { username });
	socket.emit("getMessagesFromServer", { chatMessages });

	socket.on("newMessageFromClient", chatMessage => {
		chatMessages.push(chatMessage);
		io.emit("getMessagesFromServer", { chatMessages });
	});
});
