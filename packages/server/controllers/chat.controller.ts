import type { Request, Response } from 'express';
import z from 'zod';
import chatService from '../services/chat.service';

const chatSchema = z.object({
   prompt: z
      .string()
      .trim()
      .min(1, 'Prompt is required.')
      .max(1000, 'Prompt is too long (max 1000 characters'),
   conversationId: z.string().uuid(),
});

const chatController = {
   async sendMessage(req: Request, res: Response) {
      try {
         const parseResult = chatSchema.safeParse(req.body);
         if (!parseResult.success) {
            res.status(400).json(parseResult.error.format());
            return;
         }

         const { prompt, conversationId } = parseResult.data;

         const response = await chatService.sendMessage(prompt, conversationId);

         res.json({ message: response.message });
      } catch (error) {
         res.status(500).json({ error: (error as Error).message });
      }
   },
};

export default chatController;
