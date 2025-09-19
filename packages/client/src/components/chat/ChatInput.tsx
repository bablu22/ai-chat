import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import { useForm } from 'react-hook-form';

export type ChatFormData = {
   prompt: string;
};

type Props = {
   onSubmit: (data: ChatFormData) => void;
};

const ChatInput = ({ onSubmit }: Props) => {
   const { register, handleSubmit, reset, formState } = useForm<ChatFormData>();

   const submit = handleSubmit((data) => {
      reset({ prompt: '' });
      onSubmit(data);
   });

   const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
         e.preventDefault();
         submit();
      }
   };

   return (
      <div>
         <div className="p-4 border-t border-primary/10 bg-background">
            <form
               className="flex gap-2"
               onSubmit={submit}
               onKeyDown={handleKeyDown}
            >
               <Input
                  {...register('prompt', {
                     required: true,
                     validate: (data) => data.trim().length > 0,
                  })}
                  autoFocus
                  placeholder="Ask anything"
                  maxLength={1000}
                  className="flex-1 border-primary/20  bg-background"
               />
               <Button
                  size="icon"
                  disabled={!formState.isValid}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50"
               >
                  <Send className="h-4 w-4" />
               </Button>
            </form>
            <div className="text-xs text-foreground/40 mt-2 text-center">
               Press Enter to send
            </div>
         </div>
      </div>
   );
};

export default ChatInput;
