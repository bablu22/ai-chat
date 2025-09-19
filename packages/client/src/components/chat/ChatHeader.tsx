import { Button } from '@/components/ui/button';
import { X, Circle } from 'lucide-react';

type Props = {
   setIsOpen: (isOpen: boolean) => void;
};

const ChatHeader = ({ setIsOpen }: Props) => {
   return (
      <div className="bg-primary text-primary-foreground">
         <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
               <div className="relative">
                  <Circle className="h-2 w-2 fill-primary-foreground animate-pulse" />
               </div>
               <span className="font-semibold">Chat Support</span>
            </div>
            <Button
               variant="ghost"
               size="icon"
               onClick={() => setIsOpen(false)}
               className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
            >
               <X className="h-4 w-4" />
            </Button>
         </div>
      </div>
   );
};

export default ChatHeader;
