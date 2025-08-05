import { io, Socket } from "socket.io-client";
import { create } from "mutative";
import type { ClientToServerEvents, ServerToClientEvents } from "../../../Server/server";
import type { ChatState } from "../types";
// this store was copied from: https://react.dev/reference/react/useSyncExternalStore

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io("ws://localhost:3000");

let chatState: ChatState = {
	chatMessages: [],
	username: "",
};

socket.on("getUsernameFromServer", ({ username }) => {
	// get username from Server
	chatState = create(chatState, draft => {
		draft.username = username;
	});

	emitChange();
});

socket.on("getMessagesFromServer", ({ chatMessages }) => {
	// get messages from Server
	chatState = create(chatState, draft => {
		draft.chatMessages = chatMessages;
	});

	emitChange();
});

let listeners: Array<() => void> = [];

export const chatStore = {
	addMessage({ message }: { message: string }) {
		const { username } = chatState;
		socket.emit("newMessageFromClient", {
			message,
			username,
		});
	},

	subscribe(listener: () => void) {
		// called when the state of the store changes
		listeners = [...listeners, listener];
		return () => {
			listeners = listeners.filter(l => l !== listener);
		};
	},
	getSnapshot() {
		// returns the current state of the store
		return chatState;
	},
};

function emitChange() {
	for (const listener of listeners) {
		listener();
	}
}
