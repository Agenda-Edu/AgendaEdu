
import { Message as IMessage } from '../interfaces/Message';
import messageRepository from "../repositories/messageRepository";

class MessageService {
    async createMessage(message: Omit<IMessage, 'id' | 'userId'>): Promise<IMessage> {
        try {
            const createdMessage = await messageRepository.createMessage(message);
            return createdMessage;
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    }

    async getMessageById(id:string) {
        try {
            const message = await messageRepository.getMessageById(id);
            return message;
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    }

    async updateMessage(message : IMessage) {
        try {
            const updatedMessage = await messageRepository.updateMessage(message);
            return updatedMessage;
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    }

    async deleteMessage(id: string) {
        try {
            const deletedeMessage = await messageRepository.deleteMessage(id);
            return deletedeMessage;
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    }
}
export default new MessageService();
