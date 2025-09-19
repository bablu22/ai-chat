import OpenAI from 'openai';
import conversationRepository from '../repositories/conversation.repository';

type ChatResponse = {
   id: string;
   message: string;
};

const openai = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY,
});

const chatService = {
   sendMessage: async (
      prompt: string,
      conversationId: string
   ): Promise<ChatResponse> => {
      const response = await openai.responses.create({
         model: 'gpt-4o',
         input: prompt,
         temperature: 0.7,
         max_output_tokens: 100,
         previous_response_id:
            conversationRepository.getLastResponseId(conversationId),
      });

      conversationRepository.getLastResponseId(conversationId);

      return Promise.resolve({
         id: response.id,
         message: response.output_text,
      });
   },
};

export default chatService;
