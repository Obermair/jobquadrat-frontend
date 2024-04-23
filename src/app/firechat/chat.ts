export interface Chat {
    message_id?: string;
    chat_sender: string;
    chat_receiver: string;
    file: boolean;
    timestamp: Date;
}