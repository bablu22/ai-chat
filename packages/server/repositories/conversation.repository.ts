const conversations = new Map<string, string>();

const conversationRepository = {
   getLastResponseId: (conversationId: string) => {
      return conversations.get(conversationId) || null;
   },
   setLastResponseId: (conversationId: string, responseId: string) => {
      conversations.set(conversationId, responseId);
   },
};

export default conversationRepository;
