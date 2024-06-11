
import { Request, Response } from 'express';
import { IMessage } from '../interfaces/IMessage';
import messageService from '../services/messageService';

class MessageController {
    async createMessage(req: Request, res: Response): Promise<Response> {
        try {
            const messageData: IMessage = req.body;
            const createdMessage = await messageService.createMessage(messageData);
            return res.status(201).json(createdMessage);
        } catch (error) {
            return res.status(400).json({ success: false, message: "Internal Server Error" });
        }
    }

    async getMessageById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.query;
            if (!id || typeof id !== 'string') {
                return res.status(400).json({ error: 'ID is required and must be a string' });
            }
            const message = await messageService.getMessageById(id);
            if (!message) {
                return res.status(404).json({ error: 'message not found' });
            }
            return res.status(200).json(message);
        } catch (error) {
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }

    async updateMessage(req: Request, res: Response) {
        try {
            const messageData: IMessage = req.body;
            const updatedMessage = await messageService.updateMessage(messageData);
            res.json(updatedMessage);
        } catch (error) {
            console.error('Erro ao obter estudantes:', error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    async deleteMessage(req: Request, res: Response) {
        try {
            const { id } = req.query;
            if (!id || typeof id !== 'string') {
                return res.status(400).json({ error: 'ID is required and must be a string' });
            }
            const message = await messageService.deleteMessage(id);
            if (!message) {
                return res.status(404).json({ error: 'student not found' });
            }
            return res.status(200).json(message);
        } catch (error) {
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }
}
export default new MessageController();