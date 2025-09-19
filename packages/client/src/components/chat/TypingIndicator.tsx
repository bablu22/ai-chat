const TypingIndicator = () => {
   return (
      <div className="flex justify-start">
         <div className="bg-primary/10 text-foreground rounded-2xl rounded-bl-sm p-3 max-w-[75%]">
            <div className="flex gap-1">
               <span
                  className="w-2 h-2 bg-primary rounded-full animate-bounce"
                  style={{ animationDelay: '0ms' }}
               ></span>
               <span
                  className="w-2 h-2 bg-primary rounded-full animate-bounce"
                  style={{ animationDelay: '150ms' }}
               ></span>
               <span
                  className="w-2 h-2 bg-primary rounded-full animate-bounce"
                  style={{ animationDelay: '300ms' }}
               ></span>
            </div>
         </div>
      </div>
   );
};

export default TypingIndicator;
