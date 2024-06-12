
import { Inject, Service } from 'typedi';
import { IMessage } from '../interfaces/IMessage';
import MessageRepository from '../repositories/messageRepository';
@Service()
class MessageService {

    constructor(@Inject(() => MessageRepository) private messageRepository: MessageRepository) {}

    async createMessage(message: Omit<IMessage, 'id' | 'userId'>): Promise<IMessage> {
        try {
            const createdMessage = await this.messageRepository.createMessage(message);
            return createdMessage;
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    }

    async getMessageById(id:string) {
        try {
            const message = await this.messageRepository.getMessageById(id);
            return message;
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    }

    async updateMessage(message : IMessage) {
        try {
            const updatedMessage = await this.messageRepository.updateMessage(message);
            return updatedMessage;
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    }

    async deleteMessage(id: string) {
        try {
            const deletedeMessage = await this.messageRepository.deleteMessage(id);
            return deletedeMessage;
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    }
}
export default MessageService;
