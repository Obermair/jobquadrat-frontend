export interface ChatMessage {
    chatId: string;
    messageId: string;
    message: string;
    timestamp: Date;
    username: string;
    file_message: boolean;
    files: File[];
}

export interface File {
    filePath: string;
    name: string;
    ext: string;
    size: number;
};