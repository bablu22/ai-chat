import express from 'express';
import type { Request, Response } from 'express';
import chatController from './controllers/chat.controller';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
   res.send('Hello, World!');
});

router.get('/health', (req: Request, res: Response) => {
   res.status(200).send('OK');
});

router.post('/api/chat', chatController.sendMessage);

export default router;
