import { Advertisement } from "./advertisement";
import { UsersPermissionsUser } from "./users-permissions-user";

export interface ChatCommunications {
    id: string;
    advertisement?: Advertisement;
    chat_sender_p1?: UsersPermissionsUser;
    chat_receiver_p2?:  UsersPermissionsUser;
    last_message_timestamp: Date;
    unread_messages: boolean;
}
  