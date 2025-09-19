import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import router from './routes';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());

app.use(router);

app.use((err: Error, req: Request, res: Response, next: Function) => {
   res.status(500).json({ error: err.message });
});

app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});
