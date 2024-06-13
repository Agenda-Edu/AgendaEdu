

import { Service } from 'typedi';
import { prisma } from '../databse/Db';
import { IMessage } from '../interfaces/IMessage';

@Service()
class MessageRepository {

    async createMessage(messageData: Omit<IMessage, 'id'>): Promise<IMessage> {
        const message = await prisma.messages.create({
            data: {
                title: messageData.title,
                messageDate: messageData.messageDate,
                role: messageData.role,
                subjects: messageData.subjects,
                class: messageData.class,
                body: messageData.body,
            }
        });

        return message;
    }

    async getMessageById(id: string): Promise<IMessage> {
        const message = await prisma.messages.findFirst({
            where: { id: id }
        });

        return message as IMessage;
    }

    async updateMessage(message: IMessage): Promise<IMessage> {
        const existMessage = await prisma.messages.findFirst({
            where: { id: message.id }
        })

        if (!message) {
            throw new Error('User not found');
        };

        const updatedMessage = await prisma.messages.update({
            where: { id: message.id },
            data: {
                messageDate: message.messageDate || existMessage?.messageDate,
                title: message.title || existMessage?.title,
                role: message.role || existMessage?.role,
                subjects: message.subjects || existMessage?.subjects,
                class: message.class || existMessage?.class,
                body: message.body || existMessage?.body,
            }
        });

        return updatedMessage;
    }

    async deleteMessage(id: string): Promise<IMessage> {
        const deletedMessage = await prisma.messages.findFirst({
            where: { id: id }
        });

        if (!deletedMessage) {
            throw new Error("student not found");
        }
        await prisma.messages.delete({
            where: { id: deletedMessage.id }
        })

        return deletedMessage;
    }
}

export default  MessageRepository;