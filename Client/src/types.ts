export type ChatMessage = {
	message: string;
	username: string;
};
export type ChatState = {
	chatMessages: ChatMessage[];
	username: string;
};
