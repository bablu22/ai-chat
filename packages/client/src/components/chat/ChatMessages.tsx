export type Message = {
   content: string;
   role: 'user' | 'bot';
};

type Props = {
   messages: Message[];
};

const ChatMessages = ({ messages }: Props) => {
   return (
      <>
         {messages.map((message, index) => (
            <div
               key={index}
               className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
               <div
                  className={`max-w-[75%] ${message.role === 'user' ? 'text-right' : 'text-left'}`}
               >
                  <div
                     className={`p-3 rounded-2xl text-sm transition-all ${
                        message.role === 'user'
                           ? 'bg-primary text-primary-foreground rounded-br-sm'
                           : 'bg-primary/10 text-foreground rounded-bl-sm'
                     }`}
                  >
                     {message.content}
                  </div>
               </div>
            </div>
         ))}
      </>
   );
};

export default ChatMessages;
